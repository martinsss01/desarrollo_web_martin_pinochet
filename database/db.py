import pymysql
import json
from sqlalchemy import create_engine, column, Integer, BigInteger, String, ForeignKey
from sqlalchemy.orm import sessionmaker, declarative_base, relationship

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
	cursor.execute(QUERY_DICT["get_comuna_by_id"], (comuna, ))
	id = cursor.fetchone()
	return id

def create_activity(comuna, sector, nombre, email, celular, fecha_inicio, fecha_final, descripcion):
	conn = get_conn()
	cursor = conn.cursor()
	cursor.execute(QUERY_DICT["create_activity"], (comuna, sector, nombre, email, celular, fecha_inicio, fecha_final, descripcion))
	conn.commit()