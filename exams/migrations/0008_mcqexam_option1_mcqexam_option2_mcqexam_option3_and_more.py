# Generated by Django 4.1.1 on 2022-10-27 18:29

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0007_alter_mcqexam_options'),
    ]

    operations = [
        migrations.AddField(
            model_name='mcqexam',
            name='option1',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='mcqexam',
            name='option2',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='mcqexam',
            name='option3',
            field=models.CharField(max_length=100, null=True),
        ),
        migrations.AddField(
            model_name='mcqexam',
            name='option4',
            field=models.CharField(max_length=100, null=True),
        ),
    ]
