#!/usr/bin/python
import sqlite3
from flask import Flask, request, jsonify 
from flask_cors import CORS
import os
from PatientQueries import *

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'database/database.db')

def connect_to_db():
    conn = sqlite3.connect(filename)
    return conn

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

@app.route('/api/patients', methods=['GET'])
def api_get_patients():
    return jsonify(get_patients())

@app.route('/admin/patients/search', methods=['GET'])
def api_get_patient():
    patient = request.get_json()
    return jsonify(search_patients(patient))


@app.route('/admin/patients/register',  methods = ['POST'])
def api_add_patient():
    patient = request.get_json()
    return jsonify(register_patient(patient))

@app.route('/admin/patients/admit',  methods = ['POST'])
def api_admit_patient():
    patient = request.get_json()
    return jsonify(admit(patient))

@app.route('/admin/patients/discharge',  methods = ['PUT'])
def api_discharge_patient():
    patient = request.get_json()
    return jsonify(discharge(patient))

@app.route('/admin/patients/update',  methods = ['PUT'])
def api_update_patient():
    patient = request.get_json()
    return jsonify(update_patient(patient))

@app.route('/admin/patients/updateec',  methods = ['PUT'])
def api_update_contact():
    EC = request.get_json()
    return jsonify(update_EC(EC))

@app.route('/api/patients/delete/<PatientID>',  methods = ['DELETE'])
def api_delete_patient(PatientID):
    return jsonify(delete_patient(PatientID))

@app.route('/admin/patients/addprocedure',  methods = ['POST'])
def api_add_procedure():
    procedure = request.get_json()
    print(procedure)
    return jsonify(add_procedure(procedure))

@app.route('/admin/patients/addprescription',  methods = ['POST'])
def api_add_prescription():
    procedure = request.get_json()
    return jsonify(add_prescription(procedure))

@app.route('/admin/patients/addconsultation',  methods = ['POST'])
def api_add_consultation():
    procedure = request.get_json()
    return jsonify(add_consultation(procedure))

@app.route('/admin/patients/viewbill', methods=['GET'])
def api_view_bill():
    patient = request.get_json()
    return jsonify(view_bill(patient))

@app.route('/admin/patients/searchprescription', methods=['GET'])
def api_get_prescription():
    patient = request.get_json()
    return jsonify(search_prescription(patient))

@app.route('/admin/patients/searchprocedure', methods=['GET'])
def api_get_procedure():
    patient = request.get_json()
    return jsonify(search_procedure(patient))

@app.route('/admin/patients/searchconsultation', methods=['GET'])
def api_get_consultation():
    patient = request.get_json()
    return jsonify(search_consultation(patient))

if __name__ == "__main__":
    #app.debug = True
    #app.run(debug=True)
    app.run() #run app
