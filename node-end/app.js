const express = require('express');
const todos = require('./todos');
const morgan = require('morgan');

const app = express();

function log(req, res, next) {
  let date = new Date(Date.now());
  console.log(`${date} - ${req.method} - ${req.url}`)
  next();
}

app.use(morgan('dev'));

app.use(express.static(__dirname + '/public'))

app.post('/', (req, res) => {
  res.send({title: "Vlad"});
})

app.get('/todos', (req, res) => {
  if (req.query.completed) {
    return res.json(todos.filter(todo => todo.completed.toString() === req.query.completed));
  }
  res.json(todos);
})

app.get('/todos/:id', (req, res) => {
  const { id } = req.params;
  let todo = todos.find(todo => todo.id == id);
  if (!todo) return res.status(404).send("Не найдено");
  res.json(todo);
})

app.listen(5000, () => {
  console.log("Сервер работает");
})