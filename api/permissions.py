from rest_framework import permissions

class IsOwnerOrReadOnly(permissions.BasePermission):
    def has_object_permission(self, request,view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.owner == request.user


class IsAdminUser(permissions.BasePermission):
    """
    Allows access only to admin users.
    """
    def has_permission(self, request, view):
        return request.user and request.user.is_superuser


class IsEventOwner(permissions.BasePermission):
    def has_object_permission(self, request,view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.church.owner == request.user
