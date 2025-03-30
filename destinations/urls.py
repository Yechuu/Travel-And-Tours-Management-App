from django.urls import path
from .views import DestinationListCreateView, DestinationRetrieveUpdateDestroyView, LocationListCreateView, LocationListByDestinationView, LocationRetrieveUpdateDestroyView, PackageListByDestinationView, PackageListCreateView, PackageRetrieveUpdateDestroyView, ItineraryListCreateView, ItineraryRetrieveUpdateDestroyView, ItineraryListByPackageView, HotelListCreateView, HotelRetrieveUpdateDestroyView, FlightListCreateView, FlightRetrieveUpdateDestroyView, BookingListCreateView, BookingRetrieveUpdateDestroyView, FlightListByPackageView
urlpatterns = [

    # Destination
    path('destinations/', DestinationListCreateView.as_view(), name='destination-list-create'),
    path('destinations/<int:pk>/', DestinationRetrieveUpdateDestroyView.as_view(), name='destination-retrieve-update-destroy'),
    
    # Location
    path('locations/', LocationListCreateView.as_view(), name='location-list-create'),
    path('locations/<int:pk>/', LocationRetrieveUpdateDestroyView.as_view(), name='location-retrieve-update-destroy'),
    path('destinations/<int:destination_id>/locations/', LocationListByDestinationView.as_view(), name='location-list-by-destination'),
    
    # Packages
    path('packages/', PackageListCreateView.as_view(), name='package-list-create'),
    path('packages/<int:pk>/', PackageRetrieveUpdateDestroyView.as_view(), name='package-retrieve-update-destroy'),
    path('destinations/<int:destination_id>/packages/', PackageListByDestinationView.as_view(), name='package-list-by-location'),

    # Hotels
    path('hotels/', HotelListCreateView.as_view(), name='hotel-list-create'),
    path('hotels/<int:pk>/', HotelRetrieveUpdateDestroyView.as_view(), name='hotel-retrieve-update-destroy'),
    
    # Itineraries
    path('itineraries/', ItineraryListCreateView.as_view(), name='itinerary-list-create'),
    path('itineraries/<int:pk>/', ItineraryRetrieveUpdateDestroyView.as_view(), name='itinerary-retrieve-update-destroy'),
    path('packages/<int:package_id>/itineraries/', ItineraryListByPackageView.as_view(), name='itinerary-list-by-package'),

    path('flights/', FlightListCreateView.as_view(), name='flight-list-create'),
    path('flights/<int:pk>/', FlightRetrieveUpdateDestroyView.as_view(), name='flight-retrieve-update-destroy'),
    path('packages/<int:package_id>/flights/', FlightListByPackageView.as_view(), name='flight-list-by-package'),


    path('bookings/', BookingListCreateView.as_view(), name='bookings-list-create'),
    path('bookings/<int:pk>/', BookingRetrieveUpdateDestroyView.as_view(), name='bookings-retrieve-update-destroy'),
]