from rest_framework import serializers
from .models import Destination, Location, Package, Itinerary, Hotel

class LocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Location
        fields = ['id', 'name', 'description', 'image', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

class DestinationSerializer(serializers.ModelSerializer):

    locations = serializers.PrimaryKeyRelatedField(queryset=Location.objects.all(), many=True)


    class Meta:
        model = Destination
        fields = ['id', 'name', 'description', 'locations', 'image', 'created_by', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_by', 'created_at', 'updated_at']

    def to_representation(self, instance):
        repr =  super().to_representation(instance)

        repr.pop('locations', None)
        
        return repr


class PackageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Package
        fields = ['id', 'name', 'description', 'price', 'duration', 'available_dates', 'destination', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    # def validate(self, data):
    #     # Ensure the location is provided
    #     if 'location' not in data:
    #         raise serializers.ValidationError("Location is required.")

    #     # Ensure the name is unique for the given location
    #     location = data['location']
    #     name = data.get('name')
    #     if Package.objects.filter(location=location, name=name).exists():
    #         raise serializers.ValidationError("A package with this name already exists for the location.")
    #     return data

class ItinerarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Itinerary
        fields = ['id', 'package', 'day_number', 'title', 'description', 'meals', 'accommodation']
        read_only_fields = ['id']

    def validate(self, data):
        # Ensure the package is provided
        if 'package' not in data:
            raise serializers.ValidationError("Package is required.")

        # Ensure the day_number is unique for the given package
        package = data['package']
        day_number = data.get('day_number')
        if Itinerary.objects.filter(package=package, day_number=day_number).exists():
            raise serializers.ValidationError("An itinerary for this day already exists for the package.")

        # Ensure the accommodation (hotel) is provided
        if 'accommodation' not in data:
            raise serializers.ValidationError("Accommodation is required.")
        return data
    
class HotelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hotel
        fields = ['id', 'name', 'location', 'description', 'image_url', 'created_at', 'updated_at']
        read_only_fields = ['id', 'created_at', 'updated_at']

    def validate_name(self, value):
        # Ensure the hotel name is unique
        if Hotel.objects.filter(name=value).exists():
            raise serializers.ValidationError("A hotel with this name already exists.")
        return value