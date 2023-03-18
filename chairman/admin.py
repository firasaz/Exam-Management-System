from django.contrib import admin

from Users.admin import UserAdmin
from .models import Chairman
# Register your models here.

# class ChairAdminConfig(UserAdmin):
#     list_display = ('full_name','email','department','qualification','is_staff','is_superuser','is_active')
#     list_filter = ('department','email','full_name','is_superuser','is_staff','is_active')
#     search_fields = ('email','full_name','department','username')
#     ordering = ('-start_date',)

#     fieldsets = (
#         (None, {
#             'fields':('full_name','email','username','department','qualification','profile_img')
#             }),
#         ('Permissions', {
#             'fields':('is_staff','is_superuser','is_active')
#             }),
#         ('Important Dates', {
#             'fields':('start_date','last_login')
#             }),
#         ('Groups', {
#             'fields': ('groups','user_permissions')
#         })
#     )

#     add_fieldsets = (
#         (None, {
#             'classes': ('wide',),
#             'fields':('full_name','email','department','qualification','password1','password2','profile_img') # for now we cannot add a username to a student while adding a student. add the username when editing an existing user.
#             }),
#         ('Permissions', {
#             'classes': ('wide',),
#             'fields':('is_staff','is_superuser','is_active')
#             }),
#         ('Groups', {
#             'classes': ('wide',),
#             'fields':('groups','user_permissions')
#             })
#     )
admin.site.register(Chairman)
