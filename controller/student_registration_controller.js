const db = require('../database/db'); // Adjust the path if necessary
const { validateGuestRegistration } = require('../validation/student_registration.js');

const generateNewEnrollmentNo = async () => {
  try {
    // Get the current year
    const currentYear = new Date().getFullYear();

    // Query to find the maximum enrollment number for the current year
    const [rows] = await db.query(
      `SELECT enrollmentNo FROM GuestStudent 
       WHERE enrollmentNo LIKE ? 
       ORDER BY enrollmentNo DESC 
       LIMIT 1`, 
      [`LRD${currentYear}%`]
    );

    let nextSequenceNumber;

    if (rows.length === 0) {
      // If no entries for the current year, start from 1
      nextSequenceNumber = 1;
    } else {
      // Extract the numeric part of the last enrollment number and increment it
      const lastEnrollmentNo = rows[0].enrollmentNo;
      const lastSequenceNumber = parseInt(lastEnrollmentNo.slice(7)); // Extract the number part after 'LRDYYYY'
      nextSequenceNumber = lastSequenceNumber + 1;
    }

    // Pad the sequence number to ensure it has 5 digits
    const paddedSequenceNumber = nextSequenceNumber.toString().padStart(5, "0");

    // Construct the new enrollment number
    const newEnrollmentNo = `LRD${currentYear}${paddedSequenceNumber}`;

    return newEnrollmentNo;
  } catch (error) {
    console.error("Error generating new enrollment number:", error);
    throw new Error("Error generating new enrollment number: " + error.message);
  }
};

const GuestRegistration = async (req, res) => {
  const {
    firstname,
    middlename,
    lastname,
    placeofbirth,
    dateOfBirth,
    fathername,
    fatheroccupation,
    fathernationality,
    mothername,
    motheroccupation,
    mothernationality,
    country,
    state,
    city,
    pincode,
    address,
    phone,
    whatsappno,
    email,
    gender,
    studentClass // 'class' is a reserved keyword in JavaScript, so we use 'studentClass'
  } = req.body;

  try {
    await validateGuestRegistration({
      firstname,
      middlename,
      lastname,
      placeofbirth,
      dateOfBirth,
      fathername,
      fatheroccupation,
      fathernationality,
      mothername,
      motheroccupation,
      mothernationality,
      country,
      state,
      city,
      pincode,
      address,
      phone,
      whatsappno,
      email,
      gender,
      class: studentClass
    });
  } catch (error) {
    return res.status(400).json({ message: 'Validation error', error: error.details[0].message });
  }

  try {
    // Check how many times the email has been used
    const [rows] = await db.query('SELECT COUNT(*) as emailCount FROM GuestStudent WHERE email = ?', [email]);
    const emailCount = rows[0].emailCount;
    if (emailCount >= 5) {
      return res.status(400).json({ message: 'This email has already been used the maximum number of times.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }

  try {
    // Generate enrollment number
    const enrollmentNo = await generateNewEnrollmentNo();

    // Insert new guest detail into the database
    const query = `
      INSERT INTO GuestStudent (
        firstname, middlename, lastname, placeofbirth, dateOfBirth, fathername, fatheroccupation, 
        fathernationality, mothername, motheroccupation, mothernationality, country, state, city, 
        pincode, address, phone, whatsappno, email, gender, class, enrollmentNo
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `;
    const values = [
      firstname, middlename, lastname, placeofbirth, dateOfBirth, fathername, fatheroccupation, 
      fathernationality, mothername, motheroccupation, mothernationality, country, state, city, 
      pincode, address, phone, whatsappno, email, gender, studentClass, enrollmentNo
    ];

    const [result] = await db.query(query, values);

    // Return success response
    return res.status(200).json({ message: "Registration successful", id: enrollmentNo });
  } catch (error) {
    console.error("Error registering guest:", error);
    return res.status(500).json({ message: "Server error in guest registration", error: error.message });
  }
};


module.exports = {
    generateNewEnrollmentNo,
    GuestRegistration
  };