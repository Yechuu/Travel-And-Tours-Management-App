from rest_framework import generics, permissions
from .models import Destination, Location, Package, Itinerary, Hotel, Flight, Booking
from .serializers import DestinationSerializer, LocationSerializer, PackageSerializer, ItinerarySerializer, HotelSerializer, FlightSerializer, BookingSerializer
from accounts.permissions import IsAuthenticatedOrReadOnlyAgent, IsAuthenticatedOrReadOnlyTraveller


class DestinationListCreateView(generics.ListCreateAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent]

class DestinationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent]

class LocationListCreateView(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent]

class LocationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent]

class LocationListByDestinationView(generics.ListAPIView):
    serializer_class = LocationSerializer
    permission_classes = [permissions.AllowAny]  # Allow anyone to access this endpoint

    def get_queryset(self):
        destination_id = self.kwargs['destination_id']

        return Destination.objects.get(id = destination_id).locations.all()

class PackageListCreateView(generics.ListCreateAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class PackageRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent]

class PackageListByLocationView(generics.ListAPIView):
    serializer_class = PackageSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        location_id = self.kwargs['location_id']
        return Package.objects.filter(location_id=location_id)

class ItineraryListCreateView(generics.ListCreateAPIView):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ItineraryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class ItineraryListByPackageView(generics.ListAPIView):
    serializer_class = ItinerarySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        package_id = self.kwargs['package_id']
        return Itinerary.objects.filter(package_id=package_id)
    
class HotelListCreateView(generics.ListCreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

class HotelRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class FlightListCreateView(generics.ListCreateAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent]

class FlightRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent]

class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyTraveller]

class BookingRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyTraveller]