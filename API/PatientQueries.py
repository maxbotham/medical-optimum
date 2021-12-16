import sqlite3
import os
import json
dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'database/database.db')


def connect_to_db():
    conn = sqlite3.connect(filename)
    return conn

def login (username,password):
    employeeType = "Unsuccessful"
    conn = connect_to_db()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT EmployeeID FROM ADMIN_ WHERE DBAccessUsername = ? AND DBAccessPassword = ?", 
                   (username,password,))
    data=cur.fetchone()
    if(data is not None):
        employeeType = "Admin"
        
    
    
    conn = connect_to_db()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT EmployeeID FROM RECEPTIONIST WHERE DBAccessUsername = ? AND DBAccessPassword = ?", 
                   (username,password,))
    data=cur.fetchone()
    if(data is not None):
        employeeType = "Receptionist"
            
    

    return employeeType
    

def create_outpatient(patientID):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into OUT_PATIENT (PatientID) values (?)",
                    (patientID,))
        conn.commit()

    except:
        conn.rollback()

    finally:
        conn.close()
    return


def view_bill(patient):
    PatientID = patient["PatientID"]
    billID = getBillID(PatientID)
    bill = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute(
            "SELECT * FROM BILL_ITEMS WHERE BillID = ? AND Paid = ?", (billID, False,))
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            item = {}
            item["BillID"] = i["BillID"]
            item["Item"] = i["Item"]
            item["Total"] = i["Total"]
            item["BillDate"] = i["BillDate"]
            item["Paid"] = i["Paid"]
            bill.append(item)

    except:
        bill = []

    return bill

def print_bill(patient):
    bill = view_bill(patient)
    with open('ItemizedBill.txt', 'w') as fout:
        json.dump(bill, fout)
    return

def add_consultation(consultation):
    # added into bill items (not paid), assume equipment search returns existing quantity
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into CONSULTATION (DoctorEmployeeID, PatientID, Price,ConsultationDate) values (?,?,?,?)",
                    (consultation["DoctorEmployeeID"], consultation["PatientID"], consultation["Price"], consultation["ConsultationDate"],))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()

    add_bill_items(getBillID(consultation["PatientID"]), "Consultation",
                   consultation["Price"], consultation["ConsultationDate"], False)
    return


def add_procedure(procedure):
    # added into bill items (not paid), assume equipment search returns existing quantity
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into PROCEDURE_ (DoctorEmployeeID, PatientID, EquipmentID, ProcedureDate, Quantity) values (?,?,?,?,?)",
                    (procedure["DoctorEmployeeID"], procedure["PatientID"], procedure["EquipmentID"], procedure["ProcedureDate"], "0",))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()

    item = getEquipmentName(procedure["EquipmentID"]) + " Procedure"
    add_bill_items(getBillID(procedure["PatientID"]), item, getEquipmentPrice(
        procedure["EquipmentID"]), procedure["ProcedureDate"], False)
    return


def add_prescription(prescription):
    # added into bill items (not paid), assume equipment search returns existing quantity
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        updatedQuantity = str(
            int(prescription["Quantity"])-int(prescription["UsedQuantity"]))
        cur.execute("Insert into PRESCRIBES (DoctorEmployeeID, PatientID, MedicineID, Quantity,PrescriptionDate) values (?,?,?,?,?)",
                    (prescription["DoctorEmployeeID"], prescription["PatientID"], prescription["MedicineID"], updatedQuantity, prescription["PrescriptionDate"],))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()

    item = getMedName(prescription["MedicineID"]) + \
        " - " + prescription["UsedQuantity"]
    total = str(float(getMedPrice(
        prescription["MedicineID"])) * int(prescription["UsedQuantity"]))
    add_bill_items(getBillID(
        prescription["PatientID"]), item, total, prescription["PrescriptionDate"], False)
    return


def getMedName(MedicineId):
    med = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT MedicineName FROM MEDICINE WHERE MedicineID = ?",
                    (MedicineId,))
        row = cur.fetchone()

        # convert row object to dictionary
        med["MedicineName"] = row["MedicineName"]
    except:
        med = {}

    return med["MedicineName"]


def getMedPrice(MedicineId):
    med = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT Price FROM MEDICINE WHERE MedicineID = ?",
                    (MedicineId,))
        row = cur.fetchone()

        # convert row object to dictionary
        med["Price"] = row["Price"]
    except:
        med = {}

    return med["Price"]


def getBillID(PatientID):
    patient = {}
    conn = connect_to_db()
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()
    cur.execute("SELECT BillID FROM PATIENT WHERE PatientID = ?",
                (PatientID,))
    row = cur.fetchone()

    # convert row object to dictionary
    patient["BillID"] = row["BillID"]

    return patient["BillID"]


