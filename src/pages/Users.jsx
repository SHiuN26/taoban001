import { useState, useEffect } from "react";
import axios from "../API/axios";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
  const [users, set_Users] = useState();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const res = await axios.get("/users", {
          signal: controller.signal,
        });
        console.log("res === ", res);
        isMounted && set_Users(res.data);
      } catch (e) {
        console.log(e);
      }
    };
    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, []);

  return (
    <article>
      <h2>User List</h2>
      {users?.length ? (
        <ul>
          {users.map((user, i) => {
            <li key={i}>{user?.username}</li>;
          })}
        </ul>
      ) : (
        <p>no user to display</p>
      )}
    </article>
  );
};

export default Users;
