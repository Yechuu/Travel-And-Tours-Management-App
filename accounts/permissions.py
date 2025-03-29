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

# class IsAuthenticatedAgent(IsAuthenticatedOrReadOnly):

#     def has_permission(self, request, view):
#         return super().has_permission(request, view) and request.user.role == 'agent'


# class IsTraveller(permissions.BasePermission):
#     """
#     Allows access only to users with is_traveller=True.
#     """
#     def has_permission(self, request, view):
#         return bool(request.user and request.user.is_authenticated and request.user.is_traveller)

# class IsAgent(permissions.BasePermission):
#     """
#     Allows access only to users with is_agent=True.
#     """
#     def has_permission(self, request, view):
#         return bool(request.user and request.user.is_authenticated and request.user.is_agent)
