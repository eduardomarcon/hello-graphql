import React, { useEffect } from "react";
import { useLazyQuery, useMutation } from "@apollo/react-hooks";
import { gql } from "apollo-boost";
import HomeButton from "./HomeButton";
import AddUserButton from "./AddUserButton";
import Button from "react-bootstrap/Button";

const LIST_USERS = gql`
  {
    users {
      id
      name
      email
    }
  }
`;
const DELETE_USER = gql`
  mutation DeleteUser($id: ID!) {
    deleteUser(id: $id) {
      id
    }
  }
`;

function ListUsers() {
  const [loadUser, { called, loading, data }] = useLazyQuery(LIST_USERS);
  const [deleteUser] = useMutation(DELETE_USER);

  useEffect(() => {
    loadUser();
  }, [loadUser]);

  const renderUserList = () => {
    if (called && loading) return <p>Loading ...</p>;
    if (!called) return <button onClick={() => loadUser()}>Load users</button>;
    if (data.users.length === 0) return <h1>Lista vazia</h1>;
    return data.users.map(({ id, name, email }) => (
      <div key={id}>
        <p>
          {id}: {name} - {email} <Button href={`/edit-user/${id}`}>Edit</Button>{" "}
          <Button
            variant="danger"
            id={id}
            onClick={() => {
              deleteUser({ variables: { id } });
              window.location.reload();
            }}
          >
            Delete
          </Button>
        </p>
      </div>
    ));
  };

  return (
    <div>
      {renderUserList()}
      <HomeButton />
      <AddUserButton />
    </div>
  );
}

export default ListUsers;
