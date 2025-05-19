-- Active: 1745247023068@@127.0.0.1@3306@tarea2


CREATE USER 'cc5002'@'localhost' IDENTIFIED BY 'programacionweb';

GRANT ALL ON tarea2.* TO cc5002@localhost;

DROP USER 'cc5002'@'localhost';