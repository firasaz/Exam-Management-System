# Generated by Django 4.1.3 on 2023-01-01 16:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('teachers', '0003_course_student_alter_course_category_and_more'),
    ]

    operations = [
        migrations.CreateModel(
            name='TeacherUser',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('last_login', models.DateTimeField(blank=True, null=True, verbose_name='last login')),
                ('is_superuser', models.BooleanField(default=False, help_text='Designates that this user has all permissions without explicitly assigning them.', verbose_name='superuser status')),
                ('full_name', models.CharField(max_length=100)),
                ('email', models.CharField(max_length=100, unique=True)),
                ('password', models.CharField(blank=True, max_length=100, null=True)),
                ('qualification', models.CharField(max_length=200)),
                ('department', models.CharField(max_length=50)),
                ('is_staff', models.BooleanField(default=False)),
                ('is_active', models.BooleanField(default=False)),
                ('groups', models.ManyToManyField(blank=True, help_text='The groups this user belongs to. A user will get all permissions granted to each of their groups.', related_name='user_set', related_query_name='user', to='auth.group', verbose_name='groups')),
                ('user_permissions', models.ManyToManyField(blank=True, help_text='Specific permissions for this user.', related_name='user_set', related_query_name='user', to='auth.permission', verbose_name='user permissions')),
            ],
            options={
                'verbose_name_plural': 'Teacherss',
            },
        ),
    ]
