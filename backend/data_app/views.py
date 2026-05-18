from django.shortcuts import render

# Create your views here.
from django.db.models import Q
from rest_framework import generics
from .models import Recipe
from .serializers import RecipeCardSerializer, RecipeDetailSerializer

import csv
from pathlib import Path
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
import pandas as pd

import json
import os
import requests

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_POST

from django.conf import settings

from .cache_utils import (
    normalize_product_name,
    build_cache_key,
    load_cache_record,
    is_cache_fresh,
    save_cache_record,
    extract_retry_delay_seconds,
    is_quota_error,
)


class RecipeListView(generics.ListAPIView):
    """
    GET /api/recipes/?q=tomato,onion
    Returns list of recipe cards.
    """

    serializer_class = RecipeCardSerializer

    def get_queryset(self):
        qs = Recipe.objects.all().order_by("id")

        # query = self.request.query_params.get("q")
        # if query:
        #     # Split by comma or space into individual ingredients
        #     raw_terms = [p.strip() for p in query.replace(",", " ").split()]
        #     terms = [t for t in raw_terms if t]

        #     if terms:
        #         q_obj = Q()
        #         for term in terms:
        #             q_obj &= Q(ingredients_clean__icontains=term)
        #         qs = qs.filter(q_obj)

        # return qs
        include = self.request.query_params.get("include")  
        exclude = self.request.query_params.get("exclude")  

        if include:
            include_terms = [
                t.strip().lower()
                for t in include.split(",")
                if t.strip()
            ]
            for term in include_terms:
                qs = qs.filter(ingredients_clean__icontains=term)

        if exclude:
            exclude_terms = [
                t.strip().lower()
                for t in exclude.split(",")
                if t.strip()
            ]
            for term in exclude_terms:
                qs = qs.exclude(ingredients_clean__icontains=term)
        
        qs = qs.exclude(image_url__isnull=True).exclude(image_url__exact="")
        qs = qs.order_by("image_url", "id").distinct("image_url")

        return qs


class RecipeDetailView(generics.RetrieveAPIView):
    """
    GET /api/recipes/<pk>/
    Returns full details for a single recipe.
    """

    queryset = Recipe.objects.all()
    serializer_class = RecipeDetailSerializer

from .models import FoodDisposalGuidance
from .serializers import FoodDisposalGuidanceSerializer

class FoodDisposalGuidanceList(generics.ListAPIView):
    queryset = FoodDisposalGuidance.objects.all().order_by("food_category")
    serializer_class = FoodDisposalGuidanceSerializer



BASE_DIR = Path(__file__).resolve().parent.parent

class TextilesYearSummaryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        csv_path = BASE_DIR / "data" / "victoria_textiles_waste_year_summary.csv"
        rows = []
        with open(csv_path, newline="") as f:
            reader = csv.DictReader(f)
            for row in reader:
                # Optionally cast numeric fields to float
                for field in [
                    "Disposal",
                    "International Export",
                    "Interstate Export",
                    "processedlocallyincludingwte",
                    "Total Generation",
                    "recoveryratepct",
                    "disposalratepct",
                    "exportratepct",
                ]:
                    if field in row and row[field] != "":
                        row[field] = float(row[field])
                rows.append(row)
        return Response(rows)

TEXTILES_XLSX_PATH = BASE_DIR / "data" / "victoria_textiles_waste_deployment_ready.xlsx"

class TextilesExcelYearSummaryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        df = pd.read_excel(
            TEXTILES_XLSX_PATH,
            sheet_name="year_summary",
            engine="openpyxl",
        )

        # Normalise column names (optional but nice for frontend)
        df = df.rename(columns={
            "financial_year": "financial_year",
            "financial_year_start": "financial_year_start",
            "Disposal": "disposal",
            "International Export": "international_export",
            "Interstate Export": "interstate_export",
            "processed_locally_including_wte": "processed_locally_including_wte",
            "Total Generation": "total_generation",
            "recovery_rate_pct": "recovery_rate_pct",
            "disposal_rate_pct": "disposal_rate_pct",
            "export_rate_pct": "export_rate_pct",
        })

        records = df.to_dict(orient="records")
        return Response(records)

class TextilesExcelMaterialSummaryView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        df = pd.read_excel(
            TEXTILES_XLSX_PATH,
            sheet_name="material_summary",
            engine="openpyxl",
        )

        df = df.rename(columns={
            "financial_year": "financial_year",
            "financial_year_start": "financial_year_start",
            "material_name_clean": "material_name",
            "Disposal": "disposal",
            "International Export": "international_export",
            "Interstate Export": "interstate_export",
            "processed_locally_including_wte": "processed_locally_including_wte",
            "Total Generation": "total_generation",
        })

        records = df.to_dict(orient="records")
        return Response(records)

