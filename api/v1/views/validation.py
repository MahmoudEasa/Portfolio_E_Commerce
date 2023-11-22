#!/usr/bin/python3
import validators
import phonenumbers


def validate(req):
    """ Validate Data """
    country_code = "EG"

    if 'email' in req:
        if not validators.email(req['email']):
            return ("Email is invalid.")

    if 'phone' in req:
        try:
            parsed_number = phonenumbers.parse(req['phone'], country_code)
            if not phonenumbers.is_valid_number(parsed_number):
                return ("Phone number is invalid.")
        except phonenumbers.phonenumberutil.NumberParseException:
            return ("Error parsing phone number.")

    return (None)
