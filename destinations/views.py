from rest_framework import generics, permissions
from .models import Destination, Location, Package, Itinerary, Hotel, Flight, Booking
from .serializers import DestinationSerializer, LocationSerializer, PackageSerializer, ItinerarySerializer, HotelSerializer, FlightSerializer, BookingSerializer
from accounts.permissions import IsAuthenticatedOrReadOnlyAgent, IsAuthenticatedOrReadOnlyTraveller


class DestinationListCreateView(generics.ListCreateAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)


class DestinationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Destination.objects.all()
    serializer_class = DestinationSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

class LocationListCreateView(generics.ListCreateAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

class LocationRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Location.objects.all()
    serializer_class = LocationSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

class LocationListByDestinationView(generics.ListAPIView):
    serializer_class = LocationSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        destination_id = self.kwargs['destination_id']
        return Location.objects.filter(destination__id = destination_id).all()

class PackageListCreateView(generics.ListCreateAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

class PackageRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Package.objects.all()
    serializer_class = PackageSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

class PackageListByDestinationView(generics.ListAPIView):
    serializer_class = PackageSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        destination_id = self.kwargs['destination_id']
        return Package.objects.filter(destination__id=destination_id)

class ItineraryListCreateView(generics.ListCreateAPIView):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

class ItineraryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Itinerary.objects.all()
    serializer_class = ItinerarySerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

class ItineraryListByPackageView(generics.ListAPIView):
    serializer_class = ItinerarySerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        package_id = self.kwargs['package_id']
        return Itinerary.objects.filter(package__id=package_id).order_by("order")
    
class HotelListCreateView(generics.ListCreateAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

class HotelRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]


class FlightListCreateView(generics.ListCreateAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

class FlightRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Flight.objects.all()
    serializer_class = FlightSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

class FlightListByPackageView(generics.ListAPIView):
    serializer_class = FlightSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyAgent | permissions.IsAdminUser]

    def get_queryset(self):
        package_id = self.kwargs['package_id']
        return Flight.objects.filter(package__id=package_id)

class BookingListCreateView(generics.ListCreateAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyTraveller | permissions.IsAdminUser]

class BookingRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Booking.objects.all()
    serializer_class = BookingSerializer
    permission_classes = [IsAuthenticatedOrReadOnlyTraveller | permissions.IsAdminUser]