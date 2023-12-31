const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const UserRepository = require('../repositories/UserRepository');

class UserController {
  // buscar informações do usuário quando ele estiver logado
  async show(req, res) {
    const { id } = req.params;

    const user = await UserRepository.findById(id);

    if (!user) {
      return res.status(400).json({ mensagem: 'Usuário não encotrado' });
    }

    return res.json(user);
  }

  // criação de usuário (sign up)
  async store(req, res) {
    const {
      nome, email, senha, telefones,
    } = req.body;

    if (!nome) return res.status(400).json({ mensagem: 'Nome é obrigatório.' });
    if (!email) return res.status(400).json({ mensagem: 'Email é obrigatório.' });
    if (!senha) return res.status(400).json({ mensagem: 'Senha é obrigatória.' });
    if (!telefones || telefones.length === 0) return res.status(400).json({ mensagem: 'Pelo menos um telefone deve ser adicionado.' });

    const userExists = await UserRepository.findByEmail(email);

    if (userExists) {
      return res.status(400).json({ mensagem: 'E-mail já existente.' });
    }

    const user = await UserRepository.create({
      nome,
      email,
      senha,
      telefones,
    });

    res.json(user);
  }

  // autenticar o usuário e fazer login (sign in)
  async auth(req, res) {
    const { email, senha } = req.body;

    if (!email) return res.status(400).json({ mensagem: 'Email é obrigatório.' });
    if (!senha) return res.status(400).json({ mensagem: 'Senha é obrigatória.' });

    const user = await UserRepository.findByEmail(email);

    if (!user) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos.' });
    }

    const checkPassword = await bcrypt.compare(senha, user.senha);

    if (!checkPassword) {
      return res.status(401).json({ mensagem: 'Usuário e/ou senha inválidos.' });
    }

    const token = jwt.sign({
      id: user.id,
    }, process.env.SECRET, { expiresIn: '30m' });

    const updatedUser = await UserRepository.updateLogin(email);
    if (!updatedUser) {
      return res.status(400).json({ mensagem: 'Usuário e/ou senha inválidos.' });
    }
    res.json({
      id: updatedUser.id,
      data_criacao: updatedUser.data_criacao,
      data_atualizacao: updatedUser.data_atualizacao,
      ultimo_login: updatedUser.ultimo_login,
      token,
    });
  }
}

module.exports = new UserController();
