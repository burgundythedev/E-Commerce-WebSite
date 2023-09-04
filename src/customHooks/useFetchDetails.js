import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const useFetchDetails = (collectionName, id) => {
  const [details, setDetails] = useState(null);

  useEffect(() => {
    const getDetails = async () => {
      const docRef = doc(db, collectionName, id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        const dataItem = { id: id, ...docSnap.data() };
        setDetails(dataItem);
      } else {
        toast.error("Can't display the Details");
      }
    };
    getDetails();
  }, [collectionName, id]);
  return { details };
};

export default useFetchDetails;
