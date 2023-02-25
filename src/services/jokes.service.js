const { conn } = require("../db.connection");

const getJokes = () => {
  return new Promise((resolve, reject) => {
    conn.query(`select * from jokes`, (err, results) => {
      if (err) {
        reject(err);
      }

      resolve(results);
    });
  });
};

const jokeExists = (id) => {
  return new Promise((resolve, reject) => {
    conn.query(
      `select count(id) as c from jokes where id=${id}`,
      (err, results) => {
        if (err) {
          reject(err);
        }

        resolve(results[0]?.c === 1);
      }
    );
  });
};

const voteJoke = (id, voteType) => {
  return new Promise((resolve, reject) => {
    let voteField =
      voteType === "positive" ? "positive_votes" : "negative_votes";

    conn.query(
      `
        update jokes as j 
	    inner join (
		    select jokes.${voteField} as c, jokes.id as id
		    from jokes
	    ) as j2 on j.id = j2.id
        set j.${voteField} = j2.c + 1
        where j.id = ${id}
        `,
      (err, results) => {
        if (err) {
          reject(err);
        }

        resolve({ success: results.changedRows === 1 });
      }
    );
  });
};

module.exports = { getJokes, jokeExists, voteJoke };
