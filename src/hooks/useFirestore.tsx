import {
  doc,
  setDoc,
  getDoc,
  CollectionReference,
  DocumentData,
} from 'firebase/firestore';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { db } from '../utils/firebaseConfig';

interface DataOutput {
  getUserDoc: (res: string) => void;
  setUserDoc: (
    usersRef: CollectionReference<DocumentData>,
    res: any,
    formData: {
      email: string;
      password: string;
      passwordConfirm: string;
      username: string;
    }
  ) => void;
  updateUserDoc: (user: string, key: string) => void;
}

export const useFirestore = (): DataOutput => {
  const { setUser } = useContext(AuthContext);

  const getUserDoc = (res: string) =>
    getDoc(doc(db, 'users', res)).then((res) =>
      setUser({
        username: res.data()!.username,
        email: res.data()!.email,
        password: res.data()!.password,
        id: res.data()!.id,
      })
    );

  const setUserDoc = (
    usersRef: CollectionReference<DocumentData>,
    res: any,
    formData: {
      email: string;
      password: string;
      passwordConfirm: string;
      username: string;
    }
  ) => {
    setDoc(doc(usersRef, res), {
      username: formData.username,
      password: formData.password,
      email: formData.email,
      id: res,
    });
  };

  const updateUserDoc = (user: string, key: string) => {
    setDoc(doc(db, 'users', user), { APIKey: key }, { merge: true });
  };

  return { getUserDoc, setUserDoc, updateUserDoc };
};
