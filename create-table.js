const mysql = require('mysql');
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'db_teste'
});

connection.connect(function (err) {
    if (err) return console.log(err);
    console.log('Connected to database');
    createTable(connection);
    addRows(connection);
});

function createTable(conn) {
    const sql = "CREATE TABLE IF NOT EXISTS clientes ("+
        "ID int NOT NULL AUTO_INCREMENT,"+
        "Nome varchar(150) NOT NULL,"+
        "CPF char(11) NOT NULL,"+
        "PRIMARY KEY (ID)"+
        ");";

    conn.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log('Table created');
    });
}

function addRows(conn) {
    const sql = "INSERT INTO clientes (Nome, CPF) VALUES ('João', '12345678901'), ('Maria', '12345678902'), ('José', '12345678903');";
    conn.query(sql, function (error, results, fields) {
        if (error) throw error;
        console.log('Rows added');
        conn.end()
    });
}