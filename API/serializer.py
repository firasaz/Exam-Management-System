from rest_framework import serializers

from exams.models import MCQ_Exam
from questions.models import Question, Answer
from accounts.models import Teacher, Student #, StudentCourseEnrollment
from teachers.models import Course, CourseCategory
# from students.models import StudentAssignment

class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"

class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)
    class Meta:
        model = Question
        fields = ("text", "exam","type", "created", "answers")

class ExamTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = MCQ_Exam
        fields = ["get_teacher"]

class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True) # this field should match the related name specified in the model connected to this model
    get_teacher = ExamTeacherSerializer() # many=True is wrong because_get_teacher returns one teacher object only as each exam can have one teacher only, no more no less
    class Meta:
        model = MCQ_Exam
        fields = ("id","name", "description", "number_of_questions", "duration", "course", "questions","get_teacher")

class AddExamSerializer(serializers.ModelSerializer):
    # get_teacher = ExamTeacherSerializer(many=True)
    class Meta:
        model = MCQ_Exam
        fields = ("id", "name", "description", "number_of_questions", "duration","course","teacher","student") # "get_teacher"


# Abdallah's serializers
# class TeacherSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Teacher
#         fields = "__all__"

#     # def __init__(self, *args, **kwargs):
#     #     super(TeacherSerializer, self).__init__(*args, **kwargs)
#     #     request = self.context.get('request')
#     #     self.Meta.depth = 0
#     #     if request and request.method == 'GET':
#     #         self.Meta.depth = 2

class CourseEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        # fields = "__all__"
        fields = ["category","title","description","featured_img","prerequisites"]

class CourseSerializer(serializers.ModelSerializer):
    # specifying the fields of the teacher and the student doesn't allow the frontend to work
    # the issue probably is that we would need to send the teacher information listed in the teacher serializer

    # teacher=TeacherSerializer() # many=True is wrong since this returns ONE teacher object not a list of teacher objects
    # student=StudentSerializer(many=True) # to tell the serializer to iterate over each student object in the list and serialize it
    class Meta:
        model = Course
        # fields = "__all__"
        fields = ["id","title","description","featured_img","prerequisites","category","teacher","student"]


    def __init__(self, *args, **kwargs):
        super(CourseSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        # print("REQUEST:")
        # print(request)
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
        
    # def __init__(self, *args, **kwargs):
    #     super(ExamSerializer, self).__init__(*args, **kwargs)
    #     request = self.context.get('request')
    #     self.Meta.depth = 0
    #     if request and request.method == 'GET':
    #         self.Meta.depth = 1

class TeacherCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        # fields = "__all__"
        fields = ["id","title","description","featured_img","prerequisites","category"]
    
class TeacherSerializer(serializers.ModelSerializer):
    teacher_courses=CourseEditSerializer(many=True)
    class Meta:
        model = Teacher
        fields = ["id","full_name","email","username","department","qualification","profile_img","teacher_courses"]
        
class TeacherEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ["id","full_name","email","qualification","profile_img"] # "department"

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=['total_teacher_courses','total_teacher_exams','total_teacher_students']
    #   total_teacher_exams

class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        # fields = '__all__'
        fields = ['id','full_name','email','username','profile_img']



class StudentDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Student
        fields=['enrolled_courses','completed_assignments','pending_assignments','get_exams']
    #total_student_exams

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id','title','student']



class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = "__all__"




class StudentDetailSerializer(serializers.ModelSerializer):
    enrolled_courses = CourseSerializer(many=True)
    get_teachers = TeacherSerializer(many=True)
    class Meta:
        model = Student
        # fields = '__all__'
        fields = ['id','full_name','email','username','password','enrolled_courses','get_teachers']

    def __init__(self, *args, **kwargs):
        super(StudentSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth =2



# class StudentCourseEnrollSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = StudentCourseEnrollment
#         fields = ['id','course','student','enrolled_time']

#     def __init__(self, *args, **kwargs):
#         super(StudentCourseEnrollSerializer, self).__init__(*args, **kwargs)
#         request = self.context.get('request')
#         self.Meta.depth = 0
#         if request and request.method == 'GET':
#             self.Meta.depth = 2

# class StudentAssignmentSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = StudentAssignment
#         fields = ['id','teacher','student', 'title','detail','student_status','add_time']

#     def __init__(self, *args, **kwargs):
#         super(StudentAssignmentSerializer, self).__init__(*args, **kwargs)
#         request = self.context.get('request')
#         self.Meta.depth = 0
#         if request and request.method == 'GET':
#             self.Meta.depth = 2

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields='__all__'
