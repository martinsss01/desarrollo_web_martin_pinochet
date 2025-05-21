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

def get_activities(page_size):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["get_activities"], (page_size,))
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
