import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase/firebase";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addTransaction } from "../Store/Slice";
import { onAuthStateChanged } from "firebase/auth";

const FetchFirebase = () => {
  const dispatch = useDispatch();
  const loggedUser = useSelector((state) => state.expense.loggedUser);
  const [userLoading, setUserLoading] = useState(true);

  async function fetchData() {
    const currentUser = auth.currentUser;

    if (currentUser) {
      try {
        const querySnapshot = await getDocs(
          collection(db, "users", currentUser.uid, "expenses")
        );
        const items = [];
        querySnapshot.forEach((doc) => {
          items.push({ id: doc.id, ...doc.data() });
        });
        console.log("itemsa", items);

        items.forEach((item) => {
          dispatch(
            addTransaction({
              type: item.type,
              desc: item.desc,
              amount: item.amount,
              id: item.id,
            })
          );
        });

        console.log("added transactions");
      } catch (e) {
        console.error(e);
      }
    } else {
      console.error("Please Login first");
    }
  }
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        fetchData(user);
      }
      setUserLoading(false);
    });
    return () => unsubscribe();
  }, [loggedUser]);

  return null;
};

export default FetchFirebase;
