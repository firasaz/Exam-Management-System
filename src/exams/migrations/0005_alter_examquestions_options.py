# Generated by Django 4.1.5 on 2023-01-18 00:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('exams', '0004_rename_questions_examquestions_question'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='examquestions',
            options={'verbose_name_plural': 'Exam Questions'},
        ),
    ]
