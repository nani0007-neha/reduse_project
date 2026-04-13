import csv
from pathlib import Path

from django.core.management.base import BaseCommand, CommandError
from data_app.models import Recipe


class Command(BaseCommand):
    help = "Load recipes from recipes_mvp.csv into the database"

    def add_arguments(self, parser):
        parser.add_argument(
            "--path",
            type=str,
            default="backend/data/recipes_mvp.csv",
            help="Path to the recipes CSV file",
        )

    def handle(self, *args, **options):
        csv_path = Path(options["path"])

        if not csv_path.exists():
            raise CommandError(f"File not found: {csv_path}")

        self.stdout.write(f"Loading recipes from {csv_path} ...")

        created = 0
        updated = 0

        with csv_path.open(newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                def clean(value):
                    v = (value or "").strip()
                    return None if v in ("", "NA", "NaN", "null", "NULL") else v

                recipe, was_created = Recipe.objects.update_or_create(
                    recipe_id=int(row["recipe_id"]),
                    defaults={
                        "title": row["title"].strip(),
                        "ingredients_raw": clean(row.get("ingredients_raw")),
                        "ingredients_clean": clean(row.get("ingredients_clean")),
                        "instructions": clean(row.get("instructions")),
                        "total_time_mins": (
                            int(row["total_time_mins"])
                            if clean(row.get("total_time_mins"))
                            else None
                        ),
                        "difficulty": clean(row.get("difficulty")),
                        "image_url": clean(row.get("image_url")),
                        "app_category": clean(row.get("app_category")),
                        "regional_cuisine": clean(row.get("regional_cuisine")),
                        "protein_class": clean(row.get("protein_class")),
                        "fat_class": clean(row.get("fat_class")),
                        "rating": (
                            float(row["rating"])
                            if clean(row.get("rating"))
                            else None
                        ),
                        "source_url": clean(row.get("source_url")),
                    },
                )
                if was_created:
                    created += 1
                else:
                    updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Created {created} recipes, updated {updated} recipes."
            )
        )