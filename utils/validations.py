import re
import filetype
import datetime

def validate_username(value):
    return value and len(value) > 4

def validate_password(value):
    return bool(re.search(r"\d", value)) and len(value) > 4 and bool(re.search(r"[A-Z]", value)) and bool(re.search(r"[a-z]", value))

def validate_email(value):
    return "@" in value

def validate_phone_number(num):
    return bool(re.match(r"^\+?1?\d{9,15}$", num))

def validate_description(value):
    return value and len(value) > 10

from datetime import datetime

def validate_dates(start_date, end_date):
    try:
        start = datetime.strptime(start_date, "%Y-%m-%d")
        end = datetime.strptime(end_date, "%Y-%m-%d")
        
        if end < start:
            return False
        
        return True
    except ValueError:
        return False

def validate_true(text):
    return True

def validate_conf_img(conf_img):
    ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "gif"}
    ALLOWED_MIMETYPES = {"image/jpeg", "image/png", "image/gif"}
    if conf_img is None:
        return False

    # check if the browser submitted an empty file
    if conf_img.filename == "":
        return False
    ftype_guess = filetype.guess(conf_img)
    if ftype_guess.extension not in ALLOWED_EXTENSIONS:
        return False
    # check mimetype
    if ftype_guess.mime not in ALLOWED_MIMETYPES:
        return False
    return True
    
def validate_activity(nombre,email,celular,fecha_inicio,fecha_termino,descripcion):
    return (validate_username(nombre) 
            and validate_email(email)
            and validate_description(descripcion)
    )
'''and validate_dates(fecha_inicio,fecha_termino)'''