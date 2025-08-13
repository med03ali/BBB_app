const { createPool } = require('mysql');

const pool = createPool({
    host: "localhost",
    user: "root",
    password: "Rajmoh95%",
    database: "bbb_db" // Ajout de la base de données
});

pool.getConnection((err, connection) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err);
        return;
    }

    console.log('Connecté à la base de données MySQL!');

});

module.exports= {pool};