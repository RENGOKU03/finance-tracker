import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebase";
import styles from "./Login.module.css";
import { useDispatch } from "react-redux";
import { addLoggedUser, addTransaction } from "../Store/Slice";

const Login = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    if (user) {
      dispatch(addLoggedUser(true));
    }
    return () => unsubscribe();
  }, []);

  async function loginGoogle() {
    try {
      await signInWithPopup(auth, provider);
      dispatch(addLoggedUser(true));
    } catch (e) {
      console.error("login Failed", e);
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      dispatch(addTransaction({ type: "logout" }));
      dispatch(addLoggedUser(false));
    } catch (e) {
      console.error("logout Failed.", e);
    }
  }
  return (
    <div>
      {user === null ? (
        <button onClick={loginGoogle}>Login With Google</button>
      ) : (
        <div className={styles.userDiv}>
          <img src={user?.photoURL} alt="user-avatar" />
          <p className={styles.user}>{user?.displayName}</p>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </div>
  );
};
export default Login;
