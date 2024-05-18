const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
  host: '127.0.0.1',
  user: 'root',
  password: 'Root1234',
  database: 'movieTheater',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
      throw err;
  }
  console.log('Connected to MySQL');
});

// Routes for CRUD operations on Auditorium
  app.get('/auditorium', (req, res) => {
    const query = 'SELECT * FROM Auditorium';
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching auditoriums', query });
      } else {
        // Set the 'Query-Executed' header before sending the response
        res.header('Query-Executed', query);
        res.json(results);
      }
    });
  });
  
app.post('/auditorium', (req, res) => {
  const { numberOfAllSeats } = req.body;
  const query = 'INSERT INTO Auditorium (numberOfAllSeats) VALUES (?)';

  connection.query(query, [numberOfAllSeats], (error, results) => {
    if (error) {
      res.status(500).json({ message: 'Error adding auditorium', query });
    } else {
      res.json({ message: 'Auditorium added successfully', id: results.insertId, query });
    }
  });
});

app.put('/auditorium/:auditoriumId', (req, res) => {
  const { numberOfAllSeats } = req.body;
  const { auditoriumId } = req.params;
  const query = 'UPDATE Auditorium SET numberOfAllSeats = ? WHERE auditoriumId = ?';

  connection.query(query, [numberOfAllSeats, auditoriumId], (error) => {
    if (error) {
      res.status(500).json({ message: 'Error updating auditorium', query });
    } else {
      res.json({ message: 'Auditorium updated successfully', query });
    }
  });
});

app.delete('/auditorium/:auditoriumId', (req, res) => {
  const { auditoriumId } = req.params;
  const query = 'DELETE FROM Auditorium WHERE auditoriumId = ?';

  connection.query(query, [auditoriumId], (error) => {
    if (error) {
      res.status(500).json({ message: 'Error deleting auditorium', query });
    } else {
      res.json({ message: 'Auditorium deleted successfully', query });
    }
  });
});


app.get('/customer', (req, res) => {
    const query = 'SELECT * FROM Customer';
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching customers', query });
      } else {
        res.json(results);
      }
    });
  });
  
  app.post('/customer', (req, res) => {
    const { name, email, password } = req.body;
    const query = 'INSERT INTO Customer (name, email, password) VALUES (?, ?, ?)';
  
    connection.query(query, [name, email, md5(password)], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error adding customer', query });
      } else {
        res.json({ message: 'Customer added successfully', id: results.insertId, query });
      }
    });
  });
  
// Update and Delete routes for Customer
app.put('/customer/:customerId', (req, res) => {
    const { name, email, password } = req.body;
    const customerId = req.params.customerId;
    const query = 'UPDATE Customer SET name=?, email=?, password=? WHERE customerId=?';
  
    connection.query(query, [name, email, password, customerId], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error updating customer', query });
      } else {
        res.json({ message: 'Customer updated successfully', query });
      }
    });
  });
  
  app.delete('/customer/:customerId', (req, res) => {
    const customerId = req.params.customerId;
    const query = 'DELETE FROM Customer WHERE customerId=?';
  
    connection.query(query, [customerId], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error deleting customer', query });
      } else {
        res.json({ message: 'Customer deleted successfully', query });
      }
    });
  });

  
