# Generated by Django 4.1.5 on 2023-04-12 14:21

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='newuser',
            options={'verbose_name_plural': 'My Custom User Model'},
        ),
    ]
