#!/usr/bin/python
import sqlite3
import os

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'database/database.db')

def connect_to_db():
    conn = sqlite3.connect(filename)
    return conn

def search_department(department):
    departments = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        if "DeptID" in department:
            cur.execute("SELECT * FROM DEPARTMENT WHERE DeptID = ?",
            (department["DeptID"],))
        elif "DeptName" in department:
            cur.execute("SELECT * FROM DEPARTMENT WHERE DeptName LIKE ?",
            ('%'+department["DeptName"]+'%',))
        else:
            cur.execute("SELECT * FROM DEPARTMENT")
        rows = cur.fetchall()
        # convert row objects to dictionary
        for i in rows:
            foundDepartment = {}
            foundDepartment["DeptID"]= i["DeptID"]
            foundDepartment["DeptName"]= i["DeptName"]
            departments.append(foundDepartment)
    except:
        departments = []
    return departments
