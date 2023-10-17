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

const toggleCityStatus = async ({ docId, status }) => {
  try {
    const cityRef = doc(db, "city", docId);
    await updateDoc(cityRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteCity = async (docId) => {
  try {
    const cityRef = doc(db, "city", docId);
    await deleteDoc(cityRef);
  } catch (err) {
    console.log(err);
  }
};

export { addCity, toggleCityStatus, deleteCity };