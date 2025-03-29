from rest_framework import serializers
from .models import Destination, Location, Package, Itinerary, Hotel, Flight, Booking

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'description', 'image', 'destination', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ['id', 'name', 'description', 'price', 'duration', 'available_dates', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']


class DestinationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Destination
        fields = ['id', 'name', 'description', 'image', 'package' ,'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'location', 'description', 'image', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']
    
class ItinerarySerializer(serializers.ModelSerializer):

    class Meta:
        model = Itinerary
        fields = ['id', 'package', 'day_interval', 'order', 'locations', 'title', 'description', 'meals', 'accommodation']
        read_only_fields = ['id']

    def to_representation(self, instance):
        representation = super().to_representation(instance)

        ser = LocationSerializer(Location.objects.filter(id__in=representation["locations"]), many=True)
        representation["locations"] = ser.data

        return representation
    
class FlightSerializer(serializers.ModelSerializer):

    class Meta:
        model = Flight
        fields = ['id', 'name', 'destination', 'departure_datetime', 'arrival_datetime']
        read_only_fields = ['id']

class BookingSerializer(serializers.ModelSerializer):

    class Meta:
        model = Booking
        fields = ['id', 'customer', 'package', 'flight', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']


    
