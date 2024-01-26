import React, { useState, createContext } from "react";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  onAuthStateChanged,
} from "firebase/auth";
import {
  collection,
  query,
  where,
  getDocs,
  setDoc,
  doc,
} from "firebase/firestore";
import { FIREBASE_FIRESTORE } from "../../utils/firebase/FirebaseConfig";
import { useEffect } from "react";

export const AuthenticationContext = createContext();

export const AuthenticationContextProvider = ({ children }) => {
  const [loading, setLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [user, setUser] = useState(null);
  const [error, setError] = useState(null);
  const auth = getAuth();
  const db = FIREBASE_FIRESTORE; 

  useEffect(() => {
    checkLogin();
  }, []);

  function checkLogin() {
    onAuthStateChanged(auth, (u) => {
      if (u) {
        setUser(true);
      } else {
        setUser(false);
      }
    });
  }

  const onLogin = async (usernameOrCPF, password) => {
    try {
      const usuariosRefUsername = collection(db, "usuarios");
      const querySnapshotUsername = await getDocs(
        query(usuariosRefUsername, where("nomeUsuario", "==", usernameOrCPF))
      );

      const usuariosRefCPF = collection(db, "usuarios");
      const querySnapshotCPF = await getDocs(
        query(usuariosRefCPF, where("cpf", "==", usernameOrCPF))
      );

      if (querySnapshotUsername.empty && querySnapshotCPF.empty) {
        alert("Usuário não encontrado");
        return;
      }

      let userEmail = "";
      if (!querySnapshotUsername.empty) {
        const userDoc = querySnapshotUsername.docs[0];
        const userData = userDoc.data();
        userEmail = userData.email;
      } else if (!querySnapshotCPF.empty) {
        const userDoc = querySnapshotCPF.docs[0];
        const userData = userDoc.data();
        userEmail = userData.email;
      }

      await signInWithEmailAndPassword(auth, userEmail, password);
    } catch (error) {
      alert("Erro ao fazer login: " + error.message);
    } finally {
    }
  };

  const onRegister = async (username, cpf, email, password) => {
    try {
      const usuariosRef = collection(db, "usuarios");
      const querySnapshot = await getDocs(
        query(usuariosRef, where("cpf", "==", cpf))
      );

      if (!querySnapshot.empty) {
        alert("CPF já cadastrado. Por favor, use outro CPF.");
      } else {
        const response = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const userDocRef = doc(usuariosRef, response.user.uid);
        await setDoc(userDocRef, {
          nomeUsuario: username,
          cpf: cpf,
          email: email,
          createdAt: new Date(),
          cidade: null,
          estado: null,
          pais: null,
          avatar: null,
        });

        await sendEmailVerification(response.user, {
          url: "https://bekind-e12fd.firebaseapp.com",
        });

        alert("Verifique seu e-mail para ativar sua conta.");
      }
    } catch (error) {
      alert("Erro ao se registrar: " + error.message);
    }
  };

  const onLogout = () => {
    signOut(auth).then(() => {
      setUser(false);
      setError(null);
    });
  };

  return (
    <AuthenticationContext.Provider
      value={{
        isAuthenticated: !!auth.currentUser,
        userAuth: auth.currentUser,
        user,
        loading,
        error,
        onLogin,
        onRegister,
        onLogout,
      }}
    >
      {children}
    </AuthenticationContext.Provider>
  );
};
