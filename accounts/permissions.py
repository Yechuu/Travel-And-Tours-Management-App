from rest_framework.permissions import IsAuthenticatedOrReadOnly, SAFE_METHODS

class IsAuthenticatedOrReadOnlyAgent(IsAuthenticatedOrReadOnly):

    def has_permission(self, request, view):

        if request.method in SAFE_METHODS:
            return super().has_permission(request, view)

        return super().has_permission(request, view) and request.user.role == 'agent'


class IsAuthenticatedOrReadOnlyTraveller(IsAuthenticatedOrReadOnly):

    def has_permission(self, request, view):

        if request.method in SAFE_METHODS:
            return super().has_permission(request, view)

        return super().has_permission(request, view) and request.user.role == 'traveller'
