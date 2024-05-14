require('dotenv').config();
const mysql = require('mysql');

// Create a connection to the database
const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err.stack);
    return;
  }
  console.log('Connected to the database.');
});

// Function to add a new employee
function addEmployee(firstName, lastName, department, jobTitle, startDate, endDate, salary) {
  const query = `
    INSERT INTO ${process.env.DB_TABLE_NAME} 
    (FirstName, LastName, Department, JobTitle, StartDate, EndDate, Salary) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const values = [firstName, lastName, department, jobTitle, startDate, endDate, salary];

  connection.query(query, values, (err, results) => {
    if (err) {
      console.error('Error inserting new employee:', err.stack);
      return;
    }
    console.log('New employee added with ID:', results.insertId);
  });
}

// Example usage
addEmployee('John', 'Doe', 'Engineering', 'Software Engineer', '2023-01-01', null, 60000.00);

// Close the database connection
connection.end((err) => {
  if (err) {
    console.error('Error closing the connection:', err.stack);
    return;
  }
  console.log('Database connection closed.');
});
