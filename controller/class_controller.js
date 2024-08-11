const db = require('../database/db.js'); // Adjust the path as needed

const addClass = async (req, res, next) => {
  const { name, totalsection } = req.body;
  const query = 'INSERT INTO class (name, totalsection) VALUES (?, ?)';
  try {
    const [result] = await db.execute(query, [name, totalsection]);
    return res.status(200).json({ message: "Class saved successfully", result });
  } catch (error) {
    console.error("Error saving class:", error);
    return res.status(500).json({ message: "Server error in saving class" });
  }
};

const getClass = async (req, res, next) => {
  const query = 'SELECT name, totalsection FROM class';
  try {
    const [rows] = await db.execute(query);
    return res.json(rows);
  } catch (error) {
    console.error("Error retrieving classes:", error);
    return res.status(500).json({ message: "Server error in retrieving classes" });
  }
};

module.exports = {
  addClass,
  getClass
};