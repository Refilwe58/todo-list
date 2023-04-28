const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyparser = require('body-parser');
const app = express();
app.use(cors({"Origin": "*",
              "Credentials": "true",
        "Access-Control-Allow-Methods":'GET,PUT,POST,DELETE',
        "Access-Control-Allow-Headers": "'Access-Control-Allow-Headers: origin, Content-Type, X-Auth-Token'"}));
app.use(express.json());
app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

//middlewares
app.listen(8080, () => {
    console.log('Listening on port 8080');
});

///sql connection
const db = mysql.createConnection({
    "host": "localhost",
    "user": "root",
    "password": "",
    "database": "tododb"
});

//check connection to db
db.connect((err) => {
    if (err) throw err;
    else {
        console.log('Connected to db....');

    };
});



///ADD TASKS
app.post('/tasks', (req, res) => {

    ///query
    let sql = `INSERT INTO tasks(task_title,task_description)
    VALUES('${req.body.task_title}', '${req.body.task_description}')`;
    //run the query
    db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.send('task added');
            console.log("GOOD");
		console.log(result);

        }

    });
    console.log(req.body);

});

//get tasks
app.get('/tasks', (req, res) => {
    ///sql query
    let sql = `
            SELECT * FROM tasks `;
    //run query
    db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.status(201).send(result);
        };
    });
    //console.log(req.query
});

app.get('/tasks/:id', (req, res) => {
    ///sql query
let id=req.params.id;
    let sql = `
            SELECT * FROM tasks where id=${id} `;
    //run query
    db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.status(201).send(result);
        };
    });
    //console.log(req.query
});





app.put('/tasks/:id', (req, res) => {
    ///sql query
let id=req.params.id;
    let sql = `
            UPDATE tasks SET
            task_title = '${req.body.task_title}',
            task_description  = '${req.body.task_description }'
            WHERE id = ${id}
            `;
    //run query

    db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.status(200).send("data updated");

        }
    });
});

app.delete('/tasks/:id', (req, res) => {
let id=req.params.id;
    let sql = `
            Delete from tasks
            WHERE id = '${id}'
            `;


    db.query(sql, (err, result) => {
        if (err) throw err;
        else {
            res.status(200).send("data deleted");
		console.log("sucess");

        }
    });
})