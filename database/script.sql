-- Create the database
CREATE DATABASE IF NOT EXISTS lrdbackend;

-- Use the database
USE lrdbackend;

-- Create the table
CREATE TABLE IF NOT EXISTS class (
    name VARCHAR(255) NOT NULL,
    totalsection INT NOT NULL
);

-- Insert sample data
INSERT INTO your_table_name (name, Totalsection) VALUES 
('V', 3),
('VI', 4);

--for creating gueststudent table
CREATE TABLE GuestStudent (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(255) NOT NULL,
    middlename VARCHAR(255),
    lastname VARCHAR(255) NOT NULL,
    placeofbirth VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    fathername VARCHAR(255) NOT NULL,
    fatheroccupation VARCHAR(255) NOT NULL,
    fathernationality VARCHAR(255) NOT NULL,
    mothername VARCHAR(255) NOT NULL,
    motheroccupation VARCHAR(255) NOT NULL,
    mothernationality VARCHAR(255) NOT NULL,
    country VARCHAR(255) NOT NULL,
    state VARCHAR(255) NOT NULL,
    city VARCHAR(255) NOT NULL,
    pincode VARCHAR(20) NOT NULL,
    address TEXT NOT NULL,
    phone VARCHAR(20) NOT NULL,
    whatsappno VARCHAR(20),
    email VARCHAR(255) NOT NULL,
    gender VARCHAR(10) NOT NULL,
    class VARCHAR(50) NOT NULL,
    enrollmentNo VARCHAR(50) NOT NULL
);
ALTER TABLE GuestStudent ADD COLUMN registrationTime DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP;
