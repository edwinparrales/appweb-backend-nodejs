var express = require('express');
var router = express.Router();
const pool = require('../config/database');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM eventos ORDER BY fecha ASC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM eventos WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', async (req, res) => {
  try {
    const { titulo, descripcion, fecha, hora, lugar, imagen } = req.body;
    const result = await pool.query(
      'INSERT INTO eventos (titulo, descripcion, fecha, hora, lugar, imagen) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [titulo, descripcion, fecha, hora, lugar, imagen]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const { titulo, descripcion, fecha, hora, lugar, imagen } = req.body;
    const result = await pool.query(
      'UPDATE eventos SET titulo = $1, descripcion = $2, fecha = $3, hora = $4, lugar = $5, imagen = $6, updated_at = NOW() WHERE id = $7 RETURNING *',
      [titulo, descripcion, fecha, hora, lugar, imagen, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM eventos WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }
    res.json({ message: 'Evento eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
