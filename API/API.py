#!/usr/bin/python
import sqlite3
from flask import Flask, request, jsonify 
from flask_cors import CORS
import os

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'database/database.db')

def connect_to_db():
    conn = sqlite3.connect(filename)
    return conn
from inventory import *
from doctor import *
from receptionist import *
from admin import *
from department import *

app = Flask(__name__)

#Equipment routes
@app.route('/admin/hospital/equipment',  methods = ['GET'])
def admin_search_equipment():
    equipment = request.get_json()
    return jsonify(search_equipment(equipment))

@app.route('/admin/hospital/equipment',  methods = ['POST'])
def admin_add_equipment():
    equipment = request.get_json()
    return jsonify(add_equipment(equipment))

@app.route('/admin/hospital/equipment',  methods = ['PUT'])
def adming_update_equipment():
    equipment = request.get_json()
    return jsonify(update_equipment(equipment))

#Medicine routes
@app.route('/admin/hospital/medicine',  methods = ['GET'])
def admin_search_medicine():
    medicine = request.get_json()
    return jsonify(search_medicine(medicine))

@app.route('/admin/hospital/medicine',  methods = ['POST'])
def admin_add_medicine():
    medicine = request.get_json()
    return jsonify(add_medicine(medicine))

@app.route('/admin/hospital/medicine',  methods = ['PUT'])
def admin_update_medicine():
    medicine = request.get_json()
    return jsonify(update_medicine(medicine))

#Ward and bed routes
@app.route('/admin/hospital/ward',  methods = ['GET'])
def admin_search_wards():
    ward = request.get_json()
    return jsonify(search_ward(ward))

@app.route('/admin/hospital/bed',  methods = ['PUT'])
def admin_update_bed():
    bed = request.get_json()
    return jsonify(update_bed(bed))

#Employee routes
#Doctor
@app.route('/admin/hospital/employee/doctor',  methods = ['GET'])
def admin_search_doctors():
    doctor = request.get_json()
    return jsonify(search_doctor(doctor))

@app.route('/admin/hospital/employee/doctor',  methods = ['PUT'])
def admin_update_doctor():
    doctor = request.get_json()
    return jsonify(update_doctor(doctor))

@app.route('/admin/hospital/employee/doctor',  methods = ['POST'])
def admin_add_doctor():
    doctor = request.get_json()
    return jsonify(add_doctor(doctor))

#Receptionist
@app.route('/admin/hospital/employee/receptionist',  methods = ['GET'])
def admin_search_recep():
    receptionist = request.get_json()
    return jsonify(search_receptionist(receptionist))

@app.route('/admin/hospital/employee/receptionist',  methods = ['PUT'])
def admin_update_recep():
    receptionist = request.get_json()
    return jsonify(update_receptionist(receptionist))

@app.route('/admin/hospital/employee/receptionist',  methods = ['POST'])
def admin_add_recep():
    receptionist = request.get_json()
    return jsonify(add_receptionist(receptionist))

#Admin
@app.route('/admin/hospital/employee/admin',  methods = ['GET'])
def admin_search_admin():
    admin = request.get_json()
    return jsonify(search_admin(admin))

@app.route('/admin/hospital/employee/admin',  methods = ['PUT'])
def admin_update_admin():
    admin = request.get_json()
    return jsonify(update_admin(admin))

@app.route('/admin/hospital/employee/admin',  methods = ['POST'])
def admin_add_admin():
    admin = request.get_json()
    return jsonify(add_admin(admin))

#Department
@app.route('/admin/hospital/department',  methods = ['GET'])
def admin_search_department():
    department = request.get_json()
    return jsonify(search_department(department))


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
