const jwt = require('jsonwebtoken');

// verifica se o usuário está autenticado com token válido
function authService(req, res, next) {
  const { authorization } = req.headers;
  // separa somente o valor do token do 'Bearer {token}'
  const token = authorization && authorization.split(' ')[1];

  if (!token) {
    return res.status(400).json({ mensagem: 'Não autorizado' });
  }

  try {
    const decodedToken = jwt.decode(token, process.env.SECRET);
    if (decodedToken.exp < Math.floor(Date.now() / 1000)) {
      return res.status(400).json({ mensagem: 'Sessão inválida.' });
    }

    next();
  } catch (error) {
    res.status(400).json({ mensagem: 'Não autorizado.' });
  }
}

module.exports = authService;
