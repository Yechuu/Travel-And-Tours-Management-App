from django.db import models
from django.conf import settings  # Add this import
import os
from decimal import Decimal
 
    
class Destination(models.Model):
    name = models.CharField(max_length=255, unique=True, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    image = models.ImageField(upload_to="uploads", null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)

    def delete(self, *args, **kwargs):
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        return super(Destination, self).delete(*args, **kwargs)

    def __str__(self):
        return self.name
    
class Location(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    image = models.ImageField(upload_to="uploads", null=False, blank=False)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='destination_locations', null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)

    def delete(self, *args, **kwargs):
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        return super(Destination, self).delete(*args, **kwargs)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'destination'], name='unique_location_name_by_destination'),
        ]

    def __str__(self):
        return self.name
        
class Package(models.Model):
    name = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(null=False, blank=False)
    overview = models.TextField(null=False, blank=False)
    tour_info = models.TextField(null=False, blank=False)
    tour_highlights = models.TextField(null=False, blank=False)
    image = models.ImageField(upload_to="uploads", null=False, blank=False)
    destination = models.ForeignKey(Destination, on_delete=models.CASCADE, related_name='destination_packages', null=False, blank=False)
    price = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    afterDiscount = models.DecimalField(max_digits=10, decimal_places=2, null=False, blank=False)
    duration = models.CharField(max_length=50,null=False, blank=False)
    available_dates = models.TextField(null=False, blank=False)
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='user_destinations')
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'destination', 'created_by'], name='unique_package_name_by_destination_per_agent'),
        ]

    def __str__(self):
        return self.name

class Hotel(models.Model):
    name = models.CharField(max_length=255, unique=True, null=False, blank=False)
    description = models.TextField(max_length=3000, null=False, blank=False)
    image = models.ImageField(upload_to="uploads", null=True, blank=False)
    location = models.ForeignKey(Location, on_delete=models.CASCADE, related_name='location_hotels', null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)

    def delete(self, *args, **kwargs):
        if self.image:
            if os.path.isfile(self.image.path):
                os.remove(self.image.path)
        return super(Destination, self).delete(*args, **kwargs)

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'location'], name='unique_hotel_name_by_location'),
        ]

    def __str__(self):
        return self.name
    
class Itinerary(models.Model):
    title = models.CharField(max_length=255, null=False, blank=False)
    description = models.TextField(max_length=3000, null=False, blank=False) 
    day_interval = models.PositiveIntegerField(default=1, null=False, blank=False) 
    order = models.PositiveIntegerField(default=0, null=False, blank=False) 
    # locations = models.ManyToManyField(Location, related_name='location_itineraries')
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='package_itineraries', null=False, blank=False)
    accommodation = models.ForeignKey(Hotel, on_delete=models.DO_NOTHING, related_name='accommodation_itineraries', null=True, blank=True)
    meals = models.CharField(max_length=255, null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)
   
    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['title', 'package'], name='unique_itinerary_title_by_package'),
        ]

    def __str__(self):
        return f"Day {self.day_interval} - {self.title}"
    

class Flight(models.Model):

    name = models.CharField(max_length=255, null=False, blank=False)
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name='package_flights', null=False, blank=False)
    departure_datetime = models.DateTimeField(auto_now_add=True ,null=False, blank=False)
    arrival_datetime = models.DateTimeField(auto_now_add=True ,null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)
   

    class Meta:
        constraints = [
            models.UniqueConstraint(fields=['name', 'package'], name='unique_flight_name_by_package'),
        ]

    def __str__(self):
        return self.name
    
class Booking(models.Model):

    flight = models.ForeignKey(Flight, on_delete=models.DO_NOTHING, related_name="flight_bookings", null=True, blank=True)
    package = models.ForeignKey(Package, on_delete=models.CASCADE, related_name="package_bookings", null=False, blank=False)
    customer = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='customer_bookings', null=False, blank=False)
    created_at = models.DateTimeField(auto_now_add=True, null=False, blank=False)
    updated_at = models.DateTimeField(auto_now=True, null=False, blank=False)

    def __str__(self):
        return f"{self.customer.username} - {self.package.name}"

    


    