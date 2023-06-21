var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    let cmd = 
    `SELECT * FROM products p 
     INNER JOIN categories c ON p.Category = c.CategoryId
     INNER JOIN suppliers s ON p.Supplier = s.SupplierId`;
    conn.query(cmd, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});


router.get('/catlist', (req, res) => {
    let cmd = 'SELECT * FROM categories';
    conn.query(cmd, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});
router.get('/suplist', (req, res) => {
    let cmd = 'SELECT * FROM suppliers';
    conn.query(cmd, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});



router.post('/', (req, res) => {
    let form = req.body;
    let cmd = 'INSERT INTO products SET ?';
    conn.query(cmd, form, (err, result) => {
        if(err) throw err;
        res.json(result.insertId);
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let form = req.body;
    let cmd = 'UPDATE products SET ? WHERE ProductId = ?';
    conn.query(cmd, [form, id], (err, result) => {
        if(err) throw err;
        res.end();
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let cmd = 'DELETE FROM products WHERE ProductId = ?';
    conn.query(cmd, id, (err, result) => {
        if(err) throw err;
        res.end();
    });
});

module.exports = router;