var express = require('express');
var router = express.Router();

router.get('/', (req, res) => {
    let cmd = `SELECT * FROM shippers`;
    conn.query(cmd, (err, result) => {
        if(err) throw err;
        res.json(result);
    });
});

router.post('/', (req, res) => {
    let form = req.body;
    let cmd = 'INSERT INTO shippers';
    conn.query(cmd, form, (err, result) => {
        if(err) throw err;
        res.end();
    });
});

router.put('/:id', (req, res) => {
    let id = req.params.id;
    let form = req.body;
    let cmd = 'UPDATE shippers SET ? WHERE ShipperId = ?';
    conn.query(cmd, [form, id], (err, result) => {
        if(err) throw err;
        res.end();
    });
});

router.delete('/:id', (req, res) => {
    let id = req.params.id;
    let cmd = 'DELETE FROM shippers WHERE ShipperId = ?';
    conn.query(cmd, id, (err, result) => {
        if(err) throw err;
        res.end();
    });
});

module.exports = router;