from django.contrib import admin
from .models import Location, Package, Destination, Itinerary, Hotel
# Register your models here.
admin.site.register(Destination)
admin.site.register(Location)
admin.site.register(Package)
admin.site.register(Itinerary)
admin.site.register(Hotel)