from django.db import models

# Create your models here.

# Chairman


class Chairman(models.Model):
    full_name = models.CharField(max_length=100)
    email = models.CharField(max_length=100)
    password = models.CharField(max_length=100, blank=True, null=True)
    qualification = models.CharField(max_length=200)
    department = models.CharField(max_length=50)
    profile_img = models.ImageField(upload_to='chair_imgs/', null=True)

    class Meta:
        verbose_name_plural = "Chairman"
