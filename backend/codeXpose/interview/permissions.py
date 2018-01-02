from rest_framework import permissions


class UserViewSetPermission(permissions.BasePermission):
    """Custom permission class for User view set."""

    def has_permission(self, request, view):
        user = request.user
        if user.user_type == 'interviewer':
            return True
        return False

    def has_object_permission(self, request, view, obj):
        # Instance must have an attribute named `email`.
        if request.user.user_type == "interviewer":
            return True
        return obj.email == request.user.email


class QuestionViewSetPermission(permissions.BasePermission):
    """Custom permission class for Question view set."""
    def has_permission(self, request, view):
        user = request.user
        if user.user_type != 'interviewer':
            return False
        return True

    def has_object_permission(self, request, view, obj):
        return True


class TestViewSetPermission(permissions.BasePermission):
    """Custom permission class for Test view set."""

    def has_permission(self, request, view):
        user = request.user
        if user.user_type != 'interviewer':
            return False
        return True

    def has_object_permission(self, request, view, obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        return obj.created_by == request.user


