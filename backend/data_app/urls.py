from django.urls import path
from .views import RecipeListView, RecipeDetailView
from .views import FoodDisposalGuidanceList
from .views import TextilesYearSummaryView

urlpatterns = [
    path("recipes/", RecipeListView.as_view(), name="recipe-list"),
    path("recipes/<int:pk>/", RecipeDetailView.as_view(), name="recipe-detail"),
    path("food-disposal/", FoodDisposalGuidanceList.as_view()),
    path("textiles/years/", TextilesYearSummaryView.as_view(), name="textiles-year-summary")
]