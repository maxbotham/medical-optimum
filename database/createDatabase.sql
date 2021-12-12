/* DATE format: YYYY-MM-DD */

CREATE TABLE PATIENT(
    PatientID varchar(10) NOT NULL PRIMARY KEY,
    Gender varchar(20) NOT NULL,
    FullName varchar(50) NOT NULL, /*Name is a keyword*/
    DOB DATE NOT NULL,
    PhoneNumber varchar(20) NOT NULL,
    HomeAddress varchar(70) NOT NULL, /*Address is a keyword*/
    BillID varchar(10) NOT NULL,
    FOREIGN KEY (BillID) REFERENCES BILL(BillID)
);
CREATE TABLE IN_PATIENT(
    PatientID varchar(10) NOT NULL PRIMARY KEY,
    PatientStatus varchar(15) NOT NULL, /*Status is a keyword*/
    DischargeDate DATE,
    BedNumber varchar(10),
    FOREIGN KEY (BedNumber) REFERENCES BED(BedNumber),
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
);
CREATE TABLE OUT_PATIENT(
    PatientID varchar(10) NOT NULL PRIMARY KEY,
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
);
CREATE TABLE OUT_PATIENT_VISIT_DATE(
    PatientID varchar(10) NOT NULL,
    VisitDate DATE NOT NULL,
    PRIMARY KEY (PatientId, VisitDate),
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
);
CREATE TABLE EMERGENCY_CONTACT(
    ContactID varchar(10) NOT NULL,
    FullName varchar(20) NOT NULL, /*Name is a keyword*/
    Email varchar(20) NOT NULL,
    HomeAddress varchar(70) NOT NULL, /*Address is a keyword*/
    PhoneNumber varchar(20) NOT NULL,
    PatientID varchar(10) NOT NULL,
    Relation varchar(20) NOT NULL,
    PRIMARY KEY (PatientID, ContactID),
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
);
CREATE TABLE BED(
    BedNumber varchar(10) NOT NULL PRIMARY KEY,
    BedStatus varchar(15) NOT NULL, /*Status is a keyword*/
    Price float NOT NULL,
    PatientID varchar(10),
    WardNumber varchar(10) NOT NULL,
    FOREIGN KEY (WardNumber) REFERENCES WARD(WardNumber)
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
);
CREATE TABLE WARD(
    WardNumber varchar(10) NOT NULL PRIMARY KEY,
    WardType varchar(20) NOT NULL /*Type is a keyword*/
);
CREATE TABLE PROCEDURE_( /*Procedure is a keyword*/
    DoctorEmployeeID varchar(10) NOT NULL,
    PatientID varchar(10) NOT NULL,
    EquipmentID varchar(10) NOT NULL,
    ProcedureDate DATE NOT NULL, /*Date is a keyword*/
    PRIMARY KEY (DoctorEmployeeID, PatientID, EquipmentID, ProcedureDate),
    FOREIGN KEY (DoctorEmployeeID) REFERENCES DOCTOR(EmployeeID),
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID),
    FOREIGN KEY (EquipmentID) REFERENCES EQUIPMENT(EquipmentID)
);
CREATE TABLE PRESCRIBES(
    DoctorEmployeeID varchar(10) NOT NULL,
    PatientID varchar(10) NOT NULL,
    MedicineID varchar(10) NOT NULL,
    Quantity int NOT NULL,
    PrescriptionDate DATE NOT NULL, /*Date is a keyword*/
    PRIMARY KEY (DoctorEmployeeID, PatientID, MedicineID, PrescriptionDate),
    FOREIGN KEY (DoctorEmployeeID) REFERENCES DOCTOR(EmployeeID),
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID),
    FOREIGN KEY (MedicineID) REFERENCES MEDICINE(MedicineID)
);
CREATE TABLE CONSULTATION(
    DoctorEmployeeID varchar(10) NOT NULL,
    PatientID varchar(10) NOT NULL,
    Price float NOT NULL,
    ConsultationDate DATE NOT NULL, /*Date is a keyword*/
    PRIMARY KEY (DoctorEmployeeID, PatientID, ConsultationDate),
    FOREIGN KEY (DoctorEmployeeID) REFERENCES DOCTOR(EmployeeID),
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
);
CREATE TABLE DEPARTMENT(
    DeptID varchar(10) NOT NULL PRIMARY KEY,
    DeptName varchar(20) NOT NULL, /*Name is a keyword*/
    NoEmployees int NOT NULL
);
CREATE TABLE EMPLOYEE(
    EmployeeID varchar(10) NOT NULL PRIMARY KEY,
    FullName varchar(20) NOT NULL, /*Name is a keyword*/
    DOB DATE NOT NULL,
    Salary float NOT NULL,
    StartDate DATE NOT NULL
);
CREATE TABLE RECEPTIONIST(
    EmployeeID varchar(10) NOT NULL PRIMARY KEY,
    DBAccessUsername varchar(20),
    DBAccessPassword varchar(20),
    FOREIGN KEY (EmployeeID) REFERENCES EMPLOYEE(EmployeeID)
);
CREATE TABLE ADMIN_( /*ADMIN is a keyword*/
    EmployeeID varchar(10) NOT NULL PRIMARY KEY,
    DBAccessUsername varchar(20),
    DBAccessPassword varchar(20),
    FOREIGN KEY (EmployeeID) REFERENCES EMPLOYEE(EmployeeID)
);
CREATE TABLE DOCTOR(
    EmployeeID varchar(10) NOT NULL PRIMARY KEY,
    Specialty varchar(20) NOT NULL,
    DeptID varchar(10) NOT NULL,
    FOREIGN KEY (DeptID) REFERENCES DEPARTMENT(DeptID),
    FOREIGN KEY (EmployeeID) REFERENCES EMPLOYEE(EmployeeID)
);
CREATE TABLE EQUIPMENT(
    EquipmentID varchar(10) NOT NULL PRIMARY KEY,
    EquipmentName varchar(20) NOT NULL, /*Name is a keyword*/
    Price float NOT NULL,
    Quantity int NOT NULL
);
CREATE TABLE MEDICINE(
    MedicineID varchar(10) NOT NULL PRIMARY KEY,
    MedicineName varchar(20) NOT NULL, /*Name is a keyword*/
    Price float NOT NULL,
    Quantity int NOT NULL
);
CREATE TABLE EQUIPMENT_IS_UNDER_DEPARTMENT(
    EquipmentID varchar(10) NOT NULL,
    DeptID varchar(10) NOT NULL,
    FOREIGN KEY (EquipmentID) REFERENCES EQUIPMENT(EquipmentID),
    FOREIGN KEY (DeptID) REFERENCES DEPARTMENT(DeptID),
    PRIMARY KEY(DeptID, EquipmentID)
);
CREATE TABLE PAYER(
    PayerID varchar(10) NOT NULL PRIMARY KEY,
    FullName varchar(50) NOT NULL /*Name is a keyword*/
);
CREATE TABLE DIRECT(
    PayerID varchar(10) NOT NULL PRIMARY KEY,
    PatientID varchar(10) NOT NULL,
    PaymentInfo varchar(100) NOT NULL,
    FOREIGN KEY (PayerID) REFERENCES PAYER(PayerID),
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
);
CREATE TABLE BILL(
    BillID varchar(10) NOT NULL PRIMARY KEY,
    Total float NOT NULL,
    PatientID varchar(10) NOT NULL,
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
); 
CREATE TABLE BILL_ITEMS(
    BillID varchar(10) NOT NULL,
    Item varchar(50) NOT NULL,
    BillDate DATE NOT NULL, /*Date is a keyword*/
    PRIMARY KEY (BillID, BillDate),
    FOREIGN KEY (BillID) REFERENCES BILL(BillID)
);
CREATE TABLE REGISTERS(
    ReceptionistEmployeeID varchar(10) NOT NULL,
    PatientID varchar(10) NOT NULL,
    RegisterDate DATE NOT NULL, /*Date is a keyword*/
    PRIMARY KEY (ReceptionistEmployeeID, PatientID),
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID),
    FOREIGN KEY (ReceptionistEmployeeID) REFERENCES RECEPTIONIST(EmployeeID)
);
CREATE TABLE ADMITS(
    ReceptionistEmployeeID varchar(10) NOT NULL,
    InPatientID varchar(10) NOT NULL,
    AdmitDate DATE NOT NULL, /*Date is a keyword*/
    PRIMARY KEY (ReceptionistEmployeeID, InPatientID, AdmitDate),
    FOREIGN KEY (InPatientID) REFERENCES IN_PATIENT(PatientID),
    FOREIGN KEY (ReceptionistEmployeeID) REFERENCES RECEPTIONIST(EmployeeID)
);
CREATE TABLE INSURANCE(
    PayerID varchar(10) NOT NULL PRIMARY KEY,
    Phone varchar(20) NOT NULL,
    Email varchar(20) NOT NULL,
    FOREIGN KEY (PayerID) REFERENCES PAYER(PayerID)
);
CREATE TABLE PAYER_PAYS_BILL(
    PayerID varchar(10) NOT NULL,
    BillID varchar(10) NOT NULL,
    AmountPaid float NOT NULL,
    DatePaid DATE NOT NULL, /*Date is a keyword*/
    FOREIGN KEY (PayerID) REFERENCES PAYER(PayerID),
    FOREIGN KEY (BillID) REFERENCES BILL(BillID),
    PRIMARY KEY (PayerID, BillID, DatePaid)
);
INSERT INTO PATIENT VALUES 
    ("P0", "Male", "Mac Dressler", "2001-02-03", "778-319-2629", "1812 32 Ave NW", ""
;