class TextilesExcelDetailView(APIView):
    permission_classes = [AllowAny]

    def get(self, request, *args, **kwargs):
        df = pd.read_excel(
            TEXTILES_XLSX_PATH,
            sheet_name="textiles_clean",
            engine="openpyxl",
        )

        # Optional filters via query params
        material = request.query_params.get("material")   # e.g. "Clothing"
        sector = request.query_params.get("sector")       # e.g. "MSW"
        year = request.query_params.get("year")           # e.g. "2022-2023"

        if material:
            df = df[df["material_name_clean"] == material]
        if sector:
            df = df[df["source_sector"] == sector]
        if year:
            df = df[df["financial_year"] == year]

        df = df.rename(columns={
            "financial_year": "financial_year",
            "financial_year_start": "financial_year_start",
            "material_name_clean": "material_name",
            "source_sector": "source_sector",
            "source_sector_label": "source_sector_label",
            "Disposal": "disposal",
            "International Export": "international_export",
            "Interstate Export": "interstate_export",
            "processed_locally_including_wte": "processed_locally_including_wte",
            "Total Generation": "total_generation",
            "recovery_rate_pct": "recovery_rate_pct",
            "disposal_rate_pct": "disposal_rate_pct",
            "export_rate_pct": "export_rate_pct",
        })

        records = df.to_dict(orient="records")
        return Response(records)


GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
GEMINI_MODEL = "gemini-2.5-flash"
GEMINI_URL = f"https://generativelanguage.googleapis.com/v1beta/models/{GEMINI_MODEL}:generateContent"


def build_product_journey_prompt(object_name: str) -> str:
    return f'''
You are writing a Product Journey Reveal for a household sustainability app.

The user entered this household object:
{object_name}

Return content for a website UI with these fields:
- objectName
- displayName
- heroTitle
- heroSubtitle
- assumptionNote
- objectVisual
- chapters
- summaryPanel
- oneSmallChange
- closingStatement

Important content rules:
- Base the response only on the object name entered by the user.
- If the object is ambiguous, use the most common everyday version.
- Use uncertainty words like "likely", "typically", or "often" when needed.
- Do not invent brand names, exact countries, exact factories, exact disposal outcomes, or unsupported technical claims.
- Keep the writing concise, clear, calm, and suitable for a website UI.
- Use plain, reflective language.
- Avoid dramatic guilt language.
- Avoid repetition across fields.
- Make each section feel visually balanced for card-based UI.

Field rules:
- objectName: echo the cleaned object name in lowercase if appropriate.
- displayName: short UI-friendly title case version.
- heroTitle: short headline in the format "The hidden journey of your ...".
- heroSubtitle: one short sentence that explains this is the life cycle of the object and why it matters.
- heroSubtitle must be different in wording from heroTitle and summaryPanel.text.
- assumptionNote: one short sentence, under 14 words.
- objectVisual.iconKey: a simple snake_case icon key based on the object, e.g. milk_can, toothbrush, tshirt.
- objectVisual.category: one of household, food, clothing, packaging, electronics, bathroom, kitchen, cleaning.

Chapter rules:
- Return exactly 4 chapters in this order:
  1. origin
  2. journey
  3. purchase
  4. end_of_life
- Each chapter text must be 20 to 28 words maximum.
- Each chapter text should be 1 to 2 short sentences only.
- Avoid long clauses, semicolons, and overloaded sentences.
- Each chapter must have:
  - id
  - stepNumber
  - stepLabel
  - title
  - text
  - microFacts
  - impactTitle
  - impactText
- stepLabel should be short uppercase UI labels.
- title should be user-friendly, reflective, and distinct from the other chapter titles.
- microFacts must contain 2 to 3 short UI bullet phrases, each under 6 words.
- microFacts should be concrete and scannable, not vague.
- At least one microFact per chapter should mention a process, place, or action.
- impactTitle should usually be "Environmental impact", except purchase can use "Key insight".
- impactText must be one short sentence, under 14 words.
- impactText should be neutral, clear, and non-repetitive.

Specific chapter guidance:
- origin: focus on materials and making.
- journey: focus on transport, supply chain, storage, and handling.
- purchase: focus on quick decision, convenience, habit, or value.
- end_of_life: focus on disposal, recycling difficulty, landfill, reuse, or lasting impact.

Summary panel rules:
- summaryPanel.title: short memorable section title, different from heroTitle.
- summaryPanel.text: one short reflective sentence linking understanding to better choices.
- summaryPanel.text must not repeat heroSubtitle wording.
- summaryPanel.ctaPrimary: "Explore another object"
- summaryPanel.ctaSecondary: "Learn sustainable alternatives"

oneSmallChange rules:
- oneSmallChange: one short, practical action the user can take next time.
- Keep it specific, realistic, and easy.
- Prefer one action, not a list.
- Keep it under 12 words when possible.
- Focus on waste reduction, reuse, refill, repair, longer use, or better alternatives.

closingStatement rules:
- one short memorable sentence, 4 to 7 words.
- make it feel like a tagline.

Return valid JSON only.
'''.strip()


