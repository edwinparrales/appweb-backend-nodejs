function requireAuth(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: 'No autorizado. Debe iniciar sesión' });
  }
  next();
}

module.exports = requireAuth;
