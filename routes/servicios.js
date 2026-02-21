var express = require('express');
var router = express.Router();
const pool = require('../config/database');
const requireAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM servicios WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { nombre, descripcion, precio, duracion, imagen, categoria } = req.body;
    const result = await pool.query(
      'INSERT INTO servicios (nombre, descripcion, precio, duracion, imagen, categoria) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [nombre, descripcion, precio, duracion, imagen, categoria]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { nombre, descripcion, precio, duracion, imagen, categoria } = req.body;
    const result = await pool.query(
      'UPDATE servicios SET nombre = $1, descripcion = $2, precio = $3, duracion = $4, imagen = $5, categoria = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [nombre, descripcion, precio, duracion, imagen, categoria, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM servicios WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Servicio no encontrado' });
    }
    res.json({ message: 'Servicio eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
