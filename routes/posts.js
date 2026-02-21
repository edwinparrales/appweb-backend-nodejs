var express = require('express');
var router = express.Router();
const pool = require('../config/database');
const requireAuth = require('../middleware/auth');

router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts ORDER BY created_at DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM posts WHERE id = $1', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.post('/', requireAuth, async (req, res) => {
  try {
    const { titulo, contenido, imagen, categoria } = req.body;
    const result = await pool.query(
      'INSERT INTO posts (titulo, contenido, imagen, categoria) VALUES ($1, $2, $3, $4) RETURNING *',
      [titulo, contenido, imagen, categoria]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { titulo, contenido, imagen, categoria } = req.body;
    const result = await pool.query(
      'UPDATE posts SET titulo = $1, contenido = $2, imagen = $3, categoria = $4, updated_at = NOW() WHERE id = $5 RETURNING *',
      [titulo, contenido, imagen, categoria, req.params.id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const result = await pool.query('DELETE FROM posts WHERE id = $1 RETURNING *', [req.params.id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: 'Post no encontrado' });
    }
    res.json({ message: 'Post eliminado correctamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
