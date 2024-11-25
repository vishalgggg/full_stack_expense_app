document.getElementById('expense-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const date = document.getElementById('date').value;
    const description = document.getElementById('description').value;
    const category = document.getElementById('category').value;
  
    await axios.post('http://localhost:3000/addExpense', { date, description, category });
    loadExpenses();
  });
  
  async function loadExpenses() {
    const response = await axios.get('http://localhost:3000/getExpenses');
    const expensesList = document.getElementById('expenses-list');
    expensesList.innerHTML = '';
    response.data.forEach(expense => {
      const expenseItem = document.createElement('div');
      expenseItem.innerHTML = `
        <p>${expense.date} - ${expense.description} - ${expense.category}</p>
        <button onclick="deleteExpense(${expense.id})">Delete</button>
        <button onclick="editExpense(${expense.id})">Edit</button>
      `;
      expensesList.appendChild(expenseItem);
    });
  }
  
  async function deleteExpense(id) {
    await axios.delete(`http://localhost:3000/deleteExpense/${id}`);
    loadExpenses();
  }
  
  async function editExpense(id) {
    const date = prompt('Enter new date');
    const description = prompt('Enter new description');
    const category = prompt('Enter new category');
    await axios.put(`http://localhost:3000/editExpense/${id}`, { date, description, category });
    loadExpenses();
  }
  
loadExpenses();