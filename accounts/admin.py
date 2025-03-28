from django.contrib import admin

# Register your models here.

from .models import User

# Register the User model in the admin panel
admin.site.register(User)
