#!/usr/bin/python
import sqlite3
import os

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'database/database.db')

def connect_to_db():
    conn = sqlite3.connect(filename)
    return conn

def search_ward(ward):
    wards = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        if "WardType" in ward and "WardNumber" in ward:
            cur.execute("SELECT * FROM WARD WHERE WardNumber = ? AND WardType LIKE ?",
            (ward["WardNumber"], '%'+ward["MedicineName"]+'%',))
        elif "WardNumber" in ward:
            cur.execute("SELECT * FROM WARD WHERE WardNumber = ?",
            (ward["WardNumber"],))
        elif "WardType" in ward:
            cur.execute("SELECT * FROM WARD WHERE WardType LIKE ?",
            ('%'+ward["WardType"]+'%',))
        else:
            cur.execute("SELECT * FROM WARD")

        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            foundWard = {}
            foundWard["WardNumber"]= i["WardNumber"]
            foundWard["WardType"]= i["WardType"]

            conn = connect_to_db()
            conn.row_factory = sqlite3.Row
            cur = conn.cursor()
            cur.execute("SELECT * FROM BED WHERE WardNumber = ?",
            (foundWard["WardNumber"],))
            bedRows = cur.fetchall()
            foundWard["Beds"] = []
            for j in bedRows:
                foundBed = {}
                foundBed["BedNumber"] = j["BedNumber"]
                foundBed["BedStatus"] = j["BedStatus"]
                foundBed["Price"] = j["Price"]
                foundBed["PatientID"] = j["PatientID"]
                foundBed["WardNumber"] = j["WardNumber"]
                foundWard["Beds"].append(foundBed)
        
            wards.append(foundWard)
    except:
        wards = []
    return wards

def update_bed(bed):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE BED SET PatientID = ?, Price = ? WHERE BedNumber = ?",
                    (bed["PatientID"], bed["Price"], bed["BedNumber"],))
        conn.commit()
        # return the patient
    except:
        conn.rollback()
    finally:
        conn.close()
    return {"Patient": bed["PatientID"], "Price": bed["Price"], "BedNumber": bed["BedNumber"]}
