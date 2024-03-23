import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
import { getAllUsers } from "../api/UsersApi";
import { User } from "../model/User";
import { useLoader } from "../utils/UserLoader";

export function UsersListPage() {
  const [users, setUsers] = useState<User[]>([]);

  const [loader, toggleLoader] = useLoader(true);

  useEffect(() => {
    loadUsers();
  }, []);

  async function loadUsers() {
    try {
      toggleLoader();
      const _users = await getAllUsers();
      console.log("users: ", _users);
      setUsers(_users);
    } finally {
      toggleLoader();
    }
  }

  return (
    <>
      {loader ? (
        <h1>Loading...</h1>
      ) : (
        <Table
          striped
          bordered
          hover
        >
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Username</th>
              <th>Address</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.id}</td>
                <td>{u.name}</td>
                <td>{u.username}</td>
                <td>{u.address?.city}</td>
                <td>
                  <Link to={`/users/${u.id}`}>
                    <Button variant="primary">&gt;</Button>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  );
}