def product_journey_schema():
    chapter_schema = {
        "type": "OBJECT",
        "properties": {
            "id": {"type": "STRING"},
            "stepNumber": {"type": "NUMBER"},
            "stepLabel": {"type": "STRING"},
            "title": {"type": "STRING"},
            "text": {"type": "STRING"},
            "microFacts": {
                "type": "ARRAY",
                "items": {"type": "STRING"}
            },
            "impactTitle": {"type": "STRING"},
            "impactText": {"type": "STRING"}
        },
        "required": [
            "id", "stepNumber", "stepLabel", "title",
            "text", "microFacts", "impactTitle", "impactText"
        ]
    }

    return {
        "type": "OBJECT",
        "properties": {
            "objectName": {"type": "STRING"},
            "displayName": {"type": "STRING"},
            "heroTitle": {"type": "STRING"},
            "heroSubtitle": {"type": "STRING"},
            "assumptionNote": {"type": "STRING"},
            "objectVisual": {
                "type": "OBJECT",
                "properties": {
                    "iconKey": {"type": "STRING"},
                    "category": {"type": "STRING"}
                },
                "required": ["iconKey", "category"]
            },
            "chapters": {
                "type": "ARRAY",
                "items": chapter_schema
            },
            "summaryPanel": {
                "type": "OBJECT",
                "properties": {
                    "title": {"type": "STRING"},
                    "text": {"type": "STRING"},
                    "ctaPrimary": {"type": "STRING"},
                    "ctaSecondary": {"type": "STRING"}
                },
                "required": ["title", "text", "ctaPrimary", "ctaSecondary"]
            },
            "oneSmallChange": {"type": "STRING"},
            "closingStatement": {"type": "STRING"}
        },
        "required": [
            "objectName",
            "displayName",
            "heroTitle",
            "heroSubtitle",
            "assumptionNote",
            "objectVisual",
            "chapters",
            "summaryPanel",
            "oneSmallChange",
            "closingStatement"
        ]
    }

def clean_text(value):
    if not isinstance(value, str):
        return value
    return value.replace("\\u0027", "'").strip()

def format_product_journey_response(data: dict) -> dict:
    return {
        "objectName": clean_text(data["objectName"]),
        "displayName": clean_text(data["displayName"]),
        "heroTitle": clean_text(data["heroTitle"]),
        "heroSubtitle": clean_text(data["heroSubtitle"]),
        "assumptionNote": clean_text(data["assumptionNote"]),
        "objectVisual": {
            "iconKey": clean_text(data["objectVisual"]["iconKey"]),
            "category": clean_text(data["objectVisual"]["category"]),
        },
        "chapters": [
            {
                "id": clean_text(chapter["id"]),
                "stepNumber": chapter["stepNumber"],
                "stepLabel": clean_text(chapter["stepLabel"]),
                "title": clean_text(chapter["title"]),
                "text": clean_text(chapter["text"]),
                "microFacts": [clean_text(item) for item in chapter["microFacts"]],
                "impactTitle": clean_text(chapter["impactTitle"]),
                "impactText": clean_text(chapter["impactText"]),
            }
            for chapter in data["chapters"]
        ],
        "summaryPanel": {
            "title": clean_text(data["summaryPanel"]["title"]),
            "text": clean_text(data["summaryPanel"]["text"]),
            "ctaPrimary": clean_text(data["summaryPanel"]["ctaPrimary"]),
            "ctaSecondary": clean_text(data["summaryPanel"]["ctaSecondary"]),
        },
        "oneSmallChange": clean_text(data["oneSmallChange"]),
        "closingStatement": clean_text(data["closingStatement"]),
    }

def validate_product_journey_output(data: dict) -> bool:
    top_level_fields = [
        "objectName",
        "displayName",
        "heroTitle",
        "heroSubtitle",
        "assumptionNote",
        "objectVisual",
        "chapters",
        "summaryPanel",
        "oneSmallChange",
        "closingStatement",
    ]

    for field in top_level_fields:
        if field not in data:
            return False

    if not isinstance(data["objectVisual"], dict):
        return False

    if "iconKey" not in data["objectVisual"] or "category" not in data["objectVisual"]:
        return False

    if not isinstance(data["chapters"], list) or len(data["chapters"]) != 4:
        return False

    for chapter in data["chapters"]:
        required_chapter_fields = [
            "id",
            "stepNumber",
            "stepLabel",
            "title",
            "text",
            "microFacts",
            "impactTitle",
            "impactText",
        ]
        for field in required_chapter_fields:
            if field not in chapter:
                return False

        if not isinstance(chapter["microFacts"], list):
            return False

    if not isinstance(data["summaryPanel"], dict):
        return False

    for field in ["title", "text", "ctaPrimary", "ctaSecondary"]:
        if field not in data["summaryPanel"]:
            return False

    return True

