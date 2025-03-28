from django.db import models
from django.conf import settings  # Add this import
from django.core.validators import MaxValueValidator, MinValueValidator

    
class Location(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=3000)
    image_url = models.CharField(max_length=512, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name


class Destination(models.Model):
    name = models.CharField(max_length=255, unique=True)  # Add unique=True    location = models.CharField(max_length=255)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='destination_locations')
    description = models.TextField(max_length=3000)
    image_url = models.CharField(max_length=512, blank=True, null=True)  # Add this line
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='destinations')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['location', 'name'],
                name='unique_location_name_per_destination'
            )
        ]

    def __str__(self):
        return self.name
    
class Package(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='packages')
    name = models.CharField(max_length=255)
    description = models.TextField(max_length=3000)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    duration = models.CharField(max_length=50)  # e.g., "3 Days 2 Nights"
    available_dates = models.TextField()  # Comma-separated list of available dates
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['destination', 'name'],
                name='unique_package_name_per_destination'
            )
        ]

    def __str__(self):
        return self.name
        
class Hotel(models.Model):
    name = models.CharField(max_length=255, unique=True)
    location = models.CharField(max_length=255)
    description = models.TextField(max_length=3000)
    image_url = models.CharField(max_length=512, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.name
    
class Itinerary(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='itineraries')
    day_number = models.IntegerField(validators=[MinValueValidator(1) ,MaxValueValidator(10)], default=1)  # Day number in the itinerary
    title = models.CharField(max_length=255)  # Title of the day's activities
    description = models.TextField(max_length=3000)  # Description of the day's activities
    meals = models.CharField(max_length=255)  # Meals included (e.g., "Breakfast, Lunch, Dinner")
    accommodation = models.ForeignKey(Hotel, on_delete=models.CASCADE, related_name='itineraries')  # Renamed to accommodation
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['package', 'day_number'],
                name='unique_day_number_per_package'
            )
        ]

    def __str__(self):
        return f"Day {self.day_number} - {self.title}"
    
