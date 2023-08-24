import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebase/Config";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const useFetchDetails = (collectionName, documentId) => {
  const [details, setDetails] = useState(null);
  const getDetails = async () => {
    const docRef = doc(db, collectionName, documentId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const dataItem = { id: documentId, ...docSnap.data() };
      setDetails(dataItem);
    } else {
      toast.error("Can't display the Details");
    }
  };

  useEffect(() => {
    getDetails();
  }, []);
  return { details };
};

export default useFetchDetails;
