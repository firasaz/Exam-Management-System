from rest_framework import serializers

from exams.models import MCQ_Exam
from questions.models import Question, Answer

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
