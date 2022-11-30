from rest_framework import serializers

from exams.models import MCQ_Exam
from questions.models import Question, Answer
from accounts.models import Teacher, Student, StudentCourseEnrollment
from teachers.models import Course, CourseCategory
from students.models import StudentAssignment

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    class Meta:
        model = Question
        fields = ("text", "exam","type", "created", "answers")

class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True) # this field should match the related name specified in the model connected to this model
    class Meta:
        model = MCQ_Exam
        fields = ("id","name", "description", "number_of_questions", "time", "questions")


# Abdallah's serializers
class TeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = "__all__"
        #teacher_courses

    def __init__(self, *args, **kwargs):
        super(TeacherSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=['total_teacher_courses','total_teacher_courses']
    #   total_teacher_exams

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = ['id','title','description']


class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id','category','teacher', 'title','description','course_exams','total_enrolled_students']

    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2



    def __init__(self, *args, **kwargs):
        super(ExamSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 1


class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['id','full_name','email','password','username']

    def __init__(self, *args, **kwargs):
        super(StudentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =2


class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields=['enrolled_courses','completed_assignments','pending_assignments']
    #total_student_exams

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentCourseEnrollment
        fields = ['id','course','student','enrolled_time']

    def __init__(self, *args, **kwargs):
        super(StudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class StudentAssignmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentAssignment
        fields = ['id','teacher','student', 'title','detail','student_status','add_time']

    def __init__(self, *args, **kwargs):
        super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields='__all__'
