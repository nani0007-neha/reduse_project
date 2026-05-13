from django.urls import path
from .views import RecipeListView, RecipeDetailView
from .views import FoodDisposalGuidanceList
from .views import TextilesYearSummaryView
from .views import (TextilesExcelYearSummaryView, TextilesExcelMaterialSummaryView, TextilesExcelDetailView)
from .views import RecipeListView, RecipeDetailView, product_journey_view

urlpatterns = [
    path("recipes/", RecipeListView.as_view(), name="recipe-list"),
    path("recipes/<int:pk>/", RecipeDetailView.as_view(), name="recipe-detail"),
    path("food-disposal/", FoodDisposalGuidanceList.as_view()),
    path("textiles/years/", TextilesYearSummaryView.as_view(), name="textiles-year-summary"),
    path("textiles-xls/yearly/", TextilesExcelYearSummaryView.as_view(), name="textiles-year-summary-excel"),
    path("textiles-xls/materials/", TextilesExcelMaterialSummaryView.as_view(), name="textiles-material-summary-excel"),
    path("textiles-xls/detail/", TextilesExcelDetailView.as_view(), name="textiles-detail-excel"),
    path("product-journey/", product_journey_view, name="product-journey"),
]