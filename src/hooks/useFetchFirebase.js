import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { collection, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "../firebase/firebase";
import { addTransaction } from "../Store/Slice";
import { toast } from "react-toastify";

const useFirebaseTransactions = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.expense.loggedUser);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && loggedUser) {
        try {
          const querySnapshot = await getDocs(
            collection(db, "users", user.uid, "expenses")
          );
          const items = [];
          querySnapshot.forEach((doc) => {
            items.push({ id: doc.id, ...doc.data() });
          });

          items.forEach((item) => {
            dispatch(
              addTransaction({
                type: item.type,
                desc: item.description,
                amount: item.amount,
                id: item.id,
              })
            );
          });

          toast.success("Transaction added successfully!", {
            position: "bottom-left",
            className: "glass-toast",
          });
        } catch (e) {
          toast.error("Error fetching transactions:", e);
        }
      }
    });

    return () => unsubscribe();
  }, [dispatch, loggedUser]);
};

export default useFirebaseTransactions;
