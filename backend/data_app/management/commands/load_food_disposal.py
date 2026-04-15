import csv
from pathlib import Path

from django.conf import settings
from django.core.management.base import BaseCommand, CommandError
from data_app.models import FoodDisposalGuidance


class Command(BaseCommand):
    help = "Load food disposal guidance from CSV into the database"

    def add_arguments(self, parser):
        parser.add_argument(
            "--path",
            type=str,
            default=str(Path(settings.BASE_DIR) / "data" / "food_disposal_guidance.csv"),
            help="Path to the CSV file",
        )

    def handle(self, *args, **options):
        csv_path = Path(options["path"])

        if not csv_path.exists():
            raise CommandError(f"File not found: {csv_path}")

        self.stdout.write(f"Loading food disposal guidance from {csv_path} ...")

        created = 0
        updated = 0

        with csv_path.open(newline="", encoding="utf-8") as f:
            reader = csv.DictReader(f)
            for row in reader:
                obj, was_created = FoodDisposalGuidance.objects.update_or_create(
                    food_category=row["food_category"].strip(),
                    defaults={
                        "label": row["label"].strip(),
                        "stream": row["stream"].strip(),
                        "steps": row["steps"].strip(),
                        "notes": row["notes"].strip(),
                        "source_link": row["source_link"].strip(),
                    },
                )
                if was_created:
                    created += 1
                else:
                    updated += 1

        self.stdout.write(
            self.style.SUCCESS(
                f"Done. Created {created} records, updated {updated} records."
            )
        )