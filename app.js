// Modern Expense Tracker JavaScript

let expenses = [];
let total = 0;

// DOM Elements
let expenseForm;
let expenseList;
let totalDisplay;
let expenseCount;
let emptyState;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', function() {
  initializeApp();
});

function initializeApp() {
  // Get DOM elements
  expenseForm = document.getElementById('expense-form');
  expenseList = document.getElementById('expense-list');
  totalDisplay = document.getElementById('total');
  expenseCount = document.getElementById('expense-count');
  emptyState = document.getElementById('empty-state');

  // Bind form submission event
  expenseForm.addEventListener('submit', handleFormSubmit);
  
  // Initial UI update
  updateUI();
}

function handleFormSubmit(e) {
  e.preventDefault();
  
  // Get form values
  const descriptionInput = document.getElementById('description');
  const amountInput = document.getElementById('amount');
  const categorySelect = document.getElementById('category');
  
  const description = descriptionInput.value.trim();
  const amount = parseFloat(amountInput.value);
  const category = categorySelect.value;
  
  // Validate inputs
  if (!description) {
    alert('Please enter a description');
    descriptionInput.focus();
    return;
  }
  
  if (!amount || amount <= 0) {
    alert('Please enter a valid amount greater than 0');
    amountInput.focus();
    return;
  }
  
  if (!category) {
    alert('Please select a category');
    categorySelect.focus();
    return;
  }
  
  // Create expense object
  const expense = {
    id: Date.now(),
    description: description,
    amount: amount,
    category: category,
    date: new Date()
  };
  
  // Add expense to array
  expenses.unshift(expense);
  total += amount;
  
  // Update UI
  updateUI();
  
  // Reset form
  expenseForm.reset();
  descriptionInput.focus();
}

function deleteExpense(id, amount) {
  // Remove expense from array
  expenses = expenses.filter(expense => expense.id !== id);
  total -= amount;
  
  // Update UI
  updateUI();
}

function updateUI() {
  updateExpenseList();
  updateTotal();
  updateExpenseCount();
  toggleEmptyState();
}

function updateExpenseList() {
  expenseList.innerHTML = '';
  
  expenses.forEach(expense => {
    const li = document.createElement('li');
    li.className = 'expense-item';
    li.setAttribute('data-expense-id', expense.id);
    
    const categoryIcon = getCategoryIcon(expense.category);
    const formattedDate = formatDate(expense.date);
    
    li.innerHTML = `
      <div class="expense-info">
        <div class="expense-icon ${expense.category.toLowerCase()}">
          ${categoryIcon}
        </div>
        <div class="expense-details">
          <div class="expense-description">${escapeHtml(expense.description)}</div>
          <div class="expense-meta">
            ${expense.category} • ${formattedDate}
          </div>
        </div>
      </div>
      <div class="expense-amount">$${expense.amount.toFixed(2)}</div>
      <button class="delete-btn" onclick="deleteExpense(${expense.id}, ${expense.amount})" type="button">
        <i class="fas fa-trash"></i>
        Delete
      </button>
    `;
    
    expenseList.appendChild(li);
  });
}

function updateTotal() {
  totalDisplay.textContent = total.toFixed(2);
}

function updateExpenseCount() {
  expenseCount.textContent = expenses.length;
}

function toggleEmptyState() {
  if (expenses.length === 0) {
    emptyState.classList.remove('hidden');
    expenseList.classList.add('hidden');
  } else {
    emptyState.classList.add('hidden');
    expenseList.classList.remove('hidden');
  }
}

function getCategoryIcon(category) {
  const icons = {
    'Food': '🍔',
    'Transport': '🚗',
    'Shopping': '🛍️',
    'Other': '📦'
  };
  return icons[category] || '📦';
}

function formatDate(date) {
  const now = new Date();
  const diffTime = Math.abs(now - date);
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  if (diffDays === 1) {
    return 'Today';
  } else if (diffDays === 2) {
    return 'Yesterday';
  } else if (diffDays <= 7) {
    return `${diffDays - 1} days ago`;
  } else {
    return date.toLocaleDateString();
  }
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

// Additional functionality for better UX
document.addEventListener('keydown', function(e) {
  // Press 'a' to focus on description input for quick add
  if (e.key === 'a' && !e.target.matches('input, textarea, select')) {
    e.preventDefault();
    const descInput = document.getElementById('description');
    if (descInput) {
      descInput.focus();
    }
  }
  
  // Press 'Escape' to clear form
  if (e.key === 'Escape' && e.target.matches('input, textarea, select')) {
    e.target.blur();
    if (expenseForm) {
      expenseForm.reset();
    }
  }
});

// Add smooth entrance animation for cards
window.addEventListener('load', function() {
  const cards = document.querySelectorAll('.card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    
    setTimeout(() => {
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100 + 100);
  });
});