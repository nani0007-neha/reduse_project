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