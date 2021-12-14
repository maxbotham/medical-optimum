#!/usr/bin/python
import sqlite3
import os

dirname = os.path.dirname(__file__)
filename = os.path.join(dirname, 'database/database.db')

def connect_to_db():
    conn = sqlite3.connect(filename)
    return conn

def add_medicine(medicine):
    medicines = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM MEDICINE")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            existingMedicine = i["MedicineID"]
            medicines.append(existingMedicine)

    except:
        medicines = []

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        newMedicineID = 'M0';
        for i in range(10000):
            newMedicineID = 'M{0}'.format(str(i))
            if newMedicineID not in medicines:
                break;
        cur.execute(
            "Insert into MEDICINE (MedicineID, MedicineName, Price, Quantity) values (?, ?, ?, ?)",
            (newMedicineID, medicine["MedicineName"], medicine["Price"], medicine["Quantity"],))
        conn.commit()
    except:
        conn.rollback()
    finally:
        conn.close()
        return {}

def add_equipment(equipment):
    equipments = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()
        cur.execute("SELECT * FROM EQUIPMENT")
        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            existingEquipment = i["EquipmentID"]
            equipments.append(existingEquipment)

    except:
        equipments = []

    try:
        conn = connect_to_db()
        cur = conn.cursor()
        newEquipmentID = 'E0';
        for i in range(10000):
            newEquipmentID = 'E{0}'.format(str(i))
            if newEquipmentID not in equipments:
                break;
        cur.execute(
            "Insert into EQUIPMENT (EquipmentID, EquipmentName, Price, Quantity) values (?, ?, ?, ?)",
            (newEquipmentID, equipment["EquipmentName"], equipment["Price"], equipment["Quantity"],))
        conn.commit()
    except:
        conn.rollback()
    finally:
        conn.close()
        return {}

def search_medicine(medicine):
    medicines = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        if "MedicineID" in medicine and "MedicineName" in medicine:
            cur.execute("SELECT * FROM MEDICINE WHERE MedicineID = ? AND MedicineName LIKE ?",
            (medicine["MedicineID"], '%'+medicine["MedicineName"]+'%',))
        elif "MedicineID" in medicine:
            cur.execute("SELECT * FROM MEDICINE WHERE MedicineID = ?",
            (medicine["MedicineID"],))
        elif "MedicineName" in medicine:
            cur.execute("SELECT * FROM MEDICINE WHERE MedicineName LIKE ?",
            ('%'+medicine["MedicineName"]+'%',))
        else:
            cur.execute("SELECT * FROM MEDICINE")

        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            foundMedicine = {}
            foundMedicine["MedicineName"]= i["MedicineName"]
            foundMedicine["MedicineID"]= i["MedicineID"]
            foundMedicine["Price"]= i["Price"]
            foundMedicine["Quantity"]= i["Quantity"]
            medicines.append(foundMedicine)
    except:
        medicines = []
    return medicines

def search_equipment(equipment):
    equipments = []
    try:
        conn = connect_to_db()
        conn.row_factory = sqlite3.Row
        cur = conn.cursor()

        if "EquipmentID" in equipment and "EquipmentName" in equipment:
            cur.execute("SELECT * FROM EQUIPMENT WHERE EquipmentID = ? AND EquipmentName LIKE ?",
            (equipment["EquipmentID"], '%'+equipment["EquipmentName"]+'%',))
        elif "EquipmentID" in equipment:
            cur.execute("SELECT * FROM EQUIPMENT WHERE EquipmentID = ?",
            (equipment["EquipmentID"],))
        elif "EquipmentName" in equipment:
            cur.execute("SELECT * FROM EQUIPMENT WHERE EquipmentName LIKE ?",
            ('%'+equipment["EquipmentName"]+'%',))
        else:
            cur.execute("SELECT * FROM EQUIPMENT")

        rows = cur.fetchall()

        # convert row objects to dictionary
        for i in rows:
            foundEquipment = {}
            foundEquipment["EquipmentName"]= i["EquipmentName"]
            foundEquipment["EquipmentID"]= i["EquipmentID"]
            foundEquipment["Price"]= i["Price"]
            foundEquipment["Quantity"]= i["Quantity"]
            equipments.append(foundEquipment)
    except:
        equipments = []
    return equipments

def update_medicine(medicine):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE MEDICINE SET MedicineName = ?, Quantity = ?, Price = ? WHERE MedicineID = ?",
                    (medicine["MedicineName"], medicine["Quantity"], medicine["Price"],
                     medicine["MedicineID"],))
        conn.commit()
        # return the patient
    except:
        conn.rollback()
    finally:
        conn.close()
    return {}

def update_equipment(equipment):
    try:
        conn = connect_to_db()
        cur = conn.cursor()
        cur.execute("UPDATE EQUIPMENT SET EquipmentName = ?, Quantity = ?, Price = ? WHERE EquipmentID = ?",
                    (equipment["EquipmentName"], equipment["Quantity"], equipment["Price"],
                     equipment["EquipmentID"],))
        conn.commit()
        # return the patient
    except:
        conn.rollback()
    finally:
        conn.close()
    return {}

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
