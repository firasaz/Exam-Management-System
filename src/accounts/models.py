from django.db import models
# from django.contrib.auth.models import User

from Users.models import NewUser
from teachers.models import Teacher
from students.models import Student

# Chairman
class Chairman(NewUser):
    # user=models.OneToOneField(User, on_delete=models.CASCADE)
    # email = models.CharField(max_length=100)
    # password = models.CharField(max_length=100, blank=True, null=True)
    qualification = models.CharField(max_length=200)
    department = models.CharField(max_length=50)
    profile_img = models.ImageField(upload_to='chair_imgs/', null=True, blank=True)


    class Meta:
        verbose_name_plural = "Chairman"


#notifications model
# class Notification(models.Model):
#     teacher=models.ForeignKey(Teacher,on_delete=models.CASCADE, null=True)
#     student=models.ForeignKey(Student,on_delete=models.CASCADE,null=True)
#     notif_subject=models.CharField(max_length=200, verbose_name='Notification subject',null=True)
#     notif_for=models.CharField(max_length=200, verbose_name='Notification For')
#     notif_created_time=models.DateTimeField(auto_now_add=True)
#     notif_read_status=models.BooleanField(default=False, verbose_name='Notification Status')

#     class Meta:
#         verbose_name_plural="Notifications"