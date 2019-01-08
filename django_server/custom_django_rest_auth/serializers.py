from rest_framework import serializers
from django.contrib.auth.forms import PasswordResetForm
from django.conf import settings

class PasswordResetSerializer(serializers.Serializer):
    """
    Serializer for requesting a password reset e-mail.
    """
    email = serializers.EmailField()

    password_reset_form_class = PasswordResetForm

    def get_email_options(self):
        """Override this method to change default e-mail options"""
        return {
            'email_template_name': 'email_templates/password_reset_email.html',
            'extra_email_context': {
                'domain': 'localhost:3006',
                'site_name': 'Sebucur',
            },
        }

    def validate_email(self, value):
        # Create PasswordResetForm with the serializer
        self.reset_form = self.password_reset_form_class(data=self.initial_data)
        if not self.reset_form.is_valid():
            raise serializers.ValidationError(self.reset_form.errors)

        return value

    def save(self):
        request = self.context.get('request')
        # Set some values to trigger the send_email method.
        opts = {
            'use_https': request.is_secure(),
            'from_email': getattr(settings, 'DEFAULT_FROM_EMAIL'),
            'request': request,
        }
        opts.update(self.get_email_options())
        print(dir(opts))
        print(opts.values)
        self.reset_form.save(**opts)