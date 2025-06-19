import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebase";
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
        <button
          onClick={loginGoogle}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
        >
          Login With Google
        </button>
      ) : (
        <div className="flex items-center gap-4">
          <img
            src={user?.photoURL}
            alt="user-avatar"
            className="w-12 h-12 rounded-full"
          />
          <p className="text-xl font-bold italic">{user?.displayName}</p>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default Login;
