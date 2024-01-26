import React, { createContext, useContext, useState, useEffect } from "react";
import { FIREBASE_FIRESTORE } from "../../utils/firebase/FirebaseConfig";
import { collection, doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthenticationContext } from "../authentication/authentication.context";

export const DataContext = createContext();

export const DataContextProvider = ({ children }) => {
  const { userAuth } = useContext(AuthenticationContext);
  const [userData, setUserData] = useState({});

  const fetchUserData = async () => {
    if (userAuth) {
      const db = FIREBASE_FIRESTORE;
      const usuariosRef = collection(db, "usuarios");
      const userDocRef = doc(usuariosRef, userAuth.uid);

      try {
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const userData = userDocSnap.data();
          setUserData(userData);
        }
      } catch (error) {
        console.error("Erro ao buscar dados do usuário:", error);
      }
    }
  };

  const updateUserData = async (newData) => {
    if (userAuth) {
      const db = FIREBASE_FIRESTORE;
      const usuariosRef = collection(db, "usuarios");
      const userDocRef = doc(usuariosRef, userAuth.uid);

      try {
        await updateDoc(userDocRef, newData);
        console.log("Dados do usuário atualizados com sucesso!");
        fetchUserData(); // Atualiza os dados do usuário após a atualização
      } catch (error) {
        console.error("Erro ao atualizar dados do usuário:", error);
      }
    }
  };

  useEffect(() => {
    fetchUserData();
  }, [userAuth]);

  return (
    <DataContext.Provider value={{ userData, updateUserData }}>
      {children}
    </DataContext.Provider>
  );
};
