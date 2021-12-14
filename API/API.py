#!/usr/bin/python
import sqlite3
from flask import Flask, request, jsonify 
from flask_cors import CORS
import os
from inventory import *
from ward import *
from doctor import *
from receptionist import *
from admin import *
from department import *

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

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


if __name__ == "__main__":
    #app.debug = True
    #app.run(debug=True)
    app.run() #run app
