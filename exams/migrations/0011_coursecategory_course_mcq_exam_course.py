# Generated by Django 4.1.3 on 2022-11-21 13:15

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('teachers', '0001_initial'),
        ('exams', '0010_alter_coursecategory_options_alter_mcq_exam_options_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='coursecategory',
            name='course',
            field=models.ForeignKey(default='', on_delete=django.db.models.deletion.CASCADE, to='teachers.course'),
        ),
        migrations.AddField(
            model_name='mcq_exam',
            name='course',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.CASCADE, to='teachers.course'),
        ),
    ]