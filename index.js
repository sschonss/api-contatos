const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const mysql = require('mysql');

//configurando body-parser para pegar os dados submetidos via POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


//definindo as rotas
const router = express.Router();
router.get('/', (req, res) => res.json({ message: 'Working!' }));
app.use('/', router);

//iniciando o servidor
app.listen(port);
console.log('Server running on port ' + port);

function execSQLQuery(sqlQry, res){
    const connection = mysql.createConnection({
        host: '192.168.1.175', //ip do banco de dados
        user: 'rec',
        password: 'rec*2021',
        database: 'dbproposta'
    });

    connection.query(sqlQry, function (error, results, fields) {
        if (error)
            res.json(error);
        else
            res.json(results);
        connection.end();
        console.log('Processing complete');
    });
}

router.get('/contato', (req, res) => {
    execSQLQuery('SELECT id, nome, telefone, email FROM tb_cliente_contato', res);
});

router.get('/contato/:nome?', (req, res) => {
    let filter = '';
    if (req.params.nome) filter = ' WHERE nome LIKE "%' + req.params.nome + '%"';
    execSQLQuery('SELECT id, nome, telefone, email FROM tb_cliente_contato' + filter, res);
    });

router.get('/cliente', (req, res) => {
    execSQLQuery('SELECT id, fantasia FROM tb_cliente', res);
});

router.get('/cliente/:fantasia?', (req, res) => {
    let filter = '';
    if (req.params.fantasia) filter = ' WHERE fantasia LIKE "%' + req.params.fantasia + '%"';
    execSQLQuery('SELECT id, fantasia FROM tb_cliente' + filter, res);
});