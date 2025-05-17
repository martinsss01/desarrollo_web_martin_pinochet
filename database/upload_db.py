import pymysql
import mysql.connector

conn =mysql.connector.connect(
    database = "tarea2",
    user = "cc5002",
    password = "programacionweb",
    host = "localhost",
    port = 3306
)

cursor = conn.cursor()

with open('region-comuna.sql') as f:
	sql_file = f.read()
	
sql_commands = [cmd.strip() for cmd in sql_file.split(';') if cmd.strip()]

for command in sql_commands:
    try:
        cursor.execute(command)
    except mysql.connector.Error as err:
        print(f"Error executing: {command}")
        print(f"MySQL error: {err}")

conn.commit()
cursor.close()
conn.close()