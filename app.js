const express = require('express');
const db = require('./database/db');
const classrouter = require('./routes/class_routes.js');
const Studentrouter = require('./routes/student_registration_routes.js');


const app = express();
app.use(express.json());

app.use("/be/Class",classrouter);
app.use('/be/Student', Studentrouter);

// Async function to test the MySQL connection
const testConnection = async () => {
  try {
    const connection = await db.getConnection(); // Get a connection from the pool
    console.log('Connected to MySQL');
    connection.release(); // Release the connection back to the pool
  } catch (err) {
    console.error('Error connecting to MySQL:', err);
  }
};

// Call the connection test function
testConnection().then(() => {
  // Only start the server if the connection test is successful
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
});
