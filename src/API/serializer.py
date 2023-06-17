from rest_framework import serializers


from exams.models import Exam, AttemptExam
from questions.models import Question, Answer, ExamQuestionAnswers
from accounts.models import Teacher, Student  # , StudentCourseEnrollment
from teachers.models import Course, CourseCategory, TeacherStudentChat, Notification
from chairman.models import Chairman
# from students.models import StudentAssignment


class TeacherNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['full_name']


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["id","text","correct","question"]


class QuestionSerializer(serializers.ModelSerializer):
    answers = AnswerSerializer(many=True)

    class Meta:
        model = Question
        fields = ("id","question", "exam", "type", "points", "created", "answers")

class AddQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ("id","question", "exam", "type", "points", "created")


class ExamTeacherSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ["get_teacher"]


class AddExamSerializer(serializers.ModelSerializer):
    # get_teacher = ExamTeacherSerializer(many=True)
    class Meta:
        model = Exam
        fields = ("id", "name", "description", "number_of_questions", "duration", "course", "teacher")  # "student", "get_teacher"


class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseCategory
        fields = "__all__"


class CourseTitleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title']


class CourseEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        # fields = "__all__"
        fields = ["id", "category", "title", "teacher", "description", "featured_img", "prerequisites"]


class CourseSerializer(serializers.ModelSerializer):
    # category = CategorySerializer()
    class Meta:
        model = Course
        fields = ["id","category","title","teacher","description","featured_img","prerequisites"]

# class ExamEditSerializer(serializers.ModelSerializer):
#     class Meta:
#         model=Exam
#         fields=['id','name','description','number_of_questions','duration']


class TeacherCourseSerializer(serializers.ModelSerializer):
    # examss = ExamEditSerializer(many=True)
    class Meta:
        model = Course
        # fields = "__all__"
        fields = ["id", "title", "description", "featured_img", "prerequisites", "category", ]  # "examss"


class TeacherEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ["id", "full_name", "email", "qualification", "profile_img"]  # "department"


class TeacherDashboardSerializer(serializers.ModelSerializer):
    class Meta:
        model = Teacher
        fields = ['total_teacher_courses', 'total_teacher_exams', 'total_teacher_students']


class TeacherSerializer(serializers.ModelSerializer):
    teacher_courses = CourseEditSerializer(many=True)
    # teacher_students=StudentSerializer(many=True) # need to reorder the serializers to work
    # teacher_exams=ExamSerializer(many=True) # need to reorder the serializers to work

    class Meta:
        model = Teacher
        fields = ["id","full_name","email","username","department","qualification","profile_img","teacher_courses","password","position"]
    
class StudentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        # fields = '__all__'
        fields = ['id','full_name','email','username','profile_img','password']

class CourseDetailSerializer(serializers.ModelSerializer):
    # specifying the fields of the teacher and the student doesn't allow the frontend to work
    # the issue probably is that we would need to send the teacher information listed in the teacher serializer

    # many=True is wrong since this returns ONE teacher object not a list of teacher objects
    teacher = TeacherSerializer()
    # to tell the serializer to iterate over each student object in the list and serialize it
    student = StudentSerializer(many=True)
    category = CategorySerializer()

    class Meta:
        model = Course
        # fields = "__all__"
        fields = ["id", "title", "description", "featured_img", "prerequisites", "category", "teacher", "student"]

class ExamSerializer(serializers.ModelSerializer):
    course = CourseTitleSerializer()
    # this field should match the related name specified in the model connected to this model
    questions = QuestionSerializer(many=True)
    # get_teacher = ExamTeacherSerializer() # many=True is wrong because_get_teacher returns one teacher object only as each exam can have one teacher only, no more no less
    teacher = TeacherSerializer()
    student = StudentSerializer(many=True)

    class Meta:
        model = Exam
        fields = ("id", "name", "description", "number_of_questions", "duration", "course", "questions", "teacher", "student")


class ExamEditSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = ['id', 'name', 'description', 'number_of_questions', 'duration']



class ExamQuestionAnswersSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamQuestionAnswers
        fields = '__all__'

class StudentDashboardSerializer(serializers.ModelSerializer):
    # total_enrolled_courses=CourseSerializer(many=True)
    class Meta:
        model = Student
        fields = ['total_enrolled_courses', 'completed_assignments', 'pending_assignments', 'total_exams']
    # total_student_exams


class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['id', 'title', 'student']


class StudentDetailSerializer(serializers.ModelSerializer):
    # enrolled_courses = CourseSerializer(many=True)
    # get_teachers = TeacherSerializer(many=True)

    class Meta:
        model = Student
        # fields = '__all__'
        fields = ['id', 'full_name', 'email', 'username',]

class StudentCourseEnrollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = ['title', 'total_enrolled_students']

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
        fields = ['id', 'full_name', 'email', 'password', 'qualification', 'department', 'profile_img']
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
        fields = ['id', 'teacher', 'student', 'msg_from', 'msg_text', 'msg_time']

    def to_representation(self, instance):
        representation = super(TeacherStudentChatSerializer, self).to_representation(instance)
        representation['msg_time'] = instance.msg_time.strftime( "%Y-%m-%d %H:%M")
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

class StudentNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Student
        fields = ['full_name']

class AnswerNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ['text']

class QuestionNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ['question','points']

class StudentAnswers(serializers.ModelSerializer):
    student = StudentNameSerializer()
    answer_mcq = AnswerSerializer()
    question = QuestionNameSerializer()

    # student_name = serializers.SerializerMethodField()
    # exam_name = serializers.SerializerMethodField()
    # question_text = serializers.SerializerMethodField()

    class Meta:
        model = ExamQuestionAnswers
        fields = '__all__'
    
    # def get_student_name(self, obj):
    #     return obj.student.full_name
    
    # def get_exam_name(self, obj):
    #     return obj.exam.name
    
    # def get_question_text(self, obj):
    #     return obj.question.question

    
