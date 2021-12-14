#!/usr/bin/python
import sqlite3
import os

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'database/database.db')

def connect_to_db():
    conn = sqlite3.connect(filename)
    return conn

def search_doctor(doctor):
    doctors = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        if "DoctorID" in doctor:
            cur.execute("SELECT * FROM DOCTOR d, EMPLOYEE e WHERE d.EmployeeID = e.EmployeeID AND d.EmployeeID = ?",
            (doctor["DoctorID"],))
        elif "DoctorName" in doctor and "Specialty" in doctor:
            cur.execute("SELECT * FROM DOCTOR d, EMPLOYEE e WHERE d.EmployeeID = e.EmployeeID AND d.Specialty LIKE ? AND e.FullName LIKE ?",
            ('%'+doctor["Specialty"]+'%', '%'+doctor["DoctorName"]+'%',))
        elif "DoctorName" in doctor:
            cur.execute("SELECT * FROM DOCTOR d, EMPLOYEE e WHERE d.EmployeeID = e.EmployeeID AND e.FullName LIKE ?",
            ('%'+doctor["DoctorName"]+'%',))
        elif "Specialty" in doctor:
            cur.execute("SELECT * FROM DOCTOR d, EMPLOYEE e WHERE d.EmployeeID = e.EmployeeID AND d.Specialty LIKE ?",
            ('%'+doctor["Specialty"]+'%',))
        else:
            cur.execute("SELECT * FROM DOCTOR d, EMPLOYEE e WHERE d.EmployeeID = e.EmployeeID")
        rows = cur.fetchall()
        # convert row objects to dictionary
        for i in rows:
            foundDoctor = {}
            foundDoctor["DoctorName"]= i["FullName"]
            foundDoctor["DoctorID"]= i["EmployeeID"]
            foundDoctor["Salary"]= i["Salary"]
            foundDoctor["DeptID"]= i["DeptID"]
            foundDoctor["Specialty"]= i["Specialty"]
            doctors.append(foundDoctor)
    except:
        doctors = []
    return doctors

def update_doctor(doctor):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE DOCTOR SET Specialty = ?, DeptID = ? WHERE EmployeeID = ?",
                    (doctor["Specialty"], doctor["DeptID"], doctor["DoctorID"],))
        conn.commit()

        cur.execute("UPDATE EMPLOYEE SET FullName = ?, Salary = ? WHERE EmployeeID = ?",
                    (doctor["DoctorName"], doctor["Salary"], doctor["DoctorID"],))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()
    return {}


def add_doctor(doctor):
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
        newDoctorID = 'E0';
        for i in range(10000):
            newDoctorID = 'E{0}'.format(str(i))
            if newDoctorID not in existingIDs:
                break;
        cur.execute(
            "INSERT into EMPLOYEE (EmployeeID, FullName, DOB, Salary, StartDate) values (?, ?, ?, ?, ?)",
            (newDoctorID, doctor["DoctorName"], doctor["DOB"], doctor["Salary"], doctor["StartDate"],))
        conn.commit()
        cur.execute(
            "INSERT into DOCTOR (EmployeeID, Specialty, DeptID) values (?, ?, ?)",
            (newDoctorID, doctor["Specialty"], doctor["DeptID"],))
        conn.commit()
    except:
        conn.rollback()
    finally:
        conn.close()
        return {}
