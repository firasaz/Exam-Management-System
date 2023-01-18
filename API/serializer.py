from rest_framework import serializers


from exams.models import Exam, AttemptExam
from questions.models import Question, Answer
from accounts.models import Teacher, Student  # , StudentCourseEnrollment
from teachers.models import Course, CourseCategory, TeacherStudentChat, Notification
from chairman.models import Chairman
# from students.models import StudentAssignment


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = "__all__"


class QuestionSerializer(serializers.ModelSerializer):
    # answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ("id","question", "exam", "type", "created") # , "answers"


class ExamTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ["get_teacher"]

class AddExamSerializer(serializers.ModelSerializer):
    # get_teacher = ExamTeacherSerializer(many=True)
    class Meta:
        model = Exam
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


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = "__all__"

class CourseEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        # fields = "__all__"
        fields = ["category","title","description","featured_img","prerequisites"]

class CourseSerializer(serializers.ModelSerializer):
    category = CategorySerializer()
    class Meta:
        model = Course
        fields = ["id","title","description","featured_img","prerequisites","category"]


class TeacherCourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        # fields = "__all__"
        fields = ["id","title","description","featured_img","prerequisites","category"]
    

        
class TeacherEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ["id","full_name","email","qualification","profile_img"] # "department"

class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model=Teacher
        fields=['total_teacher_courses','total_teacher_exams','total_teacher_students']
    #   total_teacher_exams

class TeacherSerializer(serializers.ModelSerializer):
    teacher_courses=CourseEditSerializer(many=True)
    # teacher_students=StudentSerializer(many=True) # need to reorder the serializers to work
    # teacher_exams=ExamSerializer(many=True) # need to reorder the serializers to work
    class Meta:
        model = Teacher
        fields = ["id","full_name","email","username","department","qualification","profile_img","teacher_courses"]
    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        # fields = '__all__'
        fields = ['id','full_name','email','username','profile_img']

class CourseDetailSerializer(serializers.ModelSerializer):
    # specifying the fields of the teacher and the student doesn't allow the frontend to work
    # the issue probably is that we would need to send the teacher information listed in the teacher serializer

    teacher=TeacherSerializer() # many=True is wrong since this returns ONE teacher object not a list of teacher objects
    student=StudentSerializer(many=True) # to tell the serializer to iterate over each student object in the list and serialize it
    category=CategorySerializer()
    class Meta:
        model = Course
        # fields = "__all__"
        fields = ["id","title","description","featured_img","prerequisites","category","teacher","student"]

    # def __init__(self, *args, **kwargs):
    #     super(CourseDetailSerializer, self).__init__(*args, **kwargs)
    #     request = self.context.get('request')
    #     # print("REQUEST:")
    #     # print(request)
    #     self.Meta.depth = 0
    #     if request and request.method == 'GET':
    #         self.Meta.depth = 2
        
    # def __init__(self, *args, **kwargs):
    #     super(ExamSerializer, self).__init__(*args, **kwargs)
    #     request = self.context.get('request')
    #     self.Meta.depth = 0
    #     if request and request.method == 'GET':
    #         self.Meta.depth = 1


class ExamSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True) # this field should match the related name specified in the model connected to this model
    # get_teacher = ExamTeacherSerializer() # many=True is wrong because_get_teacher returns one teacher object only as each exam can have one teacher only, no more no less
    teacher=TeacherSerializer()
    class Meta:
        model = Exam
        fields = ("id","name", "description", "number_of_questions", "duration", "course", "questions","teacher")

class ExamEditSerializer(serializers.ModelSerializer):
    class Meta:
        model=Exam
        fields=['name','description','number_of_questions','duration']




class StudentDashboardSerializer(serializers.ModelSerializer):
    # total_enrolled_courses=CourseSerializer(many=True)
    class Meta:
        model=Student
        fields=['total_enrolled_courses','completed_assignments','pending_assignments','total_exams']
    #total_student_exams

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id','title','student']



class StudentDetailSerializer(serializers.ModelSerializer):
    enrolled_courses = CourseSerializer(many=True)
    get_teachers = TeacherSerializer(many=True)
    class Meta:
        model = Student
        # fields = '__all__'
        fields = ['id','full_name','email','username','password','enrolled_courses','get_teachers']

    # def __init__(self, *args, **kwargs):
    #     super(StudentSerializer, self).__init__(*args, **kwargs)
    #     request = self.context.get('request')
    #     self.Meta.depth = 0
    #     if request and request.method == 'GET':
    #         self.Meta.depth = 2




class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['title', 'total_enrolled_students']

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

class AttemptExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = AttemptExam
        fields = ['id', 'student', 'exam', 'question', 'right_ans', 'add_time']

    def __init__(self, *args, **kwargs):
        super(AttemptExamSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = '__all__'

# chairman
class ChairmanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Chairman
        fields = ['id', 'full_name', 'email', 'password','qualification', 'department', 'profile_img']
        # teacher_courses

    def __init__(self, *args, **kwargs):
        super(ChairmanSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2


class ChairmanDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['total_teacher_courses', 'total_teacher_courses']

class TeacherStudentChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeacherStudentChat
        fields = ['id', 'teacher', 'student','msg_from', 'msg_text', 'msg_time']

    def to_representation(self, instance):
        representation = super(TeacherStudentChatSerializer,self).to_representation(instance)
        representation['msg_time'] = instance.msg_time.strftime(
            "%Y-%m-%d %H:%M")
        return representation

class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = ['teacher', 'student', 'notif_subject', 'notif_for']

    def __init__(self, *args, **kwargs):
        super(NotificationSerializer, self).__init__(*args, **kwargs)
        request = self.context.get('request')
        self.Meta.depth = 0
        if request and request.method == 'GET':
            self.Meta.depth = 2
