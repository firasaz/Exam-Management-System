# Generated by Django 4.1.5 on 2023-03-15 12:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('students', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='student',
            name='position',
            field=models.CharField(default='student', max_length=100),
        ),
    ]