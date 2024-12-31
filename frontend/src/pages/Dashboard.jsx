import { useQuery, gql } from '@apollo/client';
import React, { useState, useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Header from '../components/Header';
import Footer2 from '../components/Footer2';
import dashboardlogo from '../assets/dashboard.png';
import "../index.css";

const GET_USER_ID = gql`
  query GetUserID($email: String!){
    user(email: $email){
      user_id
    }
  }
`;

const GET_TRANSACTIONS = gql`
  query GetTransactions($user_id: ID!){
    transactionsBasedOnUser(user_id: $user_id){
      trans_id,
      amount,
      isExpense,
      date,
      type
    }
  }
`;

const GET_BALANCE = gql`
  query GetBalance($user_id: ID!){
    balancesBasedOnUser(user_id: $user_id){
      amount,
      lastUpdated_on
    }
  }
`;

const COLORS = [
  '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8', 
  '#82CA9D', '#FFA07A', '#20B2AA', '#B0C4DE', '#DDA0DD'
];

export default function Dashboard() {
  const { email } = useAuth() || {};
  const [userId, setUserId] = useState(null);
  const navigate = useNavigate();

  const { loading: userLoading, error: userError, data: userData } = useQuery(GET_USER_ID, {
    variables: { email },
    onCompleted: (data) => {
      if (data?.user?.user_id) {
        setUserId(data.user.user_id);
      }
    },
  });

  const { loading: transLoading, error: transError, data: transData } = useQuery(GET_TRANSACTIONS, {
    variables: { user_id: userId },
    skip: !userId,
  });

  const { loading: balanceLoading, error: balanceError, data: balanceData } = useQuery(GET_BALANCE, {
    variables: { user_id: userId },
    skip: !userId,
  });

  const processTransactionData = useMemo(() => {
    if (!transData?.transactionsBasedOnUser) return [];

    const typeAmount = transData.transactionsBasedOnUser.reduce((acc, transaction) => {
      acc[transaction.type] = (acc[transaction.type] || 0) + transaction.amount;
      return acc;
    }, {});

    return Object.entries(typeAmount).map(([type, amount]) => ({
      name: type,
      value: amount,
    }));
  }, [transData]);

  if (userLoading) return <p className="loading-message">Loading user data...</p>;
  if (userError) return <p className="error-message">Error loading user data.</p>;

  if (transLoading) return <p className="loading-message">Loading transactions...</p>;
  if (transError) return <p className="error-message">Error loading transactions.</p>;

  if (balanceLoading) return <p className="loading-message">Loading balance...</p>;
  if (balanceError) return <p className="error-message">Error loading balance.</p>;

  const handleNewTransacation = () => {
    navigate('/new-transaction');
  };

  return (
    <>
      <div className="dashboard-container">
        <Header />
          <div className="dashboard-content">
            <div className="balance-card">
              <div className="balance-card-1">
                <div className="dashboard-header">
                  <img src={dashboardlogo} alt="Dashboard Logo" width={40} height={40} className="dashboard-logo" />
                  <h1 className="dashboard-title">Dashboard</h1>
                </div>
                <p className="dashboard-welcome">Welcome to your dashboard!</p>
            </div>
            <div className='balance-card-outer'>
              <div className="balance-card-2">
                <h2 className="balance-title">Current Balance:</h2>
                <p className="balance-amount">${balanceData?.balancesBasedOnUser?.amount.toFixed(2) || '0.00'}</p>
              </div>
              <p className="balance-last-updated">Last updated on: {new Date(balanceData?.balancesBasedOnUser?.lastUpdated_on).toLocaleDateString()}</p>
            </div>
              
            </div>
            <div className='dashboard-cards'>
              <div className="transactions-card">
                <div className="transactions-header">
                  <h2 className="transactions-title">Last Records Overview</h2>
                </div>
                <div className="transactions-table-container">
                  <table className="transactions-table">
                    <thead>
                      <tr>
                        <th>Type</th>
                        <th>Amount</th>
                        <th>Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {transData?.transactionsBasedOnUser?.map((transaction) => (
                        <tr key={transaction.trans_id}>
                          <td>{transaction.type}</td>
                          <td className={`transaction-amount ${transaction.isExpense ? 'expense' : 'income'}`}>
                            {transaction.isExpense ? '-' : '+'}${transaction.amount.toFixed(2)}
                          </td>
                          <td className="transaction-date">{new Date(transaction.date).toLocaleDateString()}</td>
                        </tr>
                      )) || (
                        <tr>
                          <td colSpan={3} className="no-transactions">No transactions found.</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="pie-chart-card">
                <h2 className="pie-chart-title">Transaction Types Distribution</h2>
                <ResponsiveContainer width="100%" height={300} className="pie-chart-container">
                  <PieChart>
                    <Pie className='pie-chart'
                      data={processTransactionData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      outerRadius={120}
                      fill="#8884d8"
                      dataKey="value"
                      label={({ name, value, percent }) => `${name}: $${value.toFixed(2)} (${(percent * 100).toFixed(0)}%)`}
                    >
                      {processTransactionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => `$${value.toFixed(2)}`} />
                    <Legend layout="vertical" align="right" verticalAlign="middle"  />
                  </PieChart>
                </ResponsiveContainer>
              </div>
          </div>
          <div className='transaction-form'>
              <button className='transaction-button' onClick={handleNewTransacation}>Add New Transaction</button>
          </div>
          </div>
          
      </div>
      <Footer2 />
    </>
  );
}