// Routes for CRUD operations on Movie
app.get('/movie', (req, res) => {
    const query = 'SELECT * FROM Movie';
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching movies', query });
      } else {
        res.json(results);
      }
    });
  });
  
  app.post('/movie', (req, res) => {
    const { title, description, length } = req.body;
    const query = 'INSERT INTO Movie (title, description, length) VALUES (?, ?, ?)';
  
    connection.query(query, [title, description, length], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error adding movie', query });
      } else {
        res.json({ message: 'Movie added successfully', id: results.insertId, query });
      }
    });
  });
  
  // Routes for CRUD operations on Reservation
  app.get('/reservation', (req, res) => {
    const query = 'SELECT * FROM Reservation';
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching reservations', query });
      } else {
        res.json(results);
      }
    });
  });
  
  app.post('/reservation', (req, res) => {
    const { customerId, screeningSessionId } = req.body;
    const query = 'INSERT INTO Reservation (customerId, screeningSessionId) VALUES (?, ?)';
  
    connection.query(query, [customerId, screeningSessionId], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error adding reservation', query });
      } else {
        res.json({ message: 'Reservation added successfully', id: results.insertId, query });
      }
    });
  });
  
  // Routes for CRUD operations on ScreeningData
  app.get('/screeningData', (req, res) => {
    const query = 'SELECT * FROM ScreeningData';
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching screening data', query });
      } else {
        res.json(results);
      }
    });
  });
  
  app.post('/screeningData', (req, res) => {
    const { movieId, roomId, weekDay, startTime, duration } = req.body;
    const query = 'INSERT INTO ScreeningData (movieId, roomId, weekDay, startTime, duration) VALUES (?, ?, ?, ?, ?)';
  
    connection.query(query, [movieId, roomId, weekDay, startTime, duration], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error adding screening data', query });
      } else {
        res.json({ message: 'ScreeningData added successfully', id: results.insertId, query });
      }
    });
  });
  
  // Routes for CRUD operations on Seat
  app.get('/seat', (req, res) => {
    const query = 'SELECT * FROM Seat';
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching seats', query });
      } else {
        res.json(results);
      }
    });
  });
  
  app.post('/seat', (req, res) => {
    const { auditoriumId, seatNumber, rowNumber } = req.body;
    const query = 'INSERT INTO Seat (auditoriumId, seatNumber, rowNumber) VALUES (?, ?, ?)';
  
    connection.query(query, [auditoriumId, seatNumber, rowNumber], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error adding seat', query });
      } else {
        res.json({ message: 'Seat added successfully', id: results.insertId, query });
      }
    });
  });
  
  // Routes for CRUD operations on SnackMenu
  app.get('/snackMenu', (req, res) => {
    const query = 'SELECT * FROM SnackMenu';
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching snack menu items', query });
      } else {
        res.json(results);
      }
    });
  });
  
  app.post('/snackMenu', (req, res) => {
    const { name, price, available } = req.body;
    const query = 'INSERT INTO SnackMenu (name, price, available) VALUES (?, ?, ?)';
  
    connection.query(query, [name, price, available], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error adding snack menu item', query });
      } else {
        res.json({ message: 'SnackMenu added successfully', id: results.insertId, query });
      }
    });
  });
  
  // Routes for CRUD operations on SnackOrder
  app.get('/snackOrder', (req, res) => {
    const query = 'SELECT * FROM SnackOrder';
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching snack orders', query });
      } else {
        res.json(results);
      }
    });
  });
  
  app.post('/snackOrder', (req, res) => {
    const { customerId, totalCost } = req.body;
    const query = 'INSERT INTO SnackOrder (customerId, totalCost) VALUES (?, ?)';
  
    connection.query(query, [customerId, totalCost], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error adding snack order', query });
      } else {
        res.json({ message: 'SnackOrder added successfully', id: results.insertId, query });
      }
    });
  });
  
  // Routes for CRUD operations on SnackOrderItem
  app.get('/snackOrderItem', (req, res) => {
    const query = 'SELECT * FROM SnackOrderItem';
    connection.query(query, (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error fetching snack order items', query });
      } else {
        res.json(results);
      }
    });
  });
  
  app.post('/snackOrderItem', (req, res) => {
    const { snackOrderId, snackItemId, quantity } = req.body;
    const query = 'INSERT INTO SnackOrderItem (snackOrderId, snackItemId, quantity) VALUES (?, ?, ?)';
  
    connection.query(query, [snackOrderId, snackItemId, quantity], (error, results) => {
      if (error) {
        res.status(500).json({ message: 'Error adding snack order item', query });
      } else {
        res.json({ message: 'SnackOrderItem added successfully', id: results.insertId, query });
      }
    });
  });
    
    
  app.put('/snackOrderItem/:snackOrderId', (req, res) => {
    const { snackItemId, quantity } = req.body;
    const { snackOrderId } = req.params;
  
    // Check if snackOrderId and snackItemId exist before updating a snack order item
    connection.query('SELECT * FROM SnackOrder WHERE snackOrderId = ?', [snackOrderId], (orderError, orderResults) => {
      if (orderError) throw orderError;
  
      connection.query('SELECT * FROM SnackMenu WHERE snackItemId = ?', [snackItemId], (itemError, itemResults) => {
        if (itemError) throw itemError;
  
        if (orderResults.length === 0 || itemResults.length === 0) {
          res.status(400).json({ message: 'Invalid snackOrderId or snackItemId' });
        } else {
          connection.query('UPDATE SnackOrderItem SET snackItemId = ?, quantity = ? WHERE snackOrderId = ?', [snackItemId, quantity, snackOrderId], (updateError) => {
            if (updateError) throw updateError;
            res.json({ message: 'SnackOrderItem updated successfully' });
          });
        }
      });
    });
  });
    
  app.delete('/snackOrderItem/:snackOrderId', (req, res) => {
    const { snackOrderId } = req.params;
    connection.query('DELETE FROM SnackOrderItem WHERE snackOrderId = ?', [snackOrderId], (error) => {
      if (error) throw error;
      res.json({ message: 'SnackOrderItem deleted successfully' });
    });
  });

  // Routes for CRUD operations on SnackMenu
