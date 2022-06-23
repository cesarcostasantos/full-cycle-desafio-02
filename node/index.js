const express = require('express')
const mysql = require('mysql')
const app = express()
const port = 3000
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

const connection = mysql.createConnection(config)
  
const criarTabela  = `CREATE TABLE IF NOT EXISTS nodedb.pessoas (id INT AUTO_INCREMENT PRIMARY KEY, nome VARCHAR(255) NOT NULL, idade INT);`

connection.query(criarTabela);

app.get('/', async (req,res) => {
 

    const sql = `INSERT INTO pessoas(nome, idade) values('Cesar','10')`

    connection.query(sql)

    let tabela = '<table><thead><tr><th>Id</th><th>Nome</th><th>Idade</th></tr></thead><tbody>';

    const query_sql = `SELECT id, nome, idade FROM pessoas`;

    connection.query(query_sql, (error, results, fields) => {
        if (error) {
            throw error
        };

        for(let item of results) {  
            tabela += `<tr><td>${item.id}</td><td>${item.nome}</td><td>${item.idade}</td></tr>`;
        };


        tabela += '</tbody></table>';

        res.send('<h1>Full Cycle Rocks! </h1><br/>'+ tabela)
    });

    connection.end()
    
})

app.listen(port, () => {
    console.log('Rodando na porta '+port)
})