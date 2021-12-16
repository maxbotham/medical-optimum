#!/usr/bin/python
import sqlite3
from flask import Flask, request, jsonify
from flask_cors import CORS
from PatientQueries import *
from inventory import *
from doctor import *
from receptionist import *
from admin import *
from department import *
from ward import *


def valid_input(input):
    splitInput = input.split()
    for x in splitInput:
        if(any(not c.isalnum() for c in x)):
            return False
    return True


app = Flask(__name__)

# Equipment routes
# Format for Query-Params is: EquipmentName;EquipmentID


@app.route('/admin/hospital/equipment',  methods=['GET'])
def admin_search_equipment():
    equipHeader = request.headers.get('Query-Params')
    equipArr = equipHeader.split(';')
    equipment = {}
    if(valid_input(equipArr[0]) and valid_input(equipArr[1]) and len(equipArr) == 2):
        if equipArr[0] != "null":
            equipment["EquipmentName"] = equipArr[0]
        if equipArr[1] != "null":
            equipment["EquipmentID"] = equipArr[1]
        return jsonify(search_equipment(equipment))
    return jsonify([])


@app.route('/admin/hospital/equipment',  methods=['POST'])
def admin_add_equipment():
    equipment = request.get_json()
    return jsonify(add_equipment(equipment))


@app.route('/admin/hospital/equipment',  methods=['PUT'])
def adming_update_equipment():
    equipment = request.get_json()
    return jsonify(update_equipment(equipment))

# Medicine routes
# Format for Query-Params is: MedicineName;MedicineID


@app.route('/admin/hospital/medicine',  methods=['GET'])
def admin_search_medicine():
    medicineHeader = request.headers.get('Query-Params')
    medicineArr = medicineHeader.split(';')
    medicine = {}
    if(valid_input(medicineArr[0]) and valid_input(medicineArr[1]) and len(medicineArr) == 2):
        if medicineArr[0] != "null":
            medicine["MedicineName"] = medicineArr[0]
        if medicineArr[1] != "null":
            medicine["MedicineID"] = medicineArr[1]
        return jsonify(search_medicine(medicine))
    return jsonify([])


@app.route('/admin/hospital/medicine',  methods=['POST'])
def admin_add_medicine():
    medicine = request.get_json()
    return jsonify(add_medicine(medicine))


@app.route('/admin/hospital/medicine',  methods=['PUT'])
def admin_update_medicine():
    medicine = request.get_json()
    return jsonify(update_medicine(medicine))

# Ward and bed routes
# Format for Query-Params is: WardNumber;WardType


@app.route('/admin/hospital/ward',  methods=['GET'])
def admin_search_wards():
    wardHeader = request.headers.get('Query-Params')
    wardArr = wardHeader.split(';')
    ward = {}
    if(valid_input(wardArr[0]) and valid_input(wardArr[1]) and len(wardArr) == 2):
        if wardArr[0] != "null":
            ward["WardNumber"] = wardArr[0]
        if wardArr[1] != "null":
            ward["WardType"] = wardArr[1]
        return jsonify(search_ward(ward))
    return jsonify([])


@app.route('/admin/hospital/bed',  methods=['PUT'])
def admin_update_bed():
    bed = request.get_json()
    return jsonify(update_bed(bed))

# Employee routes
# Doctor
# Format for Query-Params is: DoctorID;DoctorName;Specialty


@app.route('/admin/hospital/employee/doctor',  methods=['GET'])
def admin_search_doctors():
    queryHeader = request.headers.get('Query-Params')
    docArr = queryHeader.split(';')
    doctor = {}
    if(valid_input(docArr[0]) and valid_input(docArr[1]) and valid_input(docArr[2]) and len(docArr) == 3):
        if docArr[0] != "null":
            doctor["DoctorID"] = docArr[0]
        if docArr[1] != "null":
            doctor["DoctorName"] = docArr[1]
        if docArr[2] != "null":
            doctor["Specialty"] = docArr[0]
        return jsonify(search_doctor(doctor))
    return jsonify([])


@app.route('/admin/hospital/employee/doctor',  methods=['PUT'])
def admin_update_doctor():
    doctor = request.get_json()
    return jsonify(update_doctor(doctor))


@app.route('/admin/hospital/employee/doctor',  methods=['POST'])
def admin_add_doctor():
    doctor = request.get_json()
    return jsonify(add_doctor(doctor))

# Receptionist
# Format for Query-Params is: RecepID;RecepName


@app.route('/admin/hospital/employee/receptionist',  methods=['GET'])
def admin_search_recep():
    queryHeader = request.headers.get('Query-Params')
    recepArr = queryHeader.split(';')
    receptionist = {}
    if(valid_input(recepArr[0]) and valid_input(recepArr[1]) and len(recepArr) == 2):
        if recepArr[0] != "null":
            receptionist["RecepID"] = recepArr[0]
        if recepArr[1] != "null":
            receptionist["RecepName"] = recepArr[1]
        return jsonify(search_receptionist(receptionist))
    return jsonify([])


@app.route('/admin/hospital/employee/receptionist',  methods=['PUT'])
def admin_update_recep():
    receptionist = request.get_json()
    return jsonify(update_receptionist(receptionist))


@app.route('/admin/hospital/employee/receptionist',  methods=['POST'])
def admin_add_recep():
    receptionist = request.get_json()
    return jsonify(add_receptionist(receptionist))

# Admin
# Format for Query-Params is: AdminID;AdminName


@app.route('/admin/hospital/employee/admin',  methods=['GET'])
def admin_search_admin():
    queryHeader = request.headers.get('Query-Params')
    adminArr = queryHeader.split(';')
    admin = {}
    if(valid_input(adminArr[0]) and valid_input(adminArr[1]) and len(adminArr) == 2):
        if adminArr[0] != "null":
            admin["AdminID"] = adminArr[0]
        if adminArr[1] != "null":
            admin["AdminName"] = adminArr[1]
        return jsonify(search_admin(admin))
    return jsonify([])


@app.route('/admin/hospital/employee/admin',  methods=['PUT'])
def admin_update_admin():
    admin = request.get_json()
    return jsonify(update_admin(admin))


@app.route('/admin/hospital/employee/admin',  methods=['POST'])
def admin_add_admin():
    admin = request.get_json()
    return jsonify(add_admin(admin))

# Department
# Format for Query-Params is: DeptID;DeptName


@app.route('/admin/hospital/department',  methods=['GET'])
def admin_search_department():
    queryHeader = request.headers.get('Query-Params')
    deptArr = queryHeader.split(';')
    department = {}
    if(valid_input(deptArr[0]) and valid_input(deptArr[1]) and len(deptArr) == 2):
        if deptArr[0] != "null":
            department["DeptID"] = deptArr[0]
        if deptArr[1] != "null":
            department["DeptName"] = deptArr[1]
        return jsonify(search_department(department))
    return jsonify([])

# Format for Query-Params is: FullName;PatientID;DOB
@app.route('/admin/patients/search', methods=['GET'])
def api_get_patient():
    queryHeader = request.headers.get('Query-Params')
    patientArr = queryHeader.split(';')
    patient = {}
    if(valid_input(patientArr[0]) and valid_input(patientArr[1]) and len(patientArr) == 3):
        if patientArr[0] != "null":
            patient["FullName"] = patientArr[0]
        if patientArr[1] != "null":
            patient["PatientID"] = patientArr[1]
        if patientArr[2] != "null":
            patient["DOB"] = patientArr[2]
        return jsonify(search_patients(patient))
    return jsonify([])

@app.route('/admin/patients/register',  methods=['POST'])
def api_add_patient():
    patient = request.get_json()
    return jsonify(register_patient(patient))

@app.route('/admin/patients/insurance',  methods=['GET'])
def api_get_all_insurance():
    return jsonify(getAllInsurance())

@app.route('/admin/patients/addvisit',  methods=['POST'])
def api_add_visit_date():
    patient = request.get_json()
    return jsonify(add_visit(patient))

@app.route('/admin/patients/admit',  methods=['POST'])
def api_admit_patient():
    patient = request.get_json()
    return jsonify(admit(patient))

@app.route('/admin/patients/discharge',  methods=['PUT'])
def api_discharge_patient():
    patient = request.get_json()
    return jsonify(discharge(patient))

@app.route('/admin/patients/update',  methods=['PUT'])
def api_update_patient():
    patient = request.get_json()
    return jsonify(update_patient(patient))

@app.route('/admin/patients/updateec',  methods=['PUT'])
def api_update_contact():
    EC = request.get_json()
    return jsonify(update_EC(EC))

@app.route('/api/patients/delete/<PatientID>',  methods=['DELETE'])
def api_delete_patient(PatientID):
    return jsonify(delete_patient(PatientID))

@app.route('/admin/patients/addprocedure',  methods=['POST'])
def api_add_procedure():
    procedure = request.get_json()
    print(procedure)
    return jsonify(add_procedure(procedure))

@app.route('/admin/patients/addprescription',  methods=['POST'])
def api_add_prescription():
    procedure = request.get_json()
    return jsonify(add_prescription(procedure))

@app.route('/admin/patients/addconsultation',  methods=['POST'])
def api_add_consultation():
    procedure = request.get_json()
    return jsonify(add_consultation(procedure))

# Format for Query-Params is: PatientID


@app.route('/admin/patients/viewbill', methods=['GET'])
def api_view_bill():
    patientString = request.headers.get('Query-Params')
    if(valid_input(patientString)):
        patient = {"PatientID": patientString}
        return jsonify(view_bill(patient))
    return jsonify([])

# Format for Query-Params is: DoctorName;MedicineName;PatientID


@app.route('/admin/patients/searchprescription', methods=['GET'])
def api_get_prescription():
    queryHeader = request.headers.get('Query-Params')
    paramsArr = queryHeader.split(';')
    patient = {}
    if(valid_input(paramsArr[0]) and valid_input(paramsArr[1]) and valid_input(paramsArr[2]) and len(paramsArr) == 3):
        if paramsArr[0] != "null":
            patient["DoctorName"] = paramsArr[0]
        if paramsArr[1] != "null":
            patient["MedicineName"] = paramsArr[1]
        if paramsArr[2] != "null":
            patient["PatientID"] = paramsArr[2]
        return jsonify(search_prescription(patient))
    return jsonify([])

# Format for Query-Params is: DoctorName;EquipmentName;PatientID


@app.route('/admin/patients/searchprocedure', methods=['GET'])
def api_get_procedure():
    queryHeader = request.headers.get('Query-Params')
    paramsArr = queryHeader.split(';')
    patient = {}
    if(valid_input(paramsArr[0]) and valid_input(paramsArr[1]) and valid_input(paramsArr[2]) and len(paramsArr) == 3):
        if paramsArr[0] != "null":
            patient["DoctorName"] = paramsArr[0]
        if paramsArr[1] != "null":
            patient["EquipmentName"] = paramsArr[1]
        if paramsArr[2] != "null":
            patient["PatientID"] = paramsArr[2]
        return jsonify(search_procedure(patient))
    return jsonify([])

# Format for Query-Params is: DoctorName;PatientID


@app.route('/admin/patients/searchconsultation', methods=['GET'])
def api_get_consultation():
    queryHeader = request.headers.get('Query-Params')
    paramsArr = queryHeader.split(';')
    patient = {}
    if(valid_input(paramsArr[0]) and valid_input(paramsArr[1]) and len(paramsArr) == 2):
        if paramsArr[0] != "null":
            patient["DoctorName"] = paramsArr[0]
        if paramsArr[1] != "null":
            patient["PatientID"] = paramsArr[1]
        return jsonify(search_consultation(patient))
    return jsonify([])


@app.route('/login', methods=['GET'])
def api_login():
    queryHeader = request.headers.get('Query-Params')
    print(queryHeader)
    paramsArr = queryHeader.split(';')
    print(valid_input("Hello World"))
    if(valid_input(paramsArr[0]) and len(paramsArr) == 2):
        return jsonify(login(paramsArr[0], paramsArr[1]))
    return jsonify([])

@app.route('/admin/patients/printbill', methods=['GET'])
def api_print_bill():
    patientString = request.headers.get('Query-Params')
    if(valid_input(patientString)):
        patient = {"PatientID": patientString}
        return jsonify(print_bill(patient))
    return jsonify([])


if __name__ == "__main__":
    #app.debug = True
    # app.run(debug=True)
    app.run()  # run app
