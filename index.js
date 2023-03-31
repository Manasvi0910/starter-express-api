const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(bodyParser.json());

// Define a GET route for the root URL
app.get('/', (req, res) => {
  res.send('Welcome to my API!');
});

// Define a POST route for the '/api' URL
app.post('/api', (req, res) => {
  try {
    // Extract data from request body
    const { data, user_id, email_id, college_roll_no } = req.body;

    // Filter even and odd numbers and uppercase alphabets
    const evenNumbers = data.filter(num => num % 2 === 0);
    const oddNumbers = data.filter(num => num % 2 !== 0);
    const alphabetList = data.filter(char => typeof char === 'string' && /[a-zA-Z]/.test(char)).map(char => char.toUpperCase());

    // Construct response
    const response = {
      status: 'success',
      is_success: true,
      user_id: `john_doe_${new Date().toLocaleDateString('en-US', { year: 'numeric', month: '2-digit', day: '2-digit' }).replace(/\//g, '')}`,
      email_id,
      college_roll_no,
      even_numbers: evenNumbers,
      odd_numbers: oddNumbers,
      alphabet_list: alphabetList
    };

    // Send response
    res.json(response);
  } catch (error) {
    // Handle exceptions gracefully
    console.error(error);
    res.status(500).json({ message: 'Internal Server Error', is_success: false });
  }
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
