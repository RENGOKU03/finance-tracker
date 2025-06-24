import useFetchFirebase from "../hooks/useFetchFirebase";
// Login.jsx (No changes needed, keeping as is)
import { signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";
import React, { useEffect, useState } from "react";
import { auth, provider } from "../firebase/firebase"; // This line will now work correctly
import { useDispatch } from "react-redux";
import { addLoggedUser, clearAllTransactions } from "../Store/Slice";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  useFetchFirebase();
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
    }
  }

  async function handleLogout() {
    try {
      await signOut(auth);
      dispatch(clearAllTransactions());
      dispatch(addLoggedUser(false));
    } catch (e) {
      console.error("Logout Failed", e);
    }
  }

  // Framer Motion Variants for reusable button styles
  const buttonVariants = {
    hover: { scale: 1.07, boxShadow: "0 8px 20px rgba(0,0,0,0.25)", y: -2 },
    tap: { scale: 0.95, boxShadow: "0 2px 5px rgba(0,0,0,0.1)" },
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 150, damping: 10 },
    },
    exit: { opacity: 0, y: -20, transition: { duration: 0.2 } },
  };

  // Framer Motion Variants for user info container
  const userInfoVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: "easeOut" },
    },
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
              xmlns="http://www.w3.org/2000/svg"
              x="0px"
              y="0px"
              width="50"
              height="50"
              viewBox="0 0 100 100"
            >
              <path
                fill="#f9e65c"
                d="M84.467,44H50v13h20.856C67.931,65.717,59.702,72,50,72c-12.15,0-22-9.85-22-22s9.85-22,22-22	c4.799,0,9.235,1.541,12.851,4.149l9.269-9.269C66.091,17.956,58.391,15,50,15c-19.33,0-35,15.67-35,35s15.67,35,35,35	s35-15.67,35-35C85,47.952,84.806,45.951,84.467,44z"
              ></path>
              <path
                fill="#78a2d2"
                d="M50,57h20.856c-1.577,4.699-4.704,8.679-8.763,11.36l9.87,8.884C79.911,70.828,85,61.01,85,50	c0-2.048-0.194-4.049-0.533-6H50V57z"
              ></path>
              <path
                fill="#60be92"
                d="M62.093,68.36C58.622,70.653,54.472,72,50,72c-8.997,0-16.727-5.403-20.137-13.139L18.818,65.89	C24.609,77.23,36.393,85,50,85c8.32,0,15.957-2.908,21.963-7.756L62.093,68.36z"
              ></path>
              <path
                fill="#f15b6c"
                d="M29.677,41.569C32.985,33.603,40.837,28,50,28c4.799,0,9.235,1.541,12.851,4.149l9.269-9.269	C66.091,17.956,58.391,15,50,15c-13.772,0-25.681,7.958-31.394,19.524L29.677,41.569z"
              ></path>
              <path
                fill="#1f212b"
                d="M50,86c-19.851,0-36-16.149-36-36s16.149-36,36-36c8.271,0,16.353,2.878,22.753,8.105	c0.219,0.179,0.352,0.442,0.366,0.724c0.014,0.282-0.092,0.558-0.292,0.757l-9.269,9.269c-0.347,0.347-0.895,0.391-1.292,0.104	C58.675,30.369,54.433,29,50,29c-11.579,0-21,9.42-21,21s9.421,21,21,21c8.563,0,16.196-5.168,19.417-13H50c-0.553,0-1-0.448-1-1V44	c0-0.552,0.447-1,1-1h34.467c0.486,0,0.902,0.35,0.985,0.829C85.815,45.922,86,47.999,86,50C86,69.851,69.851,86,50,86z M50,16	c-18.748,0-34,15.252-34,34s15.252,34,34,34s34-15.252,34-34c0-1.624-0.129-3.302-0.384-5H51v11h19.856	c0.322,0,0.624,0.155,0.812,0.416c0.188,0.261,0.239,0.597,0.137,0.902C68.657,66.698,59.895,73,50,73c-12.683,0-23-10.318-23-23	s10.317-23,23-23c4.569,0,8.954,1.329,12.735,3.851l7.883-7.883C64.72,18.467,57.442,16,50,16z"
              ></path>
              <path
                fill="#1f212b"
                d="M71.5,78c-0.119,0-0.239-0.042-0.335-0.128l-4-3.6c-0.205-0.185-0.222-0.501-0.037-0.706	c0.187-0.205,0.502-0.221,0.707-0.037l4,3.6c0.205,0.185,0.222,0.501,0.037,0.706C71.772,77.944,71.637,78,71.5,78z"
              ></path>
              <path
                fill="#1f212b"
                d="M65.5,72.6c-0.119,0-0.239-0.042-0.335-0.128l-1.777-1.6c-0.205-0.185-0.222-0.501-0.037-0.706	c0.187-0.205,0.502-0.221,0.707-0.037l1.777,1.6c0.205,0.185,0.222,0.501,0.037,0.706C65.772,72.544,65.637,72.6,65.5,72.6z"
              ></path>
              <path
                fill="#1f212b"
                d="M27.929,60c-0.165,0-0.326-0.082-0.422-0.231c-0.148-0.233-0.079-0.542,0.153-0.69l1.571-1	c0.231-0.146,0.541-0.08,0.69,0.153c0.148,0.233,0.079,0.542-0.153,0.69l-1.571,1C28.114,59.975,28.021,60,27.929,60z"
              ></path>
              <path
                fill="#1f212b"
                d="M23.5,62.818c-0.165,0-0.326-0.082-0.422-0.231c-0.148-0.233-0.079-0.542,0.153-0.69l2-1.273	c0.231-0.146,0.541-0.081,0.69,0.153c0.148,0.233,0.079,0.542-0.153,0.69l-2,1.273C23.686,62.793,23.593,62.818,23.5,62.818z"
              ></path>
              <path
                fill="#1f212b"
                d="M18.5,66c-0.165,0-0.326-0.082-0.422-0.231c-0.148-0.233-0.079-0.542,0.153-0.69l3-1.909	c0.23-0.146,0.541-0.08,0.69,0.153c0.148,0.233,0.079,0.542-0.153,0.69l-3,1.909C18.686,65.975,18.593,66,18.5,66z"
              ></path>
              <path
                fill="#1f212b"
                d="M24.5,38.182c-0.093,0-0.186-0.025-0.269-0.078l-5-3.182c-0.232-0.148-0.302-0.458-0.153-0.69	c0.149-0.233,0.46-0.299,0.69-0.153l5,3.182c0.232,0.148,0.302,0.458,0.153,0.69C24.826,38.1,24.665,38.182,24.5,38.182z"
              ></path>
              <path
                fill="#1f212b"
                d="M27.5,40.091c-0.093,0-0.186-0.025-0.269-0.078l-1-0.636c-0.232-0.148-0.302-0.458-0.153-0.69	c0.15-0.233,0.46-0.299,0.69-0.153l1,0.636c0.232,0.148,0.302,0.458,0.153,0.69C27.826,40.009,27.665,40.091,27.5,40.091z"
              ></path>
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
            transition={{ type: "spring", stiffness: 300, damping: 10 }}
          />
          <p className="text-base md:text-lg font-semibold text-white/90 italic drop-shadow-sm truncate max-w-[120px] md:max-w-[180px]">
            {user?.displayName}
          </p>
          <motion.button
            onClick={handleLogout}
            className="px-4 py-2 text-sm md:text-base bg-red-500/80 text-white rounded-full
                       hover:bg-red-600/90 transition-colors duration-300
                       backdrop-blur-sm border border-red-400/50 shadow-md cursor-pointer"
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
