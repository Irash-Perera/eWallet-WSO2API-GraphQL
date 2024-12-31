import { useQuery, gql, useMutation } from '@apollo/client';
import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import homeimage from '../assets/homeimage.png';

const GET_USER = gql`
  query GetUser($email: String!) {
    user(email: $email) {
      user_name,
      email,
      user_id
    }
  }
`;

const CREATE_USER = gql`
  mutation CreateUser($user: UserInput!) {
    createUser(user: $user) {
      user_name
      email,
      user_id
    }
  }
`;

// const CREATE_BALANCE = gql`
//   mutation CreateBalance($balance: BalanceInput!) {
//     createBalance(amount: $balance){
//       amount,
//       lastUpdated_on
//     }
//   }
// `;


function GetUser() {
  const { user, email } = useAuth() || {};
  const [userChecked, setUserChecked] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  // const [balanceCreated, setBalanceCreated] = useState(false);
  const navigate = useNavigate();

  const { loading: queryLoading, error: queryError, data: queryData } = useQuery(GET_USER, {
    variables: { email },
    onCompleted: () => setUserChecked(true),
  });

  const [createUser, { data: mutationData, loading: mutationLoading, error: mutationError }] = useMutation(CREATE_USER);
  // const [createBalance, { data: balanceData, loading: balanceLoading, error: balanceError }] = useMutation(CREATE_BALANCE); 

  const handleCreateUser = async () => {

    // let user_id = queryData?.user?.user_id;

    createUser({
      variables: {
        user: {
          user_name: user,
          email,
        },
      },
    });
    // user_id = mutationData?.createUser?.user_id;
    setUserCreated(true);

    // if (user_id) {
    //   createBalance({
    //     variables: {
    //       balance: {
    //         user_id,
    //         amount: 0,
    //       },
    //     },
    //   });
    //   setBalanceCreated(true);
    // }
  };

  const handleNavigate = () => {
    navigate('/dashboard');
  };

  const redirectLogin = () => {
    navigate('/login');
  }

  if (user === null) { 
    return (
      <>
        <div className='home-container'>
          <div className='home-title'>
            <div className='home-logo'>
              <img src='/wallet.png' alt='Logo' />
              <h1>eWallet</h1>
            </div>
            <h3>Empowering Your Wallet, Anytime, Anywhere.</h3>
            <button className='login-button' onClick={redirectLogin}>Try Now</button>
          </div>
          <img className="home-image" src={homeimage} alt='Home Image' />
        </div>
        
      </>
    )
  }
  if (queryLoading) return <p>Loading...</p>;
  if (queryError) return <p>Error loading user data.</p>;
  if (mutationLoading) return <p>Loading...</p>;
  if (mutationError) return <p>Error creating a new user account.</p>;
  // if (balanceLoading) return <p>Loading...</p>;
  // if (balanceError) return <p>Error creating a new balance account.</p>;

  if (queryData?.user && !mutationData) {
    return (
      <div className='login-card'>
        <div className='welcome-card-header'>
          <h3>Welcome back, {queryData.user.user_name}!</h3>
          <p>Email: {queryData.user.email}</p>
          <button className='create-user-button' onClick={handleNavigate}>Go to dashboard</button>
        </div>
        <div className='welcome-card-body'>
        </div>
      </div>
    );
  }
  else {
    return (
      <>
        {(userCreated)?
          <>
            <div className='login-card'>
              <div className='welcome-card-header'>
                <h3>User account created!</h3>
                <p>Welcome, {user}!</p>
                <button className='create-user-button' onClick={handleNavigate}>Go to dashboard</button>
              </div>
              <div className='welcome-card-body'>
              </div>
          </div>
          </>
          :
          <>
            <div className='login-card'>
              <div className='welcome-card-header'>
                <h3>New to eWallet?</h3>
                <p>Create an account here!</p>
                <button className='create-user-button' onClick={handleCreateUser}>Create User</button>
              </div>
              <div className='welcome-card-body'>
              </div>
          </div>
          </>
        }
      </>
    )
  }
}

export default GetUser;

