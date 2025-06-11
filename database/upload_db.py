import pymysql

database = "tarea2"
user = "cc5002"
password = "programacionweb"
host = "localhost"
port = 3306
charset = "utf8"

def get_conn():
    conn = pymysql.connect(
        db=database,
        user=user,
        passwd=password,
        host=host,
        port=port,
        charset=charset
    )
    return conn

conn = get_conn()
cursor = conn.cursor()

with open('region-comuna.sql') as f:
	sql_file = f.read()
	
sql_commands = [cmd.strip() for cmd in sql_file.split(';') if cmd.strip()]

for command in sql_commands:
    cursor.execute(command)

conn.commit()
cursor.close()
conn.close()