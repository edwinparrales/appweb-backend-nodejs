var express = require('express');
var router = express.Router();
const pool = require('../config/database');
const requireAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM productos WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, categoria, stock } = req.body;
    const result = await pool.query(
      'INSERT INTO productos (nombre, descripcion, precio, imagen, categoria, stock) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, descripcion, precio, imagen, categoria, stock]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { nombre, descripcion, precio, imagen, categoria, stock } = req.body;
    const result = await pool.query(
      'UPDATE productos SET nombre = $1, descripcion = $2, precio = $3, imagen = $4, categoria = $5, stock = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [nombre, descripcion, precio, imagen, categoria, stock, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM productos WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Producto no encontrado' });
    }
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
