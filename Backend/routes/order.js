var express = require('express');
const conn = require('../connection/connect');
var router = express.Router();

router.get('/', (req, res) => {
    let cmd = 
    `SELECT * FROM orders o 
     INNERJOIN shippers s ON o.Shipper = s.ShipperId
     INNERJOIN customers c ON o.Customer = c.CustomerId
     INNERJOIN employees e ON o.Employee = e.EmployeeId`;
    conn.query(cmd, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});


router.get('/shiplist', (req, res) => {
    let cmd = 'SELECT * FROM shippers';
    conn.query(cmd, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});
router.get('/custlist', (req, res) => {
    let cmd = 'SELECT * FROM customers';
    conn.query(cmd, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});
router.get('/emplist', (req, res) => {
    let cmd = 'SELECT * FROM employees';
    conn.query(cmd, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});


router.post('/', (req, res) => {
    let form = req.body;
    let cmd = 'INSERT INTO orders';
    conn.query(cmd, form, (err, result) => {
        if(err) throw err;
        res.end();
    });
})

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let form = req.body;
    let cmd = 'UPDATE orders SET ? WHERE OrderId = ?';
    conn.query(cmd, [form, id], (err, result) => {
        if(err) throw err;
        res.end();
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let cmd = 'DELETE FROM orders WHERE OrderId = ?';
    conn.query(cmd, id, (err, result) => {
        if(err) throw err;
        res.end();
    });
});

module.exports = router;