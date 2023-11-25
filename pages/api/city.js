import { db } from "../../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const addCity = async ({ userId, name, temperature }) => {
  try {
    await addDoc(collection(db, "city"), {
      user: userId,
      name: name,
      temperature: temperature,
     
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

const deleteCity = async (docId) => {
  try {
    const cityRef = doc(db, "city", docId);
    await deleteDoc(cityRef);
  } catch (err) {
    console.log(err);
  }
};

export { addCity, deleteCity };