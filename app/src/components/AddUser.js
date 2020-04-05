import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import gql from "graphql-tag";
import { useMutation, useLazyQuery } from "@apollo/react-hooks";
import { Button } from "react-bootstrap";
import ListUsersButton from "./ListUsersButton";
import FormControl from "react-bootstrap/FormControl";
import InputGroup from "react-bootstrap/InputGroup";

const ADD_USER = gql`
  mutation AddUser($name: String!, $email: String!) {
    createUser(name: $name, email: $email) {
      id
    }
  }
`;

const UPDATE_USER = gql`
  mutation UpdateUser($id: ID!, $name: String!, $email: String!) {
    updateUser(id: $id, name: $name, email: $email) {
      id
    }
  }
`;

const LOAD_USER = gql`
  query loadUser($id: ID!) {
    user(id: $id) {
      name
      email
    }
  }
`;

function AddUser() {
  const [loadUser, { data }] = useLazyQuery(LOAD_USER);
  const [addUser] = useMutation(ADD_USER);
  const [updateUser] = useMutation(UPDATE_USER);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  let { id } = useParams();

  useEffect(() => {
    if (!id) return;
    loadUser({ variables: { id } });
    if (data) {
      setName(data.user.name);
      setEmail(data.user.email);
    }
  }, [data, id, loadUser]);

  const saveUser = () => {
    if (!id) {
      addUser({ variables: { name, email } });
      return;
    }
    updateUser({ variables: { id, name, email } });
  };

  return (
    <div>
      <form
        onSubmit={e => {
          e.preventDefault();
          saveUser();
          window.location.reload();
        }}
      >
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Nome
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Nome"
            aria-describedby="inputGroup-sizing-default"
            type="text"
            value={name}
            onChange={e => setName(e.target.value)}
            required
          />
        </InputGroup>
        <InputGroup className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-default">
              Email
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Nome"
            aria-describedby="inputGroup-sizing-default"
            type="text"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />
        </InputGroup>
        <h1>
          <Button variant="primary" size="lg" block type="submit">
            Salvar
          </Button>
        </h1>
        <ListUsersButton />
      </form>
    </div>
  );
}

export default AddUser;
