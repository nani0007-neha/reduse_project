import csv
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from data_app.models import Recipe


class Command(BaseCommand):
    help = "Update recipe ingredients_clean field from CSV using recipe_id"

    def add_arguments(self, parser):
        parser.add_argument(
            "--path",
            type=str,
            default=str(Path(settings.BASE_DIR) / "data" / "recipes_with_parsed_ingredients_clean.csv"),
            help="Path to the CSV file",
        )

    def handle(self, *args, **options):
        csv_path = Path(options["path"])

        if not csv_path.exists():
            raise CommandError(f"File not found: {csv_path}")

        self.stdout.write(f"Updating recipe ingredients from {csv_path} ...")

        updated = 0
        missing = 0

        with csv_path.open(newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)

            for row in reader:
                recipe_id = row["recipe_id"].strip()
                ingredients_clean = row["ingredients_joined"].strip()

                try:
                    recipe = Recipe.objects.get(recipe_id=int(recipe_id))
                    recipe.ingredients_clean = ingredients_clean
                    recipe.save(update_fields=["ingredients_clean"])
                    updated += 1
                except Recipe.DoesNotExist:
                    missing += 1
                    self.stdout.write(self.style.WARNING(
                        f"Recipe with recipe_id={recipe_id} not found"
                    ))

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Updated {updated} recipes. Missing {missing} recipe IDs."
            )
        )