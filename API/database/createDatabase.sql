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
    PatientID varchar(10) NOT NULL,
    PatientStatus varchar(15) NOT NULL, /*Status is a keyword*/
    /* Possible options: Deceased, Discharged, Admitted */
    DischargeDate DATE,
    BedNumber varchar(10),
    PRIMARY KEY (PatientID, DischargeDate),
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
    FullName varchar(50) NOT NULL, /*Name is a keyword*/
    Email varchar(40) NOT NULL,
    HomeAddress varchar(70) NOT NULL, /*Address is a keyword*/
    PhoneNumber varchar(20) NOT NULL,
    PatientID varchar(10) NOT NULL,
    Relation varchar(20) NOT NULL,
    PRIMARY KEY (PatientID, ContactID),
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
);
CREATE TABLE BED(
    BedNumber varchar(10) NOT NULL PRIMARY KEY,
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
    Quantity int,
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
    DeptName varchar(20) NOT NULL /*Name is a keyword*/
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
    /* Options: Surgery, Orthopedics, Internal Medicine Gynaecology*/
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
    Total float NOT NULL,
    BillDate DATE NOT NULL, /*Date is a keyword*/
    Paid boolean,
    PRIMARY KEY (BillID, BillDate, Item),
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
    Email varchar(40) NOT NULL,
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
CREATE TABLE PATIENT_INSURANCE(
    PayerID varchar(10) NOT NULL,
    PatientID varchar(10) NOT NULL,
    FOREIGN KEY (PayerID) REFERENCES PAYER(PayerID),
    FOREIGN KEY (PatientID) REFERENCES PATIENT(PatientID)
);
INSERT INTO PATIENT_INSURANCE VALUES
    ("P0","P5"),
    ("P1","P6"),
    ("P2","P7")
;

INSERT INTO PATIENT VALUES 
    ("P0", "Male", "Mac Dressman", "2001-02-03", "350-319-2629", "1812 32 Ave NW", "B0"),
    ("P1", "Female", "Shannon Milton", "2000-02-20", "885-392-0392", "6888 24 Ave NE", "B1"),
    ("P2", "Male", "Matthew Wetham", "1999-02-21", "885-850-2943", "3022 38 Ave SE", "B2"),
    ("P3", "Male", "Liam Manwork", "2001-04-24", "885-230-4833", "1502 Uxbridge Drive NW", "B3"),
    ("P4", "Male", "Morten Royale", "1999-08-22", "885-853-2629", "600 12 Ave NE", "B4"),
    ("P5", "Female", "Sharon Tate", "1988-06-01", "885-810-3201", "302 12 Ave NE", "B5"),
    ("P6", "Female", "Roman Polanski", "1905-02-01", "733-672-5032", "5988 32 Ave SW", "B6"),
    ("P7", "Male", "Charles Manson", "1955-05-10", "885-306-3842", "6822 68 Ave SE", "B7"),
    ("P8", "Male", "Reda Alhajj", "2005-8-13", "885-022-6832", "9965 20 Ave SE", "B8"),
    ("P9", "Female", "Tony Wachos", "1955-10-26", "733-588-1048", "8643 University Ave NW", "B9")
;
INSERT INTO IN_PATIENT VALUES
    ("P0", "Admitted", null, "B6"),
    ("P3", "Admitted", null, "B2"),
    ("P4", "Admitted", null, "B5"),
    ("P8", "Discharged", "2021-11-23", "B6"),
    ("P5", "Deceased", "2021-11-15", "B6"),
    ("P8", "Discharged", "2021-09-20","B9")
;
INSERT INTO OUT_PATIENT VALUES
    ("P8"),
    ("P1"),
    ("P2"),
    ("P6"),
    ("P7"),
    ("P9")
;
INSERT INTO EMERGENCY_CONTACT VALUES
    ("C0", "George Matthewson", "georgematthewson@gmail.com", "1812 32 Ave NW", "305-488-2012", "P0", "Friend"),
    ("C1", "Marcus Milton", "marcusmilton@gmail.com", "6808 24 Ave SE", "123-503-5888", "P1", "Father"),
    ("C2", "Karen Wetham", "sharenwetham@gmail.com", "555-884-3844", "3022 38 Ave SE", "P2", "Mother"),
    ("C3", "Paula Manwork", "paulamanwork@gmail.com", "885-233-5888", "1502 Uxbridge Drive NW", "P3", "Mother"),
    ("C4", "Ruben Royale", "rubenroyale@gmail.com", "885-500-1838", "600 12 Ave NE", "P4", "Father"),
    ("C5", "Carson Tate", "carsontate@gmail.com", "885-381-4858", "302 12 Ave NE", "P5", "Father"),
    ("C6", "Savannah Polanski", "savannahpolan@gmail.com", "733-202-2022", "5988 32 Ave SW", "P6", "Mother"),
    ("C7", "Emily Manson", "emilymanson@gmail.com", "885-684-6829", "6822 68 Ave SE", "P7", "Mother"),
    ("C8", "Lucas Alhajj", "lucasalhajj@gmail.com", "885-100-6844", "9965 20 Ave SE", "P8", "Son"),
    ("C9", "Laura Wachos", "laurawachos@gmail.com", "733-533-8302", "8643 University Ave NW", "P9", "Mother")
;
INSERT INTO BED VALUES
    ("B0", 12.99, null, "W0"),
    ("B1", 12.99, null, "W0"),
    ("B2", 11.99, "P3", "W0"),
    ("B3", 13.99, null, "W0"),
    ("B4", 26.99, null, "W0"),
    ("B5", 15.99, "P4", "W1"),
    ("B6", 20.99, "P0", "W1"),
    ("B7", 5.99, null, "W1"),
    ("B8", 5.99, null, "W1"),
    ("B9", 5.99, null, "W2"),
    ("B10", 5.99, null, "W2"),
    ("B11", 20.99, null, "W2"),
    ("B12", 20.99, null, "W2"),
    ("B13", 23.99, null, "W3"),
    ("B14", 23.99, null, "W3"),
    ("B15", 26.99, null, "W3"),
    ("B16", 5.99, null, "W3")
;
INSERT INTO WARD VALUES
    ("W0", "Geriatrics"),
    ("W1", "ICU"),
    ("W2", "Maternity"),
    ("W3", "Pediatrics"),
    ("W4", "Cathlab")
;
INSERT INTO DEPARTMENT VALUES
    ("D0", "Geriatrics"),
    ("D1", "ICU"),
    ("D2", "Maternity"),
    ("D3", "Pediatrics"),
    ("D4", "Cathlab")
;
INSERT INTO EMPLOYEE VALUES
    ("E0", "Dwight Docman", "1988-04-05", 68000, "2019-05-05"),
    ("E1", "Shan Marcon", "1993-02-08", 68000, "2018-05-10"),
    ("E2", "Klaus Heiffman", "1992-09-09", 74000, "2019-03-05"),
    ("E3", "Caroline White", "1992-08-10", 50000, "2019-06-05"),
    ("E4", "Carol Simmons", "1968-07-11", 81000, "2020-02-05"),
    ("E5", "Christy Stuart", "1965-06-12", 83000, "2010-03-05"),
    ("E6", "Chris Daugherty", "1968-01-03", 88000, "2011-12-05"),
    ("E7", "Vecepia Towery", "1968-01-02", 103000, "2010-11-05"),
    ("E8", "Tyson Apostol", "1991-12-01", 101000, "2010-10-05"),
    ("E9", "Richard Hatch", "1984-11-06", 60000, "2009-09-05"),
    ("E10", "Jeremy Colins", "1982-01-05", 105000, "2008-03-05"),
    ("E11", "Natalie Anderson", "1985-03-05", 108000, "2007-04-05"),
    ("E12", "Yul Kwon", "1981-05-03", 120300, "2007-02-02"),
    ("E13", "Parvati Shallow", "1989-03-03", 70000, "2009-03-11"),
    ("E14", "Jonathon Penner", "1983-04-05", 125000, "2004-09-09"),
    ("E15", "Russel Swan", "1988-04-02", 155000, "2005-06-11")
;
INSERT INTO RECEPTIONIST VALUES
    ("E13", "parvati", "monkeyfluff311"),
    ("E9", "richard", "ihatetaxes101"),
    ("E3", "caroline", "hospitalmom033")
;
INSERT INTO ADMIN_ VALUES
    ("E0", "dwight", "password"),
    ("E1", "shan", "482014aasef"),
    ("E2", "klaus", "klauspassword")
;
INSERT INTO DOCTOR VALUES
    ("E4", "Surgery", "D1"),
    ("E5", "Surgery", "D1"),
    ("E6", "Gynaecology", "D3"),
    ("E7", "Internal Medicine", "D3"),
    ("E8", "Orthopedics", "D0"),
    ("E10", "Surgery", "D0"),
    ("E11", "Orthopedics", "D2"),
    ("E12", "Internal Medicine", "D2"),
    ("E14", "Orthopedics", "D4"),
    ("E15", "Internal Medicine", "D4")
;
INSERT INTO EQUIPMENT VALUES
    ("E0", "X-Ray Machine", 49.99, 5),
    ("E1", "Gauze", 1.99, 1038),
    ("E2", "MRI Machine", 80.99, 5),
    ("E3", "Scalpel", 3.99, 20),
    ("E4", "Gloves", 3.99, 404),
    ("E5", "Gown", 4.99, 220)
;
INSERT INTO MEDICINE VALUES
    ("M0", "Ibuprofen", 3.99, 188),
    ("M1", "Atenol", 10.99, 302),
    ("M2", "Codeine", 15.99, 188),
    ("M3", "Famotocide", 13.99, 103),
    ("M4", "Gefitinib", 13.99, 25),
    ("M5", "Hydralizine", 18.99, 201),
    ("M6", "Omeprazole", 19.99, 233)
;
INSERT INTO PAYER VALUES
    ("P0", "Lucid Insurance"),
    ("P1", "BMO Insurance"),
    ("P2", "TD Insurance"),
    ("P3", "Provincial Insurance"),
    ("P4", "Daw's Insurance"),
    ("P5", "Calgary Municipal Insurance"),
    ("P6", "Mac Dressman"),
    ("P7", "Shannon Milton"),
    ("P8", "Matthew Wetham"),
    ("P9", "Liam Manwork")
;
INSERT INTO DIRECT VALUES
    ("P6", "P0", "macdressman@gmail.com"),
    ("P7", "P1", "shannonmilton@gmail.com"),
    ("P8", "P2", "matthewwetham@gmail.com"),
    ("P9", "P3", "liammanwork@gmail.com")
;
INSERT INTO BILL VALUES
    ("B0", 61.97, "P0"),
    ("B1", 71.97, "P1"),
    ("B2", 41.93, "P2"),
    ("B3", 119.9, "P3"),
    ("B4", 170.99, "P4"),
    ("B5", 267.88, "P5"),
    ("B6", 30, "P6"),
    ("B7", 94.99, "P7"),
    ("B8", 570.79, "P8"),
    ("B9", 0, "P9")
;
INSERT INTO PROCEDURE_ VALUES
    ("E10", "P1", "E0", "2021-11-28", null),
    ("E10", "P2", "E1", "2021-11-29", 5),
    ("E11", "P3", "E3", "2021-11-29", null),
    ("E11", "P3", "E4", "2021-11-25", 1),
    ("E8", "P4", "E2", "2021-11-24", null),
    ("E7", "P7", "E5", "2021-11-25", 1)
;
INSERT INTO PRESCRIBES VALUES
     ("E4", "P0", "M0", 3, "2021-11-27"),
     ("E5", "P1", "M1", 2, "2021-11-28"),
     ("E6", "P2", "M2", 2, "2021-11-29"),
     ("E7", "P3", "M4", 8, "2021-11-29"),
     ("E5", "P5", "M5", 2, "2021-11-21")
;
INSERT INTO CONSULTATION VALUES
    ("E4", "P0", 20, "2021-11-27"),
    ("E5", "P0", 30, "2021-11-28"),
    ("E14", "P4", 50, "2021-11-26"),
    ("E14", "P4", 40, "2021-11-22"),
    ("E15", "P5", 20, "2021-11-20"),
    ("E15", "P6", 30, "2021-11-20"),
    ("E12", "P7", 40, "2021-11-21"),
    ("E12", "P7", 50, "2021-11-22"),
    ("E7", "P8", 100, "2021-09-17"),
    ("E7", "P8", 140, "2021-11-20")
;
INSERT INTO BILL_ITEMS VALUES
    ("B0", "Ibuprofen - 3", 11.97, "2021-11-27", false),
    ("B0", "Consultation", 20, "2021-11-27", false),
    ("B0", "Consultation", 30, "2021-11-28", false),
    ("B1", "Atenol - 2", 21.98, "2021-11-28", false),
    ("B1", "X-Ray Procedure", 49.99, "2021-11-28", false),
    ("B2", "Codeine - 2", 31.98, "2021-11-29", false),
    ("B2", "Gauze - 5", 9.95, "2021-11-29", false),
    ("B3", "Gefitinib - 8", 111.92, "2021-11-29", false),
    ("B3", "Scalpel", 3.99, "2021-11-29", false),
    ("B3", "Gloves", 3.99, "2021-11-25", false),
    ("B4", "MRI Procedure", 80.99, "2021-11-24", false),
    ("B4", "Consultation", 50, "2021-11-26", false),
    ("B4", "Consultation", 40, "2021-11-22", false),
    ("B5", "Hydralizine - 2", 37.98, "2021-11-21", false),
    ("B5", "Consultation", 20, "2021-11-20", false),
    ("B5", "Bed", 209.9, "2021-11-15", false),
    ("B6", "Consultation", 30, "2021-11-20", false),
    ("B7", "Consultation", 40, "2021-11-21", false),
    ("B7", "Consultation", 50, "2021-11-22", false),
    ("B7", "Gown", 4.99, "2021-11-25", false),
    ("B8", "Bed", 209.9, "2021-11-23", false),
    ("B8", "Bed", 120.89, "2021-09-20", false),
    ("B8", "Consultation", 100, "2021-09-17", false),
    ("B8", "Consultation", 140, "2021-11-20", false)
;
INSERT INTO REGISTERS VALUES
    ("E3", "P0", "2020-10-05"),
    ("E9", "P1", "2020-11-06"),
    ("E3", "P2", "2020-11-09"),
    ("E9", "P3", "2020-12-08"),
    ("E13", "P4", "2021-03-06"),
    ("E13", "P5", "2021-05-03"),
    ("E13", "P6", "2021-06-03"),
    ("E9", "P7", "2021-07-11"),
    ("E3", "P8", "2021-08-12"),
    ("E9", "P9", "2021-09-12")
;
INSERT INTO ADMITS VALUES
    ("E13", "P0", "2021-11-25"),
    ("E13", "P3", "2021-11-24"),
    ("E9", "P4", "2021-11-28"),
    ("E9", "P8", "2021-11-15"),
    ("E3", "P5", "2021-11-01"),
    ("E3", "P8", "2021-09-13")
;
INSERT INTO INSURANCE VALUES
    ("P0", "778-319-2999", "lucidinsurance@gmail.com"),
    ("P1", "778-399-2019", "bmoinsurance@gmail.com"),
    ("P2", "778-004-0001", "tdinsurance@gmail.com"),
    ("P3", "778-030-0011", "provincialinsurance@gmail.com"),
    ("P4", "830-004-0000", "dawinsurance@gmail.com"),
    ("P5", "018-858-1048", "calgaryinsurance@gmail.com")
;