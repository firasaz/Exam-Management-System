# Generated by Django 4.1.5 on 2023-01-18 11:48

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0003_notification'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='prerequisites',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='teachers.course'),
            preserve_default=False,
        ),
    ]