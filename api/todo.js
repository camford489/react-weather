import { db } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  doc,
  deleteDoc,
} from "firebase/firestore";

const addTodo = async ({ userId, name, temperature }) => {
  try {
    await addDoc(collection(db, "city"), {
      user: userId,
      name: name,
      temperature: temperature,
     
      createdAt: new Date().getTime(),
    });
  } catch (err) {}
};

const toggleTodoStatus = async ({ docId, status }) => {
  try {
    const todoRef = doc(db, "city", docId);
    await updateDoc(todoRef, {
      status,
    });
  } catch (err) {
    console.log(err);
  }
};

const deleteTodo = async (docId) => {
  try {
    const todoRef = doc(db, "city", docId);
    await deleteDoc(todoRef);
  } catch (err) {
    console.log(err);
  }
};

export { addTodo, toggleTodoStatus, deleteTodo };