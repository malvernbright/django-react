from django.contrib.auth.models import User
from rest_framework import serializers
from django.contrib.auth.hashers import make_password
from .models import Note


# def validate_password(self, value: str) -> str:
#             """
#             Hash value passed by user.

#             :param value: password of a user
#             :return: a hashed version of the password
#             """
#             return make_password(value)

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]
        extra_kwargs = {"password": {"write_only": True}}

    def create(self, validated_data):
        print(validated_data)
        user = User.objects.create_user(**validated_data)
        return user
    

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ["id", "title", "content", "created_at", "updated_at", "author"]
        extra_kwargs = {"author": {"read_only": True}}

        # def create(self, validated_data):
        #     note = Note.objects.create(**validated_data)
        #     return note