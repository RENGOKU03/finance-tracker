import { signInWithPopup, signOut } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebase";
import styles from "./Login.module.css";

const Login = () => {
  const [user, setUser] = useState(null);
  const [toggleLogout, settoggleLogout] = useState(true);
  function getCurrentUser() {
    const currentUser = auth.currentUser;
    setUser(currentUser);
  }

  useEffect(() => {
    getCurrentUser();
  }, []);
  async function loginGoogle() {
    try {
      const response = await signInWithPopup(auth, provider);
      getCurrentUser();
    } catch (e) {
      console.error(e);
    }
  }
  async function handleLogout() {
    try {
      await signOut(auth);
    } catch {
      console.error(e);
    } finally {
      getCurrentUser();
    }
  }
  return (
    <div>
      {user === null ? (
        <button onClick={loginGoogle}>Login With Google</button>
      ) : (
        <div className={styles.userDiv}>
          <img src={user?.photoURL} alt="" />
          <p className={styles.user}>{user?.displayName}</p>
          {toggleLogout && <button onClick={handleLogout}>Logout</button>}
        </div>
      )}
    </div>
  );
};
export default Login;
