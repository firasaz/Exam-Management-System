# Generated by Django 4.1.3 on 2022-11-21 11:15

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_chairman_course_coursecategory_student_and_more'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='notification',
            options={'verbose_name_plural': '8. Notification'},
        ),
        migrations.AlterModelOptions(
            name='student',
            options={'verbose_name_plural': '5. Student'},
        ),
        migrations.AlterModelOptions(
            name='studentassignment',
            options={'verbose_name_plural': '7. Student Assignments'},
        ),
        migrations.AlterModelOptions(
            name='studentcourseenrollment',
            options={'verbose_name_plural': '6. Enrolled Courses'},
        ),
        migrations.DeleteModel(
            name='Exam',
        ),
    ]
