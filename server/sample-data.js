let users = [
  { user_id: 1, user_name: "John Doe", email: "john.doe@example.com" },
  { user_id: 2, user_name: "Jane Smith", email: "jane.smith@example.com" },
  { user_id: 3, user_name: "Alice Johnson", email: "alice.johnson@example.com" },
  { user_id: 4, user_name: "Bob Brown", email: "bob.brown@example.com" },
  { user_id: 5, user_name: "Charlie Davis", email: "charlie.davis@example.com" },
  { user_id: 6, user_name: "Diana Evans", email: "diana.evans@example.com" },
  { user_id: 7, user_name: "Ethan Harris", email: "ethan.harris@example.com" },
  { user_id: 8, user_name: "Fiona Lewis", email: "fiona.lewis@example.com" },
  { user_id: 9, user_name: "George Moore", email: "george.moore@example.com" },
  { user_id: 10, user_name: "Hannah Wilson", email: "hannah.wilson@example.com" },
  { user_id: 11, user_name: "Isabella Adams", email: "isabella.adams@example.com" },
  { user_id: 12, user_name: "Jack Carter", email: "jack.carter@example.com" },
  { user_id: 13, user_name: "Kylie Bennett", email: "kylie.bennett@example.com" },
  { user_id: 14, user_name: "Liam Turner", email: "liam.turner@example.com" },
  { user_id: 15, user_name: "Mia Young", email: "mia.young@example.com" },
  { user_id: 16, user_name: "Noah Scott", email: "noah.scott@example.com" },
  { user_id: 17, user_name: "Olivia Parker", email: "olivia.parker@example.com" },
  { user_id: 18, user_name: "Paul Roberts", email: "paul.roberts@example.com" },
  { user_id: 19, user_name: "Quinn Brooks", email: "quinn.brooks@example.com" },
  { user_id: 20, user_name: "Ruby Edwards", email: "ruby.edwards@example.com" },
];

let transactions = [
  { trans_id: 1, user_id: 1, amount: 50.75, isExpense: true, date: "2024-12-01", type: "Food & Drinks" },
  { trans_id: 2, user_id: 2, amount: 200.00, isExpense: true, date: "2024-12-01", type: "Shopping" },
  { trans_id: 3, user_id: 3, amount: 800.00, isExpense: true, date: "2024-12-02", type: "Housing" },
  { trans_id: 4, user_id: 1, amount: 15.00, isExpense: true, date: "2024-12-02", type: "Transportation" },
  { trans_id: 5, user_id: 4, amount: 3000.00, isExpense: false, date: "2024-12-03", type: "Income" },
  { trans_id: 6, user_id: 5, amount: 120.00, isExpense: true, date: "2024-12-03", type: "Vehicle" },
  { trans_id: 7, user_id: 2, amount: 80.50, isExpense: true, date: "2024-12-04", type: "Life & Entertainment" },
  { trans_id: 8, user_id: 3, amount: 45.75, isExpense: true, date: "2024-12-04", type: "Communication" },
  { trans_id: 9, user_id: 1, amount: 500.00, isExpense: false, date: "2024-12-05", type: "Investment" },
  { trans_id: 10, user_id: 4, amount: 35.00, isExpense: true, date: "2024-12-05", type: "Others" },
  { trans_id: 11, user_id: 3, amount: 10.00, isExpense: true, date: "2024-12-06", type: "Food & Drinks" },
  { trans_id: 12, user_id: 2, amount: 60.00, isExpense: true, date: "2024-12-06", type: "Transportation" },
  { trans_id: 13, user_id: 5, amount: 220.00, isExpense: true, date: "2024-12-07", type: "Shopping" },
  { trans_id: 14, user_id: 1, amount: 750.00, isExpense: true, date: "2024-12-07", type: "Housing" },
  { trans_id: 15, user_id: 4, amount: 100.00, isExpense: false, date: "2024-12-08", type: "Income" },
  { trans_id: 16, user_id: 5, amount: 25.00, isExpense: true, date: "2024-12-08", type: "Life & Entertainment" },
  { trans_id: 17, user_id: 2, amount: 99.99, isExpense: true, date: "2024-12-09", type: "Communication" },
  { trans_id: 18, user_id: 3, amount: 1500.00, isExpense: false, date: "2024-12-09", type: "Investment" },
  { trans_id: 19, user_id: 1, amount: 40.00, isExpense: true, date: "2024-12-10", type: "Vehicle" },
  { trans_id: 20, user_id: 4, amount: 75.25, isExpense: true, date: "2024-12-10", type: "Others" },
];

let balances = [
  { user_id: 1, amount: 500.75, lastUpdated_on: "2024-12-01" },
  { user_id: 2, amount: 1200.00, lastUpdated_on: "2024-12-02" },
  { user_id: 3, amount: 850.50, lastUpdated_on: "2024-12-03" },
  { user_id: 4, amount: 300.00, lastUpdated_on: "2024-12-04" },
  { user_id: 5, amount: 2750.25, lastUpdated_on: "2024-12-05" },
  { user_id: 6, amount: 980.00, lastUpdated_on: "2024-12-06" },
  { user_id: 7, amount: 420.50, lastUpdated_on: "2024-12-07" },
  { user_id: 8, amount: 1550.00, lastUpdated_on: "2024-12-08" },
  { user_id: 9, amount: 870.75, lastUpdated_on: "2024-12-09" },
  { user_id: 10, amount: 2300.00, lastUpdated_on: "2024-12-10" },
  { user_id: 11, amount: 1200.50, lastUpdated_on: "2024-12-01" },
  { user_id: 12, amount: 650.00, lastUpdated_on: "2024-12-02" },
  { user_id: 13, amount: 3000.00, lastUpdated_on: "2024-12-03" },
  { user_id: 14, amount: 450.25, lastUpdated_on: "2024-12-04" },
  { user_id: 15, amount: 500.75, lastUpdated_on: "2024-12-05" },
  { user_id: 16, amount: 1900.00, lastUpdated_on: "2024-12-06" },
  { user_id: 17, amount: 870.00, lastUpdated_on: "2024-12-07" },
  { user_id: 18, amount: 100.50, lastUpdated_on: "2024-12-08" },
  { user_id: 19, amount: 4000.00, lastUpdated_on: "2024-12-09" },
  { user_id: 20, amount: 750.75, lastUpdated_on: "2024-12-10" },
];

export const data = { users, transactions, balances };