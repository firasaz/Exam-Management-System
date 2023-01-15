# Generated by Django 4.1.5 on 2023-01-14 18:16

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Student',
            fields=[
                ('newuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('profile_img', models.ImageField(null=True, upload_to='static/images/student_imgs/')),
            ],
            options={
                'verbose_name_plural': 'Students',
            },
            bases=('Users.newuser',),
        ),
        migrations.CreateModel(
            name='StudentAssignment',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200)),
                ('detail', models.TextField(null=True)),
                ('student_status', models.BooleanField(default=False, null=True)),
                ('add_time', models.DateTimeField(auto_now_add=True)),
                ('student', models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='students.student')),
            ],
            options={
                'verbose_name_plural': '7. Student Assignments',
            },
        ),
    ]
