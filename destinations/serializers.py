from rest_framework import serializers
from .models import Destination, Location, Package, Itinerary, Hotel, Flight, Booking

class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ['id', 'name', 'description', 'image', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'description', 'image', 'destination', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ['id', 'name', 'description','overview', 'tour_info', 'tour_highlights', 'image', 'price', 'afterDiscount', 'duration', 'available_dates', 'destination', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'location', 'description', 'image', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
class ItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Itinerary
        fields = ['id', 'package', 'day_interval', 'order', 'title', 'description', 'meals', 'accommodation', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    # def to_representation(self, instance):
    #     representation = super().to_representation(instance)

    #     ser = LocationSerializer(Location.objects.filter(id__in=representation["locations"]), many=True)
    #     representation["locations"] = ser.data
    #     ser = HotelSerializer(Hotel.objects.get(id=representation["accommodation"]))
    #     representation["accommodation"] = ser.data

    #     return representation
    
class FlightSerializer(serializers.ModelSerializer):

    class Meta:
        model = Flight
        fields = ['id', 'name', 'package', 'departure_datetime', 'arrival_datetime', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = ['id', 'customer', 'package', 'flight', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


    
