const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let users = [
  {
    id: Math.random(),
    nome: 'Vinicius',
    email: 'vinicius@email.com',
    senha: '123456',
    telefones: [{ numero: '123456789', ddd: '11' }],
  },
];

const secret = 'secret';

class UserRepository {
  findAll() {
    return users;
  }

  findByEmail(email) {
    const userByEmail = users.find((user) => user.email === email);

    return userByEmail;
  }

  create({
    nome, email, senha, telefones,
  }) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(senha, salt);

    const id = Math.random();

    const token = jwt.sign({
      id,
      email,
      hash,
    }, secret, { expiresIn: '1m' });

    const newUser = {
      id,
      nome,
      email,
      senha: hash,
      telefones,
      data_criacao: new Date(),
      data_atualizacao: new Date(),
      ultimo_login: new Date(),
      token,
    };
    users.push(newUser);

    return {
      id: newUser.id,
      data_criacao: newUser.data_criacao,
      data_atualizacao: newUser.data_atualizacao,
      ultimo_login: newUser.ultimo_login,
      token: newUser.token,
    };
  }

  updateLogin(email) {
    const userExists = this.findByEmail(email);
    if (!userExists) {
      return null;
    }

    userExists.ultimo_login = new Date();
    users = users.map((user) => {
      if (userExists.id === user.id) {
        return {
          ...userExists,
        };
      }
      return user;
    });
    return userExists;
  }
}

module.exports = new UserRepository();
