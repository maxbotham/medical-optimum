#!/usr/bin/python
import sqlite3
import os

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'database/database.db')

def connect_to_db():
    conn = sqlite3.connect(filename)
    return conn

def search_admin(admin):
    admins = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        if "AdminID" in admin:
            cur.execute("SELECT * FROM ADMIN_ a, EMPLOYEE e WHERE a.EmployeeID = e.EmployeeID AND a.EmployeeID = ?",
            (admin["AdminID"],))
        elif "AdminName" in admin:
            cur.execute("SELECT * FROM ADMIN_ a, EMPLOYEE e WHERE a.EmployeeID = e.EmployeeID AND e.FullName LIKE ?",
            ('%'+admin["AdminName"]+'%',))
        else:
            cur.execute("SELECT * FROM ADMIN_ a, EMPLOYEE e WHERE a.EmployeeID = e.EmployeeID")
        rows = cur.fetchall()
        # convert row objects to dictionary
        for i in rows:
            foundAdmin = {}
            foundAdmin["AdminName"]= i["FullName"]
            foundAdmin["AdminID"]= i["EmployeeID"]
            foundAdmin["Salary"]= i["Salary"]
            foundAdmin["DBAccessUsername"]= i["DBAccessUsername"]
            foundAdmin["DBAccessPassword"]= i["DBAccessPassword"]
            admins.append(foundAdmin)
    except:
        admins = []
    return admins

def update_admin(admin):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE ADMIN_ SET DBAccessUsername = ?, DBAccessPassword = ? WHERE EmployeeID = ?",
                    (admin["DBAccessUsername"], admin["DBAccessPassword"], admin["AdminID"],))
        conn.commit()

        cur.execute("UPDATE EMPLOYEE SET FullName = ?, Salary = ? WHERE EmployeeID = ?",
                    (admin["AdminName"], admin["Salary"], admin["AdminID"],))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()
    return {}


def add_admin(admin):
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
        newAdminID = 'E0';
        for i in range(10000):
            newAdminID = 'E{0}'.format(str(i))
            if newAdminID not in existingIDs:
                break;
        cur.execute(
            "INSERT into EMPLOYEE (EmployeeID, FullName, DOB, Salary, StartDate) values (?, ?, ?, ?, ?)",
            (newAdminID, admin["AdminName"], admin["DOB"], admin["Salary"], admin["StartDate"],))
        conn.commit()
        cur.execute(
            "INSERT into ADMIN_ (EmployeeID, DBAccessUsername, DBAccessPassword) values (?, ?, ?)",
            (newAdminID, admin["DBAccessUsername"], admin["DBAccessPassword"],))
        conn.commit()
    except:
        conn.rollback()
    finally:
        conn.close()
        return {}