app.get('/snackMenu', (req, res) => {
    connection.query('SELECT * FROM SnackMenu', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  app.post('/snackMenu', (req, res) => {
    const { name, price, available } = req.body;
    connection.query('INSERT INTO SnackMenu (name, price, available) VALUES (?, ?, ?)', [name, price, available], (error, results) => {
      if (error) throw error;
      res.json({ message: 'SnackMenu added successfully', id: results.insertId });
    });
  });
  
  app.put('/snackMenu/:snackItemId', (req, res) => {
    const { name, price, available } = req.body;
    const { snackItemId } = req.params;
    connection.query('UPDATE SnackMenu SET name = ?, price = ?, available = ? WHERE snackItemId = ?', [name, price, available, snackItemId], (error) => {
      if (error) throw error;
      res.json({ message: 'SnackMenu updated successfully' });
    });
  });
  
  app.delete('/snackMenu/:snackItemId', (req, res) => {
    const { snackItemId } = req.params;
    connection.query('DELETE FROM SnackMenu WHERE snackItemId = ?', [snackItemId], (error) => {
      if (error) throw error;
      res.json({ message: 'SnackMenu deleted successfully' });
    });
  });
  
  // Routes for CRUD operations on SnackOrder
  app.get('/snackOrder', (req, res) => {
    connection.query('SELECT * FROM SnackOrder', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  app.post('/snackOrder', (req, res) => {
    const { customerId, totalCost } = req.body;
    connection.query('INSERT INTO SnackOrder (customerId, totalCost) VALUES (?, ?)', [customerId, totalCost], (error, results) => {
      if (error) throw error;
      res.json({ message: 'SnackOrder added successfully', id: results.insertId });
    });
  });
  
  app.put('/snackOrder/:snackOrderId', (req, res) => {
    const { customerId, totalCost } = req.body;
    const { snackOrderId } = req.params;
    connection.query('UPDATE SnackOrder SET customerId = ?, totalCost = ? WHERE snackOrderId = ?', [customerId, totalCost, snackOrderId], (error) => {
      if (error) throw error;
      res.json({ message: 'SnackOrder updated successfully' });
    });
  });
  
  app.delete('/snackOrder/:snackOrderId', (req, res) => {
    const { snackOrderId } = req.params;
    connection.query('DELETE FROM SnackOrder WHERE snackOrderId = ?', [snackOrderId], (error) => {
      if (error) throw error;
      res.json({ message: 'SnackOrder deleted successfully' });
    });
  });
  
  // Routes for CRUD operations on SnackOrderItem
  app.get('/snackOrderItem', (req, res) => {
    connection.query('SELECT * FROM SnackOrderItem', (error, results) => {
      if (error) throw error;
      res.json(results);
    });
  });
  
  app.post('/snackOrderItem', (req, res) => {
    const { snackOrderId, snackItemId, quantity } = req.body;
    connection.query('INSERT INTO SnackOrderItem (snackOrderId, snackItemId, quantity) VALUES (?, ?, ?)', [snackOrderId, snackItemId, quantity], (error, results) => {
      if (error) throw error;
      res.json({ message: 'SnackOrderItem added successfully', id: results.insertId });
    });
  });
  
  app.put('/snackOrderItem/:snackOrderId', (req, res) => {
    const { snackItemId, quantity } = req.body;
    const { snackOrderId } = req.params;
    connection.query('UPDATE SnackOrderItem SET snackItemId = ?, quantity = ? WHERE snackOrderId = ?', [snackItemId, quantity, snackOrderId], (error) => {
      if (error) throw error;
      res.json({ message: 'SnackOrderItem updated successfully' });
    });
  });
  
  app.delete('/snackOrderItem/:snackOrderId', (req, res) => {
    const { snackOrderId } = req.params;
    connection.query('DELETE FROM SnackOrderItem WHERE snackOrderId = ?', [snackOrderId], (error) => {
      if (error) throw error;
      res.json({ message: 'SnackOrderItem deleted successfully' });
    });
  });
  



app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
