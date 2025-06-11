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
    if request.method == "GET": 
        actividades = []
        for actividad in db.get_5_activities(page_size=5):
            act_id, comuna_id, sector, nombre, email, celular, fecha_inicio, fecha_termino, descripcion = actividad
            _, comuna, region_id = db.get_comuna_by_id(comuna_id)
            _, region = db.get_region_by_id(region_id)
            _, ruta_archivo, nombre_archivo, _ = db.get_photo_by_act_id(act_id)
            img_filename = f"uploads/{nombre_archivo}"
            
            actividades.append({"region": region,
                                "comuna": comuna,
                                "sector": sector,
                                "nombre": nombre,
                                "email": email,
                                "celular": celular,
                                "fecha_inicio": fecha_inicio,
                                "fecha_termino": fecha_termino,
                                "descripcion": descripcion,
                                "foto": url_for('static', filename=img_filename)
                                })
            
        return render_template("index.html", actividades=actividades)

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
        img = request.files.get('files')

        _filename = hashlib.sha256(
            secure_filename(img.filename) # nombre del archivo
            .encode("utf-8") # encodear a bytes
            ).hexdigest()
        _extension = filetype.guess(img).extension

        img_filename = f"{_filename}.{_extension}"

        img.save(os.path.join(app.config["UPLOAD_FOLDER"], img_filename))

        region = request.form.get("region")
        error = ""
        if validate_activity(nombre,email,celular,fecha_inicio,fecha_termino,descripcion):
            db.create_activity(id_comuna, sector, nombre, email, celular, fecha_inicio, fecha_termino,descripcion)
            id = db.get_activity_id_by_name(nombre)
            db.create_photo(f"static/uploads/{img_filename}", img_filename, id)

        return redirect('/ver_actividades/page1')

@app.route("/ver_actividades/page<int:page>", methods = ["GET"])
def ver_actividades(page=1):
    if request.method == "GET": 
        actividades = []
        for actividad in db.get_all_activities()[5*(page-1):5*page]:
            act_id, comuna_id, sector, nombre, email, celular, fecha_inicio, fecha_termino, descripcion = actividad
            _, comuna, region_id = db.get_comuna_by_id(comuna_id)
            _, region = db.get_region_by_id(region_id)
            _, _, nombre_archivo, _ = db.get_photo_by_act_id(act_id)
            
            img_filename = f"uploads/{nombre_archivo}"
            
            actividades.append({"region": region,
                                "comuna": comuna,
                                "sector": sector,
                                "nombre": nombre,
                                "email": email,
                                "celular": celular,
                                "fecha_inicio": fecha_inicio,
                                "fecha_termino": fecha_termino,
                                "descripcion": descripcion,
                                "foto": url_for('static', filename=img_filename)
                                })
                                
            
        return render_template("other/ver_actividades.html", actividades=actividades, page=page, total_pages=len(db.get_all_activities())//5 + 1)

@app.route("/estadisticas", methods = ["GET"])
def estadisticas():
    if request.method == "GET": 
        return render_template("other/estadisticas.html")


@app.route("/actividad<int:num>", methods = ["GET"])
def actividad(num):
    if request.method == "GET": 
        _, comuna_id, sector, nombre, email, celular, fecha_inicio, fecha_termino, descripcion = db.get_activity_by_id(num)
        _, comuna, region_id = db.get_comuna_by_id(comuna_id)
        _, region = db.get_region_by_id(region_id)
        _, _, nombre_archivo, _ = db.get_photo_by_act_id(num)
        
        img_filename = f"uploads/{nombre_archivo}"
        
        actividad ={"region": region,
                "comuna": comuna,
                "sector": sector,
                "nombre": nombre,
                "email": email,
                "celular": celular,
                "fecha_inicio": fecha_inicio,
                "fecha_termino": fecha_termino,
                "descripcion": descripcion,
                "foto": url_for('static', filename=img_filename)
                }
        
        return render_template("activities/actividad.html", actividad=actividad, num=num, name=nombre)

if __name__ == "__main__":
    app.run(debug=True)
        