@csrf_exempt
@require_POST
def product_journey_view(request):
    if not GEMINI_API_KEY:
        return JsonResponse(
            {"error": "Server misconfiguration: GEMINI_API_KEY is missing"},
            status=500,
        )

    try:
        body = json.loads(request.body.decode("utf-8"))
    except json.JSONDecodeError:
        return JsonResponse({"error": "Invalid JSON body"}, status=400)

    object_name = str(body.get("objectName", "")).strip()

    if not object_name:
        return JsonResponse({"error": "objectName is required"}, status=400)

    if len(object_name) > 100:
        return JsonResponse({"error": "objectName is too long"}, status=400)

    normalized_name = normalize_product_name(object_name)
    if not normalized_name:
        return JsonResponse({"error": "objectName is invalid"}, status=400)

    cache_key = build_cache_key(normalized_name)
    cache_record = load_cache_record(cache_key)

    if cache_record and is_cache_fresh(cache_record):
        return JsonResponse(
            {
                "success": True,
                "source": "cache",
                "stale": False,
                "data": cache_record["data"],
            },
            status=200,
        )

    stale_cache_data = None
    if cache_record and settings.PRODUCT_CACHE_STALE_FALLBACK:
        stale_cache_data = cache_record.get("data")

    prompt = build_product_journey_prompt(normalized_name)

    payload = {
        "contents": [
            {
                "role": "user",
                "parts": [{"text": prompt}],
            }
        ],
        "generationConfig": {
            "responseMimeType": "application/json",
            "responseSchema": product_journey_schema(),
        },
    }

    try:
        response = requests.post(
            GEMINI_URL,
            params={"key": GEMINI_API_KEY},
            headers={"Content-Type": "application/json"},
            json=payload,
            timeout=30,
        )
    except requests.RequestException:
        if stale_cache_data:
            return JsonResponse(
                {
                    "success": True,
                    "source": "cache",
                    "stale": True,
                    "message": "Showing the latest saved result because live refresh is temporarily unavailable.",
                    "data": stale_cache_data,
                },
                status=200,
            )

        return JsonResponse({"error": "Failed to reach Gemini"}, status=502)

    if response.status_code != 200:
        response_text = response.text

        if is_quota_error(response.status_code, response_text):
            retry_after_seconds = extract_retry_delay_seconds(response_text)

            if stale_cache_data:
                payload = {
                    "success": True,
                    "source": "cache",
                    "stale": True,
                    "message": "Showing the latest saved result because live refresh is temporarily unavailable.",
                    "data": stale_cache_data,
                }
                if retry_after_seconds is not None:
                    payload["retryAfterSeconds"] = retry_after_seconds
                return JsonResponse(payload, status=200)

            error_payload = {
                "success": False,
                "errorCode": "AI_QUOTA_EXCEEDED",
                "message": "Sorry, live results are temporarily unavailable. Please try again later.",
            }
            if retry_after_seconds is not None:
                error_payload["retryAfterSeconds"] = retry_after_seconds

            return JsonResponse(error_payload, status=429)

        return JsonResponse(
            {
                "error": "Gemini request failed",
                "details": response_text,
            },
            status=502,
        )

    try:
        gemini_data = response.json()
        text_output = gemini_data["candidates"][0]["content"]["parts"][0]["text"]
        structured_data = json.loads(text_output)
    except (KeyError, IndexError, TypeError, json.JSONDecodeError):
        if stale_cache_data:
            return JsonResponse(
                {
                    "success": True,
                    "source": "cache",
                    "stale": True,
                    "message": "Showing the latest saved result because live refresh is temporarily unavailable.",
                    "data": stale_cache_data,
                },
                status=200,
            )

        return JsonResponse({"error": "Invalid model response"}, status=502)

    if not validate_product_journey_output(structured_data):
        if stale_cache_data:
            return JsonResponse(
                {
                    "success": True,
                    "source": "cache",
                    "stale": True,
                    "message": "Showing the latest saved result because live refresh is temporarily unavailable.",
                    "data": stale_cache_data,
                },
                status=200,
            )

        return JsonResponse({"error": "Incomplete model response"}, status=502)

    formatted_data = format_product_journey_response(structured_data)
    save_cache_record(cache_key, normalized_name, formatted_data)

    return JsonResponse(
        {
            "success": True,
            "source": "live",
            "stale": False,
            "data": formatted_data,
        },
        status=200,
    )