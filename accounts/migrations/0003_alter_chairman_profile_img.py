# Generated by Django 4.1.5 on 2023-03-15 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_delete_notification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='chairman',
            name='profile_img',
            field=models.ImageField(blank=True, null=True, upload_to='chair_imgs/'),
        ),
    ]