def getEquipmentName(EquipmentID):
    med = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT EquipmentName FROM EQUIPMENT WHERE EquipmentID = ?",
                    (EquipmentID,))
        row = cur.fetchone()

        # convert row object to dictionary
        med["EquipmentName"] = row["EquipmentName"]
    except:
        med = {}

    return med["EquipmentName"]


def getEquipmentPrice(EquipmentID):
    med = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT Price FROM EQUIPMENT WHERE EquipmentID = ?",
                    (EquipmentID,))
        row = cur.fetchone()

        # convert row object to dictionary
        med["Price"] = row["Price"]
    except:
        med = {}

    return med["Price"]


def add_bill_items(BillID, Item, Total, BillDate, Paid):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into BILL_ITEMS (BillID,Item,Total,BillDate,Paid) values (?,?,?,?,?)",
                    (BillID, Item, Total, BillDate, Paid,))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()

    return


def add_visitdate(patientID, visitDate):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into OUT_PATIENT_VISIT_DATE (PatientID, VisitDate) values (?,?)",
                    (patientID, visitDate))
        conn.commit()

    except:
        conn.rollback()

    finally:
        conn.close()

    return


def create_emergencycontact(ContactID, FullName, Email, HomeAddress, PhoneNumber, PatientID, Relation):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into EMERGENCY_CONTACT (ContactID,FullName,Email,HomeAddress,PhoneNumber,PatientID,Relation) values (?,?,?,?,?,?,?)",
                    (ContactID, FullName, Email, HomeAddress, PhoneNumber, PatientID, Relation,))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()
    return


def get_emergencycontacts():
    ecs = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM EMERGENCY_CONTACT")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            patient = {}
            patient["PatientID"] = i["PatientID"]
            patient["ContactID"] = i["ContactID"]
            patient["Relation"] = i["Relation"]
            patient["FullName"] = i["FullName"]
            patient["Email"] = i["Email"]
            patient["PhoneNumber"] = i["PhoneNumber"]
            patient["HomeAddress"] = i["HomeAddress"]
            ecs.append(patient)

    except:
        ecs = []

    return ecs


def get_payers():
    payers = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM PAYER")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            patient = {}
            patient["PayerID"] = i["PayerID"]
            patient["FullName"] = i["FullName"]
            payers.append(patient)

    except:
        payers = []

    return payers


def register_patient(patient):

    patients = [d['PatientID'] for d in get_patients()]
    bills = [d['BillID'] for d in get_patients()]
    ecs = [d['ContactID'] for d in get_emergencycontacts()]

    inserted_patient = {}
    newPatientID = 'P0'
    newBillID = 'B0'
    newContactID = 'C0'

    for i in range(10000):
        newPatientID = 'P{0}'.format(str(i))
        if newPatientID not in patients:
            break

    for i in range(10000):
        newBillID = 'B{0}'.format(str(i))
        if newBillID not in bills:
            break

    for i in range(10000):
        newContactID = 'C{0}'.format(str(i))
        if newContactID not in ecs:
            break

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into PATIENT (PatientID, Gender, FullName, PhoneNumber, HomeAddress, DOB, BillID) values (?,?,?,?,?,?,?)",
                    (newPatientID, patient["Gender"], patient["FullName"], patient["PhoneNumber"], patient["HomeAddress"], patient["DOB"], newBillID,))
        conn.commit()
        cur = conn.cursor()
        cur.execute("Insert into BILL (BillID, Total, PatientID) values (?,?,?)",
                    (newBillID, 0, newPatientID,))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()

    if(patient["PayerType"] == "Insurance"):
        addPatientInsurance(newPatientID, patient["Insurance"])

    else:
        payers = [d['PayerID'] for d in get_payers()]
        for i in range(10000):
            newPayerID = 'P{0}'.format(str(i))
            if newPayerID not in payers:
                break
        addDirectPayer(newPayerID, newPatientID, patient["Email"])
        addPayer(newPayerID, patient["FullName"])

    create_outpatient(newPatientID)
    add_visitdate(newPatientID, patient["VisitDate"])
    create_emergencycontact(newContactID, patient["ECFullName"], patient["ECEmail"],
                            patient["ECHomeAddress"], patient["ECPhoneNumber"], newPatientID, patient["ECRelation"])
    return


def getAllInsurance():
    insurances = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM INSURANCE")
        rows = cur.fetchall()
        # convert row objects to dictionary
        for i in rows:
            insurance = {}
            insurance["PayerID"] = i["PayerID"]
            cur.execute("SELECT * FROM PAYER WHERE PayerID = ?",
                        (insurance["PayerID"],))
            newRows = cur.fetchall()
            for j in newRows:
                insurance["Name"] = j["FullName"]
            insurances.append(insurance)

    except:
        insurances = []
        conn.rollback()

    return insurances


def addPatientInsurance(patientID, payerID):
    conn = connect_to_db()
    cur = conn.cursor()
    cur.execute("Insert into PATIENT_INSURANCE (PatientID, PayerID) values (?,?)",
                (patientID, payerID,))
    conn.commit()
    conn.close()
    return


def addDirectPayer(payerID, patientID, email):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into DIRECT (PatientID, PayerID, PaymentInfo) values (?,?,?)",
                    (patientID, payerID, email,))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()
    return


def addPayer(payerID, name):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into PAYER (PayerID, FullName) values (?,?)",
                    (payerID, name,))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()
    return


def getPayerIDInsurance(InsuranceName):
    med = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT PayerID FROM PAYER WHERE FullName = ?",
                    (InsuranceName,))
        row = cur.fetchone()

        # convert row object to dictionary
        med["PayerID"] = row["PayerID"]
    except:
        med = {}

    return med["PayerID"]


def check_inpatient(patientID):
    isInpatient = False
    patient = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM IN_PATIENT WHERE PatientID = ?",
                    (patientID,))
        row = cur.fetchone()

        # convert row object to dictionary
        patient["PatientID"] = row["PatientID"]
        patient["PatientStatus"] = row["PatientStatus"]

        if(patient["PatientID"] != "null" and patient["PatientStatus"] == "Admitted"):
            isInpatient = True
    except:
        patient = {}

    return isInpatient


def search_patients(patient):
    patients = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        if("PatientID" in patient and "FullName" in patient and "DOB" in patient):
            cur.execute("SELECT * FROM PATIENT WHERE PatientID = ? AND FullName LIKE ? AND  DOB = ?",
                        (patient["PatientID"], '%'+patient["FullName"]+'%', patient["DOB"]))
        elif("PatientID" in patient and "FullName" in patient and "DOB" not in patient):
            cur.execute("SELECT * FROM PATIENT WHERE PatientID = ? AND FullName like ? ",
                        (patient["PatientID"], "%"+patient["FullName"]+"%",))
        elif ("PatientID" in patient and "FullName" not in patient and "DOB" not in patient):
            cur.execute("SELECT * FROM PATIENT WHERE PatientID = ?",
                        (patient["PatientID"],))
        elif("PatientID" in patient and "FullName" not in patient and "DOB" in patient):
            cur.execute("SELECT * FROM PATIENT WHERE PatientID = ? AND  DOB = ?",
                        (patient["PatientID"], patient["DOB"]))
        elif("PatientID" not in patient and "FullName" not in patient and "DOB" in patient):
            cur.execute("SELECT * FROM PATIENT WHERE DOB = ?",
                        (patient["DOB"],))
        elif("PatientID" not in patient and "FullName" in patient and "DOB" not in patient):
            cur.execute("SELECT * FROM PATIENT WHERE FullName like ?",
                        ("%"+patient["FullName"]+"%",))
        elif("PatientID" not in patient and "FullName" in patient and "DOB" in patient):
            cur.execute("SELECT * FROM PATIENT WHERE  FullName like ? AND  DOB = ?",
                        ("%"+patient["FullName"]+"%", patient["DOB"]))
        else:
            cur.execute("SELECT * FROM PATIENT")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            patient = {}
            patient["PatientID"] = i["PatientID"]
            patient["Gender"] = i["Gender"]
            patient["FullName"] = i["FullName"]
            patient["DOB"] = i["DOB"]
            patient["PhoneNumber"] = i["PhoneNumber"]
            patient["HomeAddress"] = i["HomeAddress"]
            patient["BillID"] = i["BillID"]
            patient["Inpatient"] = check_inpatient(i["PatientID"])
            patient["emergContact"] = get_specific_emergency(patient)
            patients.append(patient)
    except:
        patients = []

    return patients


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
            patient["Gender"] = i["Gender"]
            patient["FullName"] = i["FullName"]
            patient["DOB"] = i["DOB"]
            patient["PhoneNumber"] = i["PhoneNumber"]
            patient["HomeAddress"] = i["HomeAddress"]
            patient["BillID"] = i["BillID"]
            patients.append(patient)

    except:
        patients = []

    return patients


def getDoctorID(DoctorName):
    med = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT EmployeeID FROM EMPLOYEE WHERE FullName = ?",
                    (DoctorName,))
        row = cur.fetchone()

        # convert row object to dictionary
        med["EmployeeID"] = row["EmployeeID"]
    except:
        med = {}

    return med["EmployeeID"]


def getMedID(MedName):
    med = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT MedicineID FROM MEDICINE WHERE MedicineName = ?",
                    (MedName,))
        row = cur.fetchone()

        # convert row object to dictionary
        med["MedicineID"] = row["MedicineID"]
    except:
        med = {}

    return med["MedicineID"]


def getEquipID(MedName):
    med = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT EquipmentID FROM EQUIPMENT WHERE EquipmentName = ?",
                    (MedName,))
        row = cur.fetchone()

        # convert row object to dictionary
        med["EquipmentID"] = row["EquipmentID"]
    except:
        med = {}

    return med["EquipmentID"]


def getDoctorName(DoctorID):
    med = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT FullName FROM EMPLOYEE WHERE EmployeeID = ?",
                    (DoctorID,))
        row = cur.fetchone()

        # convert row object to dictionary
        med["FullName"] = row["FullName"]
    except:
        med = {}

    return med["FullName"]


def search_prescription(pres):
    prescriptions = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        if("DoctorName" in pres and "MedicineName" in pres):
            cur.execute("SELECT * FROM PRESCRIBES WHERE PatientID = ? AND DoctorEmployeeID = ? AND MedicineID = ?",
                        (pres["PatientID"], getDoctorID(pres["DoctorName"]), getMedID(pres["MedicineName"]),))
        elif("DoctorName" in pres and "MedicineName" not in pres):
            cur.execute("SELECT * FROM PRESCRIBES WHERE PatientID = ? AND DoctorEmployeeID = ?",
                        (pres["PatientID"], getDoctorID(pres["DoctorName"]), ))
        elif("DoctorName" not in pres and "MedicineName" in pres):
            cur.execute("SELECT * FROM PRESCRIBES WHERE PatientID = ? AND MedicineID = ?",
                        (pres["PatientID"], getMedID(pres["MedicineName"]), ))
        else:
            cur.execute(
                "SELECT * FROM PRESCRIBES WHERE PatientID = ? ", (pres["PatientID"],))

        rows = cur.fetchall()
        for i in rows:
            patient = {}
            patient["PatientID"] = i["PatientID"]
            patient["Quantity"] = i["Quantity"]
            patient["MedicineName"] = getMedName(i["MedicineID"])
            patient["PrescriptionDate"] = i["PrescriptionDate"]
            patient["DoctorName"] = getDoctorName(i["DoctorEmployeeID"])
            prescriptions.append(patient)

    except:
        prescriptions = []

    return prescriptions


def search_procedure(pres):
    procedures = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        if("DoctorName" in pres and "EquipmentName" in pres):
            cur.execute("SELECT * FROM PROCEDURE_ WHERE PatientID = ? AND DoctorEmployeeID = ? AND EquipmentID = ?",
                        (pres["PatientID"], getDoctorID(pres["DoctorName"]), getEquipID(pres["EquipmentName"]),))
        elif("DoctorName" in pres and "EquipmentName" not in pres):
            cur.execute("SELECT * FROM PROCEDURE_ WHERE PatientID = ? AND DoctorEmployeeID = ?",
                        (pres["PatientID"], getDoctorID(pres["DoctorName"]), ))
        elif("DoctorName" not in pres and "EquipmentName" in pres):
            cur.execute("SELECT * FROM PROCEDURE_ WHERE PatientID = ? AND EquipmentID = ?",
                        (pres["PatientID"], getEquipID(pres["EquipmentName"]), ))
        else:
            cur.execute(
                "SELECT * FROM PROCEDURE_ WHERE PatientID = ? ", (pres["PatientID"],))

        rows = cur.fetchall()
        for i in rows:
            patient = {}
            patient["PatientID"] = i["PatientID"]
            patient["Quantity"] = i["Quantity"]
            patient["EquipmentName"] = getEquipmentName(i["EquipmentID"])
            patient["ProcedureDate"] = i["ProcedureDate"]
            patient["DoctorName"] = getDoctorName(i["DoctorEmployeeID"])
            procedures.append(patient)

    except:
        procedures = []

    return procedures


def search_consultation(pres):
    consultations = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        if("DoctorName" in pres):
            cur.execute("SELECT * FROM CONSULTATION WHERE PatientID = ? AND DoctorEmployeeID = ?",
                        (pres["PatientID"], getDoctorID(pres["DoctorName"]), ))
        else:
            cur.execute(
                "SELECT * FROM CONSULTATION WHERE PatientID = ?", (pres["PatientID"], ))

        rows = cur.fetchall()
        for i in rows:
            patient = {}
            patient["PatientID"] = i["PatientID"]
            patient["Price"] = i["Price"]
            patient["ConsultationDate"] = i["ConsultationDate"]
            patient["DoctorName"] = getDoctorName(i["DoctorEmployeeID"])
            consultations.append(patient)

    except:
        consultations = []

    return consultations


def admit(patient):
    # put patient in inpatient, status admitted
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into IN_PATIENT (PatientID, PatientStatus, DischargeDate, BedNumber) values (?,?,?,?)",
                    (patient["PatientID"], "Admitted", None, patient["BedNumber"],))
        conn.commit()
        cur.execute("Update BED SET PatientID = ? WHERE BedNumber = ?",
                    (patient["PatientID"], patient["BedNumber"],))
        conn.commit()
        add_bill_items(getBillID(patient["PatientID"]), "Bed "+patient["BedNumber"], patient["BedTotal"], patient["BillDate"], False)
    except:
        conn.rollback()
    finally:
        conn.close()
    # remove patientID from outpatient
    remove_outpatient(patient["PatientID"])

    return


def remove_outpatient(PatientID):
    message = {}
    try:
        conn = connect_to_db()
        conn.execute("DELETE from OUT_PATIENT WHERE PatientID = ?",
                     (PatientID,))
        conn.commit()
        message["status"] = "patient deleted successfully"
    except:
        conn.rollback()
        message["status"] = "Cannot delete patient"
    finally:
        conn.close()

    return message


def discharge(patient):
    # set status to discharged, add to outpatient
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Update IN_PATIENT SET PatientStatus =? , DischargeDate =?, BedNumber=? WHERE PatientID = ?",
                    (patient["PatientStatus"], patient["DischargeDate"], None, patient["PatientID"],))
        conn.commit()
        cur.execute("Update BED SET PatientID = ? WHERE PatientID = ?",
                    (None, patient["PatientID"],))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()
    if(patient["PatientStatus"] == "Discharged"):
        create_outpatient(patient["PatientID"])
    return


def get_patient_by_id(patient):
    patient = {}
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM PATIENT WHERE PatientID = ?",
                    (patient["PatientID"],))
        row = cur.fetchone()

        # convert row object to dictionary
        patient["PatientID"] = row["PatientID"]
    except:
        patient = {}

    return patient


def update_patient(patient):
    updated_patient = {}
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE PATIENT SET Gender = ?, FullName = ?, PhoneNumber = ?, HomeAddress = ? WHERE PatientID = ?",
                    (patient["Gender"], patient["FullName"],
                     patient["PhoneNumber"], patient["HomeAddress"],
                     patient["PatientID"],))
        conn.commit()
        # return the patient
        updated_patient = get_patient_by_id(patient["PatientID"])

    except:
        conn.rollback()
        updated_patient = {}
    finally:
        conn.close()

    return updated_patient


def update_EC(EC):

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE EMERGENCY_CONTACT SET FullName = ?, Email = ?, PhoneNumber = ?, HomeAddress = ?, Relation = ? WHERE PatientID = ?",
                    (EC["FullName"], EC["Email"],
                     EC["PhoneNumber"], EC["HomeAddress"], EC["Relation"],
                     EC["PatientID"],))
        conn.commit()
        # return the patient

    except:
        conn.rollback()

    finally:
        conn.close()

    return


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


def add_visit(patient):
    # put patient in inpatient, status admitted
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("Insert into OUT_PATIENT_VISIT_DATE (PatientID, VisitDate) values (?,?)",
                    (patient["PatientID"], patient["VisitDate"],))
        conn.commit()
    except:
        conn.rollback()

    finally:
        conn.close()
    # remove patientID from outpatient
    remove_outpatient(patient["PatientID"])

    return


def get_specific_emergency(patient):
    ecs = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute(
            "SELECT * FROM EMERGENCY_CONTACT WHERE PatientID = ?", (patient["PatientID"],))
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            newPat = {}
            newPat["PatientID"] = i["PatientID"]
            newPat["ContactID"] = i["ContactID"]
            newPat["Relation"] = i["Relation"]
            newPat["FullName"] = i["FullName"]
            newPat["Email"] = i["Email"]
            newPat["PhoneNumber"] = i["PhoneNumber"]
            newPat["HomeAddress"] = i["HomeAddress"]
            ecs.append(newPat)

    except:
        ecs = []
    return ecs
