import { useQuery, gql } from '@apollo/client';

const USERS = gql`
  query {
    users {
      user_id,
      user_name
    }
  }
`;

function ShowUsers() {
  const { loading, error, data } = useQuery(USERS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error :(</p>;

  return data.users.map(({ user_id, user_name }) => (
    <div key={user_id}>
      <p>{user_name}</p>
    </div>
  ));
}

export default ShowUsers;