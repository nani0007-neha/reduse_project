import json
import os
import re
import tempfile
from datetime import datetime, timedelta, timezone
from pathlib import Path

from django.conf import settings


def normalize_product_name(name: str) -> str:
    if not isinstance(name, str):
        return ""

    value = name.strip().lower()
    value = re.sub(r"\s+", " ", value)
    value = re.sub(r"[_/,]+", " ", value)
    value = re.sub(r"(\d+)\s*ml\b", r"\1ml", value)
    value = re.sub(r"(\d+)\s*g\b", r"\1g", value)
    value = re.sub(r"(\d+)\s*kg\b", r"\1kg", value)
    value = re.sub(r"[^a-z0-9\s\-]", "", value)
    value = re.sub(r"\s+", " ", value).strip()
    return value


def slugify_for_cache(value: str) -> str:
    value = value.strip().lower()
    value = re.sub(r"\s+", "-", value)
    value = re.sub(r"-+", "-", value)
    return value.strip("-")


def build_cache_key(normalized_name: str) -> str:
    slug = slugify_for_cache(normalized_name)
    return f"product-journey:{settings.CACHE_SCHEMA_VERSION}:{slug}"


def get_cache_file_path(cache_key: str) -> Path:
    safe_name = cache_key.replace(":", "__")
    return Path(settings.PRODUCT_CACHE_DIR) / f"{safe_name}.json"


def utc_now() -> datetime:
    return datetime.now(timezone.utc)


def is_cache_fresh(cache_record: dict) -> bool:
    expires_at = cache_record.get("expiresAt")
    if not expires_at:
        return False

    try:
        expiry = datetime.fromisoformat(expires_at.replace("Z", "+00:00"))
    except ValueError:
        return False

    return utc_now() < expiry


def load_cache_record(cache_key: str) -> dict | None:
    path = get_cache_file_path(cache_key)
    if not path.exists():
        return None

    try:
        with open(path, "r", encoding="utf-8") as f:
            return json.load(f)
    except (OSError, json.JSONDecodeError):
        return None


def atomic_write_json(path: Path, payload: dict) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)

    with tempfile.NamedTemporaryFile(
        mode="w",
        encoding="utf-8",
        delete=False,
        dir=path.parent,
        suffix=".tmp",
    ) as tmp_file:
        json.dump(payload, tmp_file, ensure_ascii=False, indent=2)
        tmp_file.flush()
        os.fsync(tmp_file.fileno())
        temp_name = tmp_file.name

    os.replace(temp_name, path)


def save_cache_record(cache_key: str, normalized_name: str, data: dict) -> dict:
    created_at = utc_now()
    expires_at = created_at + timedelta(hours=settings.PRODUCT_CACHE_TTL_HOURS)

    payload = {
        "cacheKey": cache_key,
        "normalizedName": normalized_name,
        "schemaVersion": settings.CACHE_SCHEMA_VERSION,
        "createdAt": created_at.isoformat().replace("+00:00", "Z"),
        "expiresAt": expires_at.isoformat().replace("+00:00", "Z"),
        "data": data,
    }

    path = get_cache_file_path(cache_key)
    atomic_write_json(path, payload)
    return payload


def extract_retry_delay_seconds(error_text: str) -> int | None:
    if not error_text:
        return None

    match = re.search(r'"retryDelay"\s*:\s*"(\d+)s"', error_text)
    if match:
        return int(match.group(1))

    match = re.search(r"retry in\s+(\d+(?:\.\d+)?)s", error_text, re.IGNORECASE)
    if match:
        return int(float(match.group(1)))

    return None


def is_quota_error(status_code: int, error_text: str) -> bool:
    if status_code == 429:
        return True

    if not error_text:
        return False

    lowered = error_text.lower()
    quota_markers = [
        "resource_exhausted",
        "quota exceeded",
        "rate limit",
        "too many requests",
    ]
    return any(marker in lowered for marker in quota_markers)