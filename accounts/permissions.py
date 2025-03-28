from rest_framework import permissions

class IsTraveller(permissions.BasePermission):
    """
    Allows access only to users with is_traveller=True.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_traveller)

class IsAgent(permissions.BasePermission):
    """
    Allows access only to users with is_agent=True.
    """
    def has_permission(self, request, view):
        return bool(request.user and request.user.is_authenticated and request.user.is_agent)
