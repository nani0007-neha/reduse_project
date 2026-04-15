from django.db import models

# Create your models here.
from django.db import models


class Recipe(models.Model):
    recipe_id = models.IntegerField(unique=True)
    title = models.CharField(max_length=255)

    ingredients_raw = models.TextField(blank=True, null=True)
    ingredients_clean = models.TextField(blank=True, null=True)
    instructions = models.TextField(blank=True, null=True)

    total_time_mins = models.IntegerField(blank=True, null=True)
    difficulty = models.CharField(max_length=50, blank=True, null=True)
    image_url = models.URLField(max_length=500, blank=True, null=True)

    app_category = models.CharField(max_length=200, blank=True, null=True)
    regional_cuisine = models.CharField(max_length=200, blank=True, null=True)
    protein_class = models.CharField(max_length=100, blank=True, null=True)
    fat_class = models.CharField(max_length=100, blank=True, null=True)

    rating = models.FloatField(blank=True, null=True)
    source_url = models.URLField(max_length=500, blank=True, null=True)

class FoodDisposalGuidance(models.Model):
    food_category = models.CharField(max_length=100, unique=True)
    label = models.CharField(max_length=255)
    stream = models.CharField(max_length=255)
    steps = models.TextField()
    notes = models.TextField(blank=True)
    source_link = models.URLField(blank=True)

    def __str__(self):
        return self.label

    def __str__(self):
        return f"{self.title} ({self.recipe_id})"
