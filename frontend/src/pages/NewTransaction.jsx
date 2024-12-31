import React from 'react';
import { useQuery, gql, useMutation } from '@apollo/client';
import Footer from '../components/Footer';
import Header from '../components/Header';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import "../index.css";


const FETCH_USER_ID = gql`
  query GetUserID($email: String!){
    user(email: $email){
      user_id
    }
  }
`
const CREATE_TRANSACTION = gql`
  mutation CreateTransaction($transaction: TransactionInput!){
    createTransaction(transaction: $transaction){
      amount,
      type
    }
  }
`

function NewTransaction() {

  const { email } = useAuth() || {};

  const { loading: loadingUserID, error: errorUserID, data: dataUserID } = useQuery(FETCH_USER_ID, {
    variables: { email }
  });

  console.log(dataUserID.user.user_id);

  const [createTransaction, { loading: loadingCreateTransaction, error: errorCreateTransaction }] = useMutation(CREATE_TRANSACTION);

  const navigate = useNavigate();

  const handleSubmit = (e) => {

    e.preventDefault();
    const formdata = new FormData(e.target);
    const amount = parseFloat(formdata.get('amount'));
    const type = formdata.get('category');
    const date = formdata.get('date');
    const isExpense = formdata.get('type') === 'expense';

    const transactionData = {
      amount,
      type,
      date,
      isExpense
    };

    console.log(transactionData);

    createTransaction({
      variables: {
        transaction: {
          user_id: dataUserID.user.user_id,
          amount: transactionData.amount,
          isExpense: transactionData.isExpense,
          date: transactionData.date,
          type: transactionData.type
        }
      }
    });

    e.target.reset();

    console.log(transactionData);
  }

  if (loadingUserID) return <p>Loading...</p>;
  if (errorUserID) return <p>Error: {errorUserID.message}</p>;
  if (loadingCreateTransaction) return <p>Loading...</p>;
  if (errorCreateTransaction) return <p>Error: {errorCreateTransaction.message}</p>;

  const handleNaviage = () => {
    navigate('/dashboard');
    window.location.reload();
  };

  return (
    <>
      <Header />
      <div className='form-container'>
        
      <div className="login-card">
          <div className="login-card-header">
          <div className="logo">
              <img src="/wallet.png" alt="Logo" />
              <h2>eWallet</h2>
          </div>
            <h3 className='slogan'>Empowering Your Wallet, Anytime, Anywhere.</h3>
            
            <h1>Add Your New Transaction</h1>
            <button onClick={handleNaviage}>Back to Dashboard</button>
          </div>
          <div className='form-card-form'>
            <form  className="form-form" onSubmit={handleSubmit}>
              <label for="amount">Amount:</label><br />
              <input type="text" id="amount" name="amount" /><br />
              <label for="type">Type:</label><br />
              <select id="type" name="type">
                <option value="income">Income</option>
                <option value="expense">Expense</option>
              </select><br />
              <label for="date">Date:</label><br />
              <input type="date" id="date" name="date" /><br />
              <label for="category">Category:</label><br />
              <select id="category" name="category">
                <option value="Food & Drinks">Food & Drinks</option>
                <option value="Transport">Transport</option>
                <option value="Shopping">Shopping</option>
                <option value="Life & Entertainment">Life & Entertainment</option>
                <option value="Housing">Housing</option>
                <option value="Vehicle">Vehicle</option>
                <option value="Communication">Communication</option>
                <option value="Income">Income</option>
                <option value="Investment">Investment</option>
                <option value="others">Others</option>
              </select><br />
              <input type="submit" value="Submit" />
            </form>
          </div>
        <div className="form-card-body">
        </div>  
        </div>

      </div>
      <Footer />
    </>
  )
} 

export default NewTransaction;