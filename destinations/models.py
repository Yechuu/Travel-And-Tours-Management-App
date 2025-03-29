from django.db import models
from django.conf import settings  # Add this import
from django.core.validators import MaxValueValidator, MinValueValidator

 
class Package(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    duration = models.CharField(max_length=50,null=False, blank=False)
    available_dates = models.TextField(null=False, blank=False)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_destinations')
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['destination', 'name'],
                name='unique_package_name_per_destination'
            )
        ]

    def __str__(self):
        return self.name
    
class Destination(models.Model):
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='package_destinations', null=False, blank=False)
    name = models.CharField(max_length=255, unique=True, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    image = models.ImageField(upload_to="uploads", null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)

    def __str__(self):
        return self.name
    

class Location(models.Model):
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='destination_locations', null=False, blank=False)
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    image = models.ImageField(upload_to="uploads", null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)

    def __str__(self):
        return self.name

        
class Hotel(models.Model):
    name = models.CharField(max_length=255, unique=True, null=False, blank=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name="location_hotels" ,null=False, blank=False)
    description = models.TextField(max_length=3000, null=False, blank=False)
    image = models.ImageField(upload_to="uploads", null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)

    def __str__(self):
        return self.name
    
class Itinerary(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(max_length=3000, null=False, blank=False) 
    day_interval = models.PositiveIntegerField(validators=[MinValueValidator(1)], default=1, null=False, blank=False) 
    order = models.PositiveIntegerField(default=0, null=False, blank=False) 
    locations = models.ManyToManyField(Location, related_name='location_itineraries', null=False, blank=False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='package_itineraries', null=False, blank=False)
    accommodation = models.OneToOneField(Hotel, on_delete=models.CASCADE, related_name='accommodation_itinerary', null=False, blank=False)
    order = models.IntegerField(default=0, null=False, blank=False)
    meals = models.CharField(max_length=255, null=False, blank=False)
    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['package', 'day_number'],
                name='unique_day_number_per_package'
            )
        ]

    def __str__(self):
        return f"Day {self.day_number} - {self.title}"
    

class Flight(models.Model):

    name = models.CharField(max_length=255, null=False, blank=False)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='destination_flights', null=False, blank=False)
    departure_datetime = models.DateTimeField(auto_now_add=True ,null=False, blank=False)
    arrival_datetime = models.DateTimeField(auto_now_add=True ,null=False, blank=False)
    
    def __str__(self):
        return self.name
    

class Booking(models.Model):

    customer = models.ForeignKey(settings.AUTH_USER_MODEL, max_length=255, null=False, blank=False, related_name='customer_bookings')
    package = models.OneToOneField(Package, on_delete=models.CASCADE, null=False, blank=False)
    departure_datetime = models.DateTimeField(auto_now_add=True ,null=False, blank=False)
    arrival_datetime = models.DateTimeField(auto_now_add=True ,null=False, blank=False)
    
    def __str__(self):
        return f"{self.customer.username} - {self.package.name}"
    


    