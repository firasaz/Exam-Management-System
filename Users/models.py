# from django.db import models
# from django.utils import timezone
# from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin, BaseUserManager
# from django.utils.translation import gettext_lazy

# # Create your models here.

# class AccountManager(BaseUserManager):
#     def create_superuser(self, full_name, email, password, **other_fields):
#         other_fields.setdefault('is_staff', True)
#         other_fields.setdefault('is_active', True)
#         other_fields.setdefault('is_superuser', True)

#         if other_fields.get('is_staff') is not True:
#             raise ValueError(
#                 "Superuser must be assigned to is_staff=True."
#             )
#         if other_fields.get('is_superuser') is not True:
#             raise ValueError(
#                 "Superuser must be assigned to is_superuser=True."
#             )
        
#         return self.create_user(full_name, email, password, **other_fields)
    
#     def create_user(self, full_name, email, password, **other_fields):
#         if not email:
#             raise ValueError(gettext_lazy("You must provide an email address"))
#         email = self.normalize_email(email)
#         user = self.model(full_name=full_name, email=email, **other_fields)
#         user.set_password(password)
#         user.save()
#         return user

# class NewUser(AbstractBaseUser, PermissionsMixin):
#     full_name = models.CharField(max_length=100)
#     email = models.CharField(max_length=100,unique=True)
#     start_date = models.DateTimeField(default=timezone.now)

#     is_staff = models.BooleanField(default=False)
#     is_active = models.BooleanField(default=False)

#     objects = AccountManager()

#     USERNAME_FIELD = 'email'
#     REQUIRED_FIELDS = ['full_name']

#     class Meta:
#         verbose_name_plural = "Custom User Model"

#     def __str__(self):
#         return self.full_name
