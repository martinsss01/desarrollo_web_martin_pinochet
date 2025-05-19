from flask import Flask, request, render_template, redirect, url_for, session
from utils.validations import validate_activity
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os
import sys

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/", methods=["GET"])
def index():
    return render_template("index.html")

@app.route("/agregar_actividad", methods = ["POST","GET"])
def agregar_actividad():
    if request.method == "GET": 
        return render_template("other/agregar_actividad.html")
    if request.method == "POST": 
        nombre = request.form.get("nombre")
        sector = request.form.get("sector")
        email = request.form.get("email")
        celular = request.form.get("phone")
        fecha_inicio = request.form.get("start-date")
        fecha_termino = request.form.get("final-date")
        descripcion = request.form.get("description")
        comuna = request.form.get("comuna")
        id_comuna,_,_ = db.get_id_by_comuna(comuna)
        region = request.form.get("region")
        error = ""
        if validate_activity(nombre,email,celular,fecha_inicio,fecha_termino,descripcion):
            db.create_activity(id_comuna, sector, nombre, email, celular, fecha_inicio, fecha_termino,descripcion)

        return render_template('other/ver_actividades.html', error = error)

@app.route("/ver_actividades", methods = ["GET"])
def ver_actividades():
    if request.method == "GET": 
        return render_template("other/ver_actividades.html")
    
@app.route("/estadisticas", methods = ["GET"])
def estadisticas():
    if request.method == "GET": 
        return render_template("other/estadisticas.html")

if __name__ == "__main__":
    app.run(debug=True)
        











