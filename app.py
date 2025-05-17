from flask import Flask, request, render_template, redirect, url_for, session
from utils.validations import validate_activity
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

"""@app.route("/agregar_actividad", methods = ["POST","GET"])
def agregar_actividad():
    if request.method == "POST": 
        nombre = request.form.get("nombre")
        email = request.form.get("email")
        celular = request.form.get("celular")
        fecha_inicio = request.form.get("fecha_inicio")
        fecha_termino = request.form.get("fecha_termino")
        descripcion = request.form.get("descripcion")
        error = ""
        if validate_activity(nombre,email,celular,fecha_inicio,fecha_termino,descripcion):

            status, msg = db.register_activity(nombre,email,celular,fecha_inicio,fecha_termino,descripcion)
            if status:
                "subir actividad"
                return redirect(url_for("ver_actividades"))

            error += msg
        else: 
            error += "Uno de los campos no es valido."
    
        return render_template("static/html/ver_actividades.html", error = error)"""



if __name__ == "__main__":
    app.run(debug=True)
        











