const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../../database');

class UserRepository {
  async findByEmail(email) {
    const [row] = await db.query('SELECT * FROM users WHERE email = $1', [email]);

    return row;
  }

  async findById(id) {
    try {
      const [row] = await db.query('SELECT * FROM users WHERE id = $1', [id]);

      return row;
    } catch (error) {
      return null;
    }
  }

  async create({
    nome, email, senha, telefones,
  }) {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(senha, salt);

    const data_criacao = new Date();
    const data_atualizacao = new Date();
    const ultimo_login = new Date();

    const [row] = await db.query(`
      INSERT INTO users(nome, email, senha, telefones, data_criacao, data_atualizacao, ultimo_login)
      VALUES($1, $2, $3, $4, $5, $6, $7)
      RETURNING *
    `, [nome, email, hash, telefones, data_criacao, data_atualizacao, ultimo_login]);

    const token = jwt.sign({
      id: row.id,
    }, process.env.SECRET, { expiresIn: '1m' });

    return {
      id: row.id,
      data_criacao: row.data_criacao,
      data_atualizacao: row.data_atualizacao,
      ultimo_login: row.ultimo_login,
      token,
    };
  }

  async updateLogin(email) {
    const row = await this.findByEmail(email);
    if (!row) {
      return null;
    }
    const ultimo_login = new Date();

    const [updatedUser] = await db.query(`
      UPDATE users
      SET ultimo_login = $1
      WHERE id = $2
      RETURNING *
    `, [ultimo_login, row.id]);

    return updatedUser;
  }
}

module.exports = new UserRepository();
