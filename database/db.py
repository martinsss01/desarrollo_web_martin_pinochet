import pymysql
import json

DB_NAME = "tarea2"
DB_USERNAME = "cc5002" 
DB_PASSWORD = "programacionweb"
DB_HOST = "localhost"
DB_PORT = 3306
DB_CHARSET = "utf8"

with open('database/queries.json', 'r') as querys:
	QUERY_DICT = json.load(querys)

def get_conn():
	conn = pymysql.connect(
		db=DB_NAME,
		user=DB_USERNAME,
		passwd=DB_PASSWORD,
		host=DB_HOST,
		port=DB_PORT,
		charset=DB_CHARSET
	)
	return conn

def get_id_by_comuna(comuna):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_id_by_comuna"], (comuna, ))
	id = cursor.fetchone()
	return id

def create_activity(comuna, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["create_activity"], (comuna, sector, nombre, email, celular, dia_hora_inicio, dia_hora_termino, descripcion))
	conn.commit()

def create_tema(tema, otro, act_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["create_tema"], (tema, otro, act_id))
	conn.commit()

def create_contacto(nombre, id, act_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["create_contacto"], (nombre, id, act_id))
	conn.commit()

def get_5_activities(page_size=5):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_5_activities"], (page_size,))
	activities = cursor.fetchall()
	return activities

def get_all_activities():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_all_activities"])
	activities = cursor.fetchall()
	return activities

def get_comuna_by_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comuna_by_id"], (id, ))
	comuna = cursor.fetchone()
	return comuna

def get_region_by_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_region_by_id"], (id, ))
	region = cursor.fetchone()
	return region

def create_photo(path, name, activity_id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["create_photo"], (path,name,activity_id))
	conn.commit()

def get_photo_by_act_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_photo_by_act_id"], (id,))
	photo = cursor.fetchone()
	return photo

def get_activity_id_by_name(name):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_activity_id_by_name"], (name,))
	activity_id = cursor.fetchone()
	return activity_id

def get_activity_by_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_activity_by_id"], (id,))
	activity = cursor.fetchone()
	return activity

def get_tema_by_act_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_tema_by_act_id"], (id,))
	tema = cursor.fetchone()
	return tema

def get_contacto_by_act_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_contacto_by_act_id"], (id,))
	contacto = cursor.fetchone()
	return contacto

def get_comments_by_act_id(id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_comments_by_act_id"], (id,))
	comments = cursor.fetchall()
	return comments

def create_comment(name, comment, fecha, id):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["create_comment"], (name, comment, fecha, id))
	conn.commit()

def get_activity_count_per_date():
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_activity_count_per_date"])
	activity_count = cursor.fetchall()
	return activity_count