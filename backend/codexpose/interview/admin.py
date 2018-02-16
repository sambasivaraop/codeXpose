"""Admin module."""
from django import forms
from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from . models import Test, Question, User, CandidateTestMapping


class CandidateTestMappingForm(forms.ModelForm):
    """A form for mapping candidate with test."""
    def __init__(self, *args, **kwargs):
        super(CandidateTestMappingForm, self).__init__(*args, **kwargs)
        self.fields['candidate'].queryset = User.objects.filter(
            user_type="CANDIDATE")


class MyCandidateTestMappingAdmin(admin.ModelAdmin):
    """Custom admin page for candidate test mapping."""
    form = CandidateTestMappingForm

    list_display = ('candidate', 'test',)
    list_filter = ('test',)


class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    password1 = forms.CharField(label='Password', widget=forms.PasswordInput)
    password2 = forms.CharField(label='Password confirmation',
                                widget=forms.PasswordInput)
    test = forms.ModelChoiceField(label='Test', queryset=Test.objects.all(),
                                  required=False)

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'user_type')

    def clean_password2(self):
        """Method to check that the two password entries match"""
        password1 = self.cleaned_data.get("password1")
        password2 = self.cleaned_data.get("password2")
        if password1 and password2 and password1 != password2:
            raise forms.ValidationError("Passwords don't match")
        return password2

    def save(self, commit=True):
        # Save the provided password in hashed format
        user = super(UserCreationForm, self).save(commit=False)
        if user.user_type == 'CANDIDATE':
            user.is_staff = False
        user.set_password(self.cleaned_data["password1"])
        user.save()
        if self.data.get('test') != '' and self.data.get('user_type') == \
                'CANDIDATE':
            test_obj = Test.objects.get(id=self.data.get('test'))
            _ = CandidateTestMapping.objects.create(candidate=user,
                                                    test=test_obj)
        return user


class UserChangeForm(forms.ModelForm):
    """A form for updating users. Includes all the fields on
    the user, but replaces the password field with admin's
    password hash display field.
    """
    password = ReadOnlyPasswordHashField()

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name', 'user_type')

    # def clean_password(self):
    #     # Regardless of what the user provides, return the initial value.
    #     # This is done here, rather than on the field, because the
    #     # field does not have access to the initial value
    #     return self.initial["email"]


class MyUserAdmin(BaseUserAdmin):
    """Custom admin page for User model"""
    form = UserChangeForm
    add_form = UserCreationForm
    # The fields to be used in displaying the User model.
    # These override the definitions on the base UserAdmin
    # that reference specific fields on auth.User.
    list_display = ('email', 'first_name', 'last_name', 'user_type',
                    'is_staff')
    list_filter = ('user_type',)
    fieldsets = (
        (None, {'fields': ('email', 'first_name', 'last_name', 'user_type')}),
    )
    # add_fieldsets is not a standard ModelAdmin attribute. UserAdmin
    # overrides get_fieldsets to use this attribute when creating a user.
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'first_name', 'last_name', 'user_type',
                       'test', 'password1', 'password2')}),
    )
    search_fields = ('email',)
    ordering = ('email',)
    filter_horizontal = ()


admin.site.register(Test)
admin.site.register(Question)
admin.site.register(User, MyUserAdmin)
admin.site.register(CandidateTestMapping, MyCandidateTestMappingAdmin)
