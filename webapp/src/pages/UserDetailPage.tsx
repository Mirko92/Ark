import { useLoaderData } from "react-router-dom";
import { User } from "../model/User";

export function UserDetail() {
  const { user } = useLoaderData() as { user: User };
  return (
    <>

      <label>Name: </label>
      <h1>{user?.name}</h1>

      <label>Username: </label>
      <h1>{user?.username}</h1>

      <fieldset>
        <legend>Address</legend>

        <p>
          {user?.address.city} {user?.address.street}
        </p>
      </fieldset>
    </>
  );
}
