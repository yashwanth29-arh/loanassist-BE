CREATE DATABASE loana9vw_loanassist_Db;

USE loana9vw_loanassist_Db;

CREATE TABLE contact_form (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Fullname VARCHAR(100),
    Contact_Number VARCHAR(100),
    Email VARCHAR(100),
    Message VARCHAR(500),
);

CREATE TABLE apply_now (
    Id INT AUTO_INCREMENT PRIMARY KEY,
    Fullname VARCHAR(100),
    Contact_Number VARCHAR(100),
    Email VARCHAR(100),
    Monthly_Salary VARCHAR(20),
    Credit_Score VARCHAR(20) NULL,
    Over_Due VARCHAR(20) NULL,
);