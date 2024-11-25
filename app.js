const express = require('express');
const cors = require('cors');
const { Sequelize, DataTypes } = require('sequelize');
const app = express();
const sequelize = new Sequelize('expense_track', 'root', '', {
    dialect: 'mysql',
    host: 'localhost'
  });
// const sequelize = new Sequelize('mysql://user:pass@localhost:3306/expenses_db');
// app.use(cors({origin:'http://localhost:3000/addExpense'}))
// app.use(cors({origin:'http://localhost:3000/getExpenses'}))
app.use(cors());

app.use(express.json());

const Expense = sequelize.define('Expense', {                     
  date: {
    type: DataTypes.DATE,
    allowNull: false
  },
  description: {
    type: DataTypes.STRING,
    allowNull: false
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

sequelize.sync();
const addExpense = async (req, res) => {
  try {
    const { date, description, category } = req.body;
    const expense = await Expense.create({ date, description, category });
    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getExpenses = async (req, res) => {
  try {
    const expenses = await Expense.findAll();
    res.status(200).json(expenses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;
    await Expense.destroy({ where: { id } });
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const editExpense = async (req, res) => {
  try {
    const { id } = req.params;
    const { date, description, category } = req.body;
    await Expense.update({ date, description, category }, { where: { id } });
    res.status(200).json({ message: 'Expense updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};app.post('/addExpense', addExpense);
app.get('/getExpenses', getExpenses);
app.delete('/deleteExpense/:id', deleteExpense);
app.put('/editExpense/:id', editExpense);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

