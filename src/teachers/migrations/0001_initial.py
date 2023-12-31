# Generated by Django 4.1.5 on 2023-01-15 22:02

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('students', '0001_initial'),
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='CourseCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField()),
            ],
            options={
                'verbose_name_plural': 'Course Categories',
            },
        ),
        migrations.CreateModel(
            name='Teacher',
            fields=[
                ('newuser_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to=settings.AUTH_USER_MODEL)),
                ('qualification', models.CharField(max_length=200)),
                ('department', models.CharField(max_length=50)),
                ('profile_img', models.ImageField(blank=True, null=True, upload_to='static/images/teacher_imgs/')),
            ],
            options={
                'verbose_name_plural': 'Teachers',
            },
            bases=('Users.newuser',),
        ),
        migrations.CreateModel(
            name='Course',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=150)),
                ('description', models.TextField()),
                ('featured_img', models.ImageField(blank=True, null=True, upload_to='static/images/course_imgs')),
                ('prerequisites', models.TextField(blank=True, null=True)),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_category', to='teachers.coursecategory')),
                ('student', models.ManyToManyField(blank=True, related_name='course_student', to='students.student')),
                ('teacher', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='course_teacher', to='teachers.teacher')),
            ],
            options={
                'verbose_name_plural': 'Course',
            },
        ),
    ]
