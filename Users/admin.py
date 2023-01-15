from django.contrib import admin

from django.contrib.auth.admin import UserAdmin
from .models import NewUser

# Register your models here.

class UserAdminConfig(UserAdmin):
    list_display = ('full_name','email','is_staff','is_superuser','is_active')
    list_filter = ('email','full_name','is_superuser','is_staff','is_active')
    search_fields = ('email','full_name')
    ordering = ('-start_date',)

    fieldsets = (
        (None, {'fields':('full_name','email')}),
        ('Permissions', {'fields':('is_staff','is_superuser','is_active')}),
        ('Important Dates', {'fields':('start_date','last_login')})
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields':('full_name','email','password1','password2')}),
        ('Permissions', {
            'classes': ('wide',),
            'fields':('is_staff','is_superuser','is_active')}),
        # ('Important Dates', {
        #     'classes': ('wide',),
        #     'fields':('start_date','last_login')})
    )

admin.site.register(NewUser, UserAdminConfig)