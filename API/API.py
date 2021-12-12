#!/usr/bin/python
import sqlite3
from flask import Flask, request, jsonify #added to top of file
from flask_cors import CORS #added to top of file

def connect_to_db():
    conn = sqlite3.connect('database.db')
    return conn

def create_db_table():
    try:
        conn = connect_to_db()
        conn.execute('''
            CREATE TABLE PATIENT (
                PatientID INTEGER PRIMARY KEY NOT NULL,
                
            );
        ''')

        conn.commit()
        print("patient table created successfully")
    except:
        print("patient table creation failed - Maybe table")
    finally:
        conn.close()


def insert_patient(patient):
    inserted_patient = {"PatientID":"bleh"}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into PATIENT (PatientID) values (?)",(patient["PatientID"],))
        conn.commit()
        inserted_patient = get_patient_by_id(cur.lastrowid)
    except:
        conn.rollback()

    finally:
        conn.close()

        return inserted_patient

def get_patients():
    patients = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM PATIENT")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            patient = {}
            patient["PatientID"] = i["PatientID"]
            patients.append(patient)

    except:
        patients = []

    return patients


def get_patient_by_id(PatientID):
    patient = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM PATIENT WHERE PatientID = ?", 
                       (PatientID,))
        row = cur.fetchone()

        # convert row object to dictionary
        patient["PatientID"] = row["PatientID"]
    except:
        patient = {}

    return patient
"""def update_patient(patient):
    updated_patient = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE patients SET name = ?, email = ?, phone = 
                     ?, address = ?, country = ? WHERE PatientID =?",  
                     (patient["name"], patient["email"], patient["phone"], 
                     patient["address"], patient["country"], 
                     patient["PatientID"],))
        conn.commit()
        #return the patient
        updated_patient = get_patient_by_id(patient["PatientID"])

    except:
        conn.rollback()
        updated_patient = {}
    finally:
        conn.close()

    return updated_patient
"""
def delete_patient(PatientID):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from PATIENT WHERE PatientID = ?",     
                      (PatientID,))
        conn.commit()
        message["status"] = "patient deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete patient"
    finally:
        conn.close()

    return message

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/patients', methods=['GET'])
def api_get_patients():
    return jsonify(get_patients())

@app.route('/api/patients/<PatientID>', methods=['GET'])
def api_get_patient(PatientID):
    return jsonify(get_patient_by_id(PatientID))

@app.route('/api/patients/add',  methods = ['POST'])
def api_add_patient():
    patient = request.get_json()
    return jsonify(insert_patient(patient))

@app.route('/api/patients/update',  methods = ['PUT'])
def api_update_patient():
    patient = request.get_json()
    return jsonify(update_patient(patient))

@app.route('/api/patients/delete/<PatientID>',  methods = ['DELETE'])
def api_delete_patient(PatientID):
    return jsonify(delete_patient(PatientID))

if __name__ == "__main__":
    #app.debug = True
    #app.run(debug=True)
    app.run() #run app
