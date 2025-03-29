from django.urls import path
from .views import DestinationListCreateView, DestinationRetrieveUpdateDestroyView, LocationListCreateView, LocationListByDestinationView, LocationRetrieveUpdateDestroyView, PackageListByLocationView, PackageListCreateView, PackageRetrieveUpdateDestroyView, ItineraryListCreateView, ItineraryRetrieveUpdateDestroyView, ItineraryListByPackageView, HotelListCreateView, HotelRetrieveUpdateDestroyView

urlpatterns = [
    path('locations/', LocationListCreateView.as_view(), name='location-list-create'),
    path('locations/<int:pk>/', LocationRetrieveUpdateDestroyView.as_view(), name='location-retrieve-update-destroy'),
    path('destinations/', DestinationListCreateView.as_view(), name='destination-list-create'),
    path('destinations/<int:pk>/', DestinationRetrieveUpdateDestroyView.as_view(), name='destination-retrieve-update-destroy'),
    path('destinations/<int:destination_id>/locations/', LocationListByDestinationView.as_view(), name='location-list-by-destination'),
     path('packages/', PackageListCreateView.as_view(), name='package-list-create'),
    path('packages/<int:pk>/', PackageRetrieveUpdateDestroyView.as_view(), name='package-retrieve-update-destroy'),

    # Get packages by location
    path('locations/<int:location_id>/packages/', PackageListByLocationView.as_view(), name='package-list-by-location'),
        path('itineraries/', ItineraryListCreateView.as_view(), name='itinerary-list-create'),
    path('itineraries/<int:pk>/', ItineraryRetrieveUpdateDestroyView.as_view(), name='itinerary-retrieve-update-destroy'),

    # Get itineraries by package
    path('packages/<int:package_id>/itineraries/', ItineraryListByPackageView.as_view(), name='itinerary-list-by-package'),
    path('hotels/', HotelListCreateView.as_view(), name='hotel-list-create'),
    path('hotels/<int:pk>/', HotelRetrieveUpdateDestroyView.as_view(), name='hotel-retrieve-update-destroy'),
]