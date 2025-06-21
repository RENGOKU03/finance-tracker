// Login.jsx (No changes needed, keeping as is)
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebase"; // This line will now work correctly
import { useDispatch } from "react-redux";
import { addLoggedUser, clearAllTransactions } from "../Store/Slice";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const [user, setUser] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      dispatch(addLoggedUser(!!currentUser));
    });
    return () => unsubscribe();
  }, [dispatch]);

  async function loginGoogle() {
    try {
      await signInWithPopup(auth, provider);
    } catch (e) {
      console.error("Login Failed", e);
      // Optionally dispatch an error to Redux here if you have an error state
      // dispatch(setError('Failed to login with Google.'));
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      dispatch(clearAllTransactions());
      dispatch(addLoggedUser(false));
    } catch (e) {
      console.error("Logout Failed", e);
      // Optionally dispatch an error to Redux here
      // dispatch(setError('Failed to logout.'));
    }
  }

  // Framer Motion Variants for reusable button styles
  const buttonVariants = {
    hover: { scale: 1.07, boxShadow: '0 8px 20px rgba(0,0,0,0.25)', y: -2 },
    tap: { scale: 0.95, boxShadow: '0 2px 5px rgba(0,0,0,0.1)' },
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 150, damping: 10 } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  // Framer Motion Variants for user info container
  const userInfoVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  return (
    <AnimatePresence mode="wait">
      {user === null ? (
        <motion.button
          key="login-btn"
          variants={buttonVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileHover="hover"
          whileTap="tap"
          onClick={loginGoogle}
          className="px-6 py-3 md:px-8 md:py-4 rounded-full text-white text-lg md:text-xl font-bold
                     bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800
                     backdrop-blur-md border border-blue-400/50 shadow-lg
                     transition-all duration-300 ease-in-out cursor-pointer"
        >
          <div className="flex items-center gap-3">
            <svg
              className="w-6 h-6 md:w-7 md:h-7"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12.0001 4.5V7.81829C15.7537 7.81829 18.7501 10.8147 18.7501 14.5683C18.7501 18.3219 15.7537 21.3183 12.0001 21.3183C8.24647 21.3183 5.25008 18.3219 5.25008 14.5683C5.25008 10.8147 8.24647 7.81829 12.0001 7.81829Z" opacity=".35"></path>
              <path d="M12.0001 4.5V7.81829C15.7537 7.81829 18.7501 10.8147 18.7501 14.5683C18.7501 18.3219 15.7537 21.3183 12.0001 21.3183C8.24647 21.3183 5.25008 18.3219 5.25008 14.5683C5.25008 10.8147 8.24647 7.81829 12.0001 7.81829Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M12.0001 4.5V1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M15.0001 2.99999C16.5914 3.01258 18.0694 3.65997 19.1419 4.79373L21.3789 2.55673" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M19.4998 12.75V15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M21.526 12.75L21.526 15.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span>Login with Google</span>
          </div>
        </motion.button>
      ) : (
        <motion.div
          key="user-info"
          className="flex items-center gap-3 md:gap-4 p-3 md:p-4 rounded-full
                     bg-white/10 backdrop-blur-md border border-white/20 shadow-lg"
          variants={userInfoVariants}
          initial="initial"
          animate="animate"
          exit="exit"
        >
          <motion.img
            src={user?.photoURL}
            alt="user-avatar"
            className="w-10 h-10 md:w-12 md:h-12 rounded-full shadow-md border border-white/30"
            whileHover={{ rotate: 8, scale: 1.15 }}
            transition={{ type: 'spring', stiffness: 300, damping: 10 }}
          />
          <p className="text-base md:text-lg font-semibold text-white/90 italic drop-shadow-sm truncate max-w-[120px] md:max-w-[180px]">
            {user?.displayName}
          </p>
          <motion.button
            onClick={handleLogout}
            className="px-4 py-2 text-sm md:text-base bg-red-500/80 text-white rounded-full
                       hover:bg-red-600/90 transition-colors duration-300
                       backdrop-blur-sm border border-red-400/50 shadow-md"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Logout
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Login;