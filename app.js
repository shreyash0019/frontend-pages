// Variables
const balanceAmount = document.getElementById('balanceAmount');
const addExpenseBtn = document.getElementById('addExpenseBtn');
const expenseNameInput = document.getElementById('expenseName');
const expenseAmountInput = document.getElementById('expenseAmount');
const expenseDateInput = document.getElementById('expenseDate');
const expenseList = document.getElementById('expenseList');

let balance = 0;
let expenses = [];

// Update balance UI
function updateBalance() {
    balanceAmount.innerText = `$${balance.toFixed(2)}`;
}

// Add Expense
function addExpense() {
    const name = expenseNameInput.value;
    const amount = parseFloat(expenseAmountInput.value);
    const date = expenseDateInput.value;

    if (name && !isNaN(amount) && amount > 0 && date) {
        expenses.push({ name, amount, date });
        balance += amount;

        // Add expense to the list UI
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span>${name} - $${amount.toFixed(2)} on ${date}</span>
            <button class="delete-btn">X</button>
        `;
        listItem.querySelector('.delete-btn').addEventListener('click', () => deleteExpense(name, amount));

        expenseList.appendChild(listItem);

        // Clear input fields
        expenseNameInput.value = '';
        expenseAmountInput.value = '';
        expenseDateInput.value = '';

        updateBalance();
    } else {
        alert('Please fill out all fields correctly.');
    }
}

// Delete Expense
function deleteExpense(name, amount) {
    expenses = expenses.filter(expense => expense.name !== name);
    balance -= amount;
    updateBalance();

    // Remove the item from the list
    const itemToRemove = Array.from(expenseList.children).find(item => item.innerText.includes(name));
    expenseList.removeChild(itemToRemove);
}

// Event Listener
addExpenseBtn.addEventListener('click', addExpense);
