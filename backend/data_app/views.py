from django.shortcuts import render

# Create your views here.
from django.db.models import Q
from rest_framework import generics
from .models import Recipe
from .serializers import RecipeCardSerializer, RecipeDetailSerializer


class RecipeListView(generics.ListAPIView):
    """
    GET /api/recipes/?q=tomato,onion
    Returns list of recipe cards.
    """

    serializer_class = RecipeCardSerializer

    def get_queryset(self):
        qs = Recipe.objects.all().order_by("id")

        query = self.request.query_params.get("q")
        if query:
            # Split by comma or space into individual ingredients
            raw_terms = [p.strip() for p in query.replace(",", " ").split()]
            terms = [t for t in raw_terms if t]

            if terms:
                q_obj = Q()
                for term in terms:
                    q_obj &= Q(ingredients_clean__icontains=term)
                qs = qs.filter(q_obj)

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