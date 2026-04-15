from rest_framework import serializers
from .models import Recipe


class RecipeCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = [
            "id",              # Django PK
            "recipe_id",       # original id from CSV
            "title",
            "image_url",
            "total_time_mins",
            "difficulty",
        ]


class RecipeDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Recipe
        fields = [
            "id",
            "recipe_id",
            "title",
            "image_url",
            "total_time_mins",
            "difficulty",
            "ingredients_clean",
            "instructions",
        ]


from .models import FoodDisposalGuidance

class FoodDisposalGuidanceSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodDisposalGuidance
        fields = [
            "id",
            "food_category",
            "label",
            "stream",
            "steps",
            "notes",
            "source_link",
        ]