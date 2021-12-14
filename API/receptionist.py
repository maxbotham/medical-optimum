#!/usr/bin/python
import sqlite3
import os

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'database/database.db')

def connect_to_db():
    conn = sqlite3.connect(filename)
    return conn

def search_receptionist(recep):
    receps = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        if "RecepID" in recep:
            cur.execute("SELECT * FROM RECEPTIONIST r, EMPLOYEE e WHERE r.EmployeeID = e.EmployeeID AND r.EmployeeID = ?",
            (recep["RecepID"],))
        elif "RecepName" in recep:
            cur.execute("SELECT * FROM RECEPTIONIST r, EMPLOYEE e WHERE r.EmployeeID = e.EmployeeID AND e.FullName LIKE ?",
            ('%'+recep["RecepName"]+'%',))
        else:
            cur.execute("SELECT * FROM RECEPTIONIST r, EMPLOYEE e WHERE r.EmployeeID = e.EmployeeID")
        rows = cur.fetchall()
        # convert row objects to dictionary
        for i in rows:
            foundRecep = {}
            foundRecep["RecepName"]= i["FullName"]
            foundRecep["RecepID"]= i["EmployeeID"]
            foundRecep["Salary"]= i["Salary"]
            foundRecep["DBAccessUsername"]= i["DBAccessUsername"]
            foundRecep["DBAccessPassword"]= i["DBAccessPassword"]
            receps.append(foundRecep)
    except:
        receps = []
    return receps

def update_receptionist(recep):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE RECEPTIONIST SET DBAccessUsername = ?, DBAccessPassword = ? WHERE EmployeeID = ?",
                    (recep["DBAccessUsername"], recep["DBAccessPassword"], recep["RecepID"],))
        conn.commit()

        cur.execute("UPDATE EMPLOYEE SET FullName = ?, Salary = ? WHERE EmployeeID = ?",
                    (recep["RecepName"], recep["Salary"], recep["RecepID"],))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()
    return {}


def add_receptionist(recep):
    existingIDs = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM EMPLOYEE")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            existingID = i["EmployeeID"]
            existingIDs.append(existingID)

    except:
        existingIDs = []

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        newRecepID = 'E0';
        for i in range(10000):
            newRecepID = 'E{0}'.format(str(i))
            if newRecepID not in existingIDs:
                break;
        cur.execute(
            "INSERT into EMPLOYEE (EmployeeID, FullName, DOB, Salary, StartDate) values (?, ?, ?, ?, ?)",
            (newRecepID, recep["RecepName"], recep["DOB"], recep["Salary"], recep["StartDate"],))
        conn.commit()
        cur.execute(
            "INSERT into RECEPTIONIST (EmployeeID, DBAccessUsername, DBAccessPassword) values (?, ?, ?)",
            (newRecepID, recep["DBAccessUsername"], recep["DBAccessPassword"],))
        conn.commit()
    except:
        conn.rollback()
    finally:
        conn.close()
        return {}
