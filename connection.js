const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "dvbc",
  password: "posgres",
  port: 5432,
});

const getUsers = (request, response) => {
  pool.query("SELECT * FROM users ORDER BY id ASC", (error, results) => {
    if (error) {
      throw error;
    }
    response.status(200).json(results.rows);
  });
};

const registrationData = (request, response) => {
  try {
    let data = request.body;
    let queryString = `INSERT INTO users (firstname,lastname,jmbg,city,role_id,password,email) VALUES('${data.firstName}', '${data.lastName}', '${data.jmbg}', '${data.city}', ${data.role}, '${data.password}','${data.email}')`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(true);
    });
  } catch (e) {
    console.log(e);
    response.end(error.message);
  }
};

const loginMethod = (request, response) => {
  try {
    let data = request.body;
    let queryString = `SELECT * FROM users where email = '${data.email}' and password = '${data.password}'`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(results.rows);
    });
  } catch (e) {
    console.log(e);
    response.end(error.message);
  }
};

const createDiplomaRequest = (request, response) => {
  try {
    let data = request.body;
    let queryString = `INSERT INTO diplomarequest (user_id,isFinished) VALUES('${data.userId}', false)`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(true);
    });
  } catch (e) {
    console.log(e);
    response.end(error.message);
  }
};

const verifyRequest = (request, response) => {
  try {
    let data = request.body;
    let queryString = `SELECT * FROM diplomarequest where user_id = '${data.userId}' and isFinished = false`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(results.rows);
    });
  } catch (e) {
    console.log(e);
    response.end(error.message);
  }
};

const selectAllRequests = (request, response) => {
  try {
    let queryString = `SELECT *, d.id as diploma_id FROM diplomarequest d inner join users u on d.user_id = u.id where d.isFinished = false`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(results.rows);
    });
  } catch (e) {
    response.end(error.message);
  }
};

const saveStudentDiploma = (request, response) => {
  try {
    let data = request.body;
    let file = data.file;
    let queryString = `UPDATE diplomarequest  SET file = '${file}',file_name = '${data.file_name}', extension = 'pdf', isFinished = true where id = ${data.id}`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(true);
    });
  } catch (e) {
    response.end(error.message);
  }
};

const getDiploma = (request, response) => {
  try {
    let data = request.body;
    let queryString = `SELECT * FROM diplomarequest where id = '${data.id}'`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      let buf = Buffer.from(new Uint8Array(results.rows[0].file));
      let buffString = "[" + buf.toString() + "]";
      let content = JSON.parse(buffString);
      let finalJson = { content: content, fileName: results.rows[0].file_name };
      response.status(200).json(finalJson);
    });
  } catch (e) {
    console.log(e);
    response.end(error.message);
  }
};

const selectUserRequest = (request, response) => {
  try {
    let data = request.body;
    let queryString = `SELECT *, d.id as diploma_id FROM diplomarequest d inner join users u on d.user_id = u.id where user_id = '${data.userId}' and isFinished = true`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(results.rows);
    });
  } catch (e) {
    response.end(error.message);
  }
};

const selectVerifiedDiplome = (request, response) => {
  try {
    let data = request.body;
    let queryString = `SELECT d.hash, d.diploma_id,r.user_id, u.firstname, u.lastname, u.jmbg, u.city, u.email
    FROM diplomaverification d INNER join diplomarequest r 
    on d.diploma_id = r.id INNER JOIN users u on u.id = r.user_id  where d.isVerified = true and u.id =  '${data.userId}'`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(results.rows);
    });
  } catch (e) {
    response.end(error.message);
  }
};

const retrieveAllDiplomes = (request, response) => {
  try {
    let data = request.body;
    let queryString = `SELECT id,file_name FROM diplomarequest where user_id = '${data.userId}' and isFinished = true`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(results.rows);
    });
  } catch (e) {
    response.end(error.message);
  }
};

const createVerification = (request, response) => {
  try {
    let data = request.body;
    let queryString = `INSERT INTO diplomaverification (diploma_id,isVerified) VALUES(${data.diplome}, false)`;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(true);
    });
  } catch (e) {
    console.log(e);
    response.end(error.message);
  }
};

const selectAllVerificationRequests = (request, response) => {
  try {
    let queryString = `SELECT d.id, d.diploma_id,r.user_id, u.firstname, u.lastname, u.jmbg, u.city, u.email
    FROM diplomaverification d INNER join diplomarequest r 
    on d.diploma_id = r.id INNER JOIN users u on u.id = r.user_id  where d.isVerified = false `;
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(results.rows);
    });
  } catch (e) {
    response.end(error.message);
  }
};

const createVerificationHash = (request, response) => {
  try {
    let data = request.body;
    let queryString = `UPDATE diplomaverification SET hash = '${data.hash}', isVerified = true where id = ${data.id} `;
    console.log(queryString);
    pool.query(queryString, (error, results) => {
      if (error) {
        response.end(error.message);
        return false;
      }
      response.status(200).json(true);
    });
  } catch (e) {
    console.log(e);
    response.end(error.message);
  }
};

module.exports = {
  getUsers,
  registrationData,
  loginMethod,
  createDiplomaRequest,
  verifyRequest,
  selectAllRequests,
  saveStudentDiploma,
  getDiploma,
  selectUserRequest,
  retrieveAllDiplomes,
  createVerification,
  selectAllVerificationRequests,
  createVerificationHash,
  selectVerifiedDiplome,
};
