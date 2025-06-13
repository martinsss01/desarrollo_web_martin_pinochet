from flask import Flask, request, render_template, redirect, url_for, session, jsonify
from utils.validations import validate_activity, validate_comment
from database import db
from werkzeug.utils import secure_filename
import hashlib
import filetype
import os
import sys
import datetime

UPLOAD_FOLDER = 'static/uploads'

app = Flask(__name__)

app.secret_key = "s3cr3t_key"
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER


@app.route("/", methods=["GET"])
def index():
    if request.method == "GET": 
        actividades = []
        for actividad in db.get_5_activities(page_size=5):
            num, comuna_id, sector, nombre, email, celular, fecha_inicio, fecha_termino, descripcion = actividad
            _, comuna, region_id = db.get_comuna_by_id(comuna_id)
            _, region = db.get_region_by_id(region_id)
            _, ruta_archivo, nombre_archivo, _ = db.get_photo_by_act_id(num)
            img_filename = f"uploads/{nombre_archivo}"
            
            actividades.append({"num": num,
                                "region": region,
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
        comuna = request.form.get("comuna")
        sector = request.form.get("sector")
        email = request.form.get("email")
        celular = request.form.get("phone")
        fecha_inicio = request.form.get("start-date")
        fecha_termino = request.form.get("final-date")
        descripcion = request.form.get("description")
        tema = request.form.get("tema")
        otro = request.form.get("otro")
        social = request.form.get("social")
        cuenta = request.form.get("cuenta")

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
            db.create_tema(tema, otro, id)
            db.create_contacto(social, cuenta, id)
            

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
                                "foto": url_for('static', filename=img_filename),
                                "num": act_id
                                })
                                
            
        return render_template("other/ver_actividades.html", actividades=actividades, page=page, total_pages=len(db.get_all_activities())//5 + 1)

@app.route("/estadisticas", methods = ["GET"])
def estadisticas():
    if request.method == "GET": 
        return render_template("other/estadisticas.html")


@app.route("/actividad/<int:num>", methods = ["GET"])
def actividad(num):
    if request.method == "GET": 
        _, comuna_id, sector, nombre, email, celular, fecha_inicio, fecha_termino, descripcion = db.get_activity_by_id(num)
        _, comuna, region_id = db.get_comuna_by_id(comuna_id)
        _, region = db.get_region_by_id(region_id)
        _, _, nombre_archivo, _ = db.get_photo_by_act_id(num)
        _, tema, otro, _ = db.get_tema_by_act_id(num)
        _, social, cuenta, _ = db.get_contacto_by_act_id(num)
        img_filename = f"uploads/{nombre_archivo}"
        
        actividad ={"num": num,
                "region": region,
                "comuna": comuna,
                "sector": sector,
                "nombre": nombre,
                "email": email,
                "celular": celular,
                "fecha_inicio": fecha_inicio,
                "fecha_termino": fecha_termino,
                "tema": tema,
                "otro": otro,
                "social": social,
                "cuenta": cuenta,
                "descripcion": descripcion,

                "foto": url_for('static', filename=img_filename)
                }
        
        return render_template("activities/actividad.html", actividad=actividad, num=num, name=nombre)


@app.route('/actividad/<int:id>/comentarios/agregar', methods=['POST'])
def post_comment(id):
    if request.method == 'POST':
        nombre = request.form.get('commentName')
        comentario = request.form.get('commentText')
        fecha = datetime.date.today()
        if validate_comment(nombre, comentario):
            db.create_comment(nombre, comentario, fecha, id)
            return redirect(url_for('actividad', num=id))
        else:
            return "Comment cannot be empty", 400


@app.route('/actividad/<int:id>/comentarios', methods=['GET'])
def get_comments(id):
    if request.method == 'GET':
        comments = db.get_comments_by_act_id(id)
        comments_list = []
        for comment in comments:
            nombre = comment[0]
            texto = comment[1]
            fecha = comment[2]
            act_id = comment[3]
            comments_list.append({
                "nombre": nombre,
                "comentario": texto,
                "fecha": fecha,
                "actividad_id": act_id
            })
        return jsonify({"data": comments_list})

@app.route("/estadisticas", methods = ["GET"])
def get_estadisticas():
    if request.method == "GET": 
        actividades = db.get_all_activities()
        total_actividades = len(actividades)
        actividades_por_dia = {}
        for actividad in actividades:
            fecha_inicio = actividad[6]
            if fecha_inicio not in actividades_por_dia:
                actividades_por_dia[fecha_inicio] = 0
            actividades_por_dia[fecha_inicio] += 1

if __name__ == "__main__":
    app.run(debug=True)
        
