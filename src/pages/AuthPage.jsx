import React from "react";
import { signInWithGoogle } from "../services/firebase/auth";

export const AuthPage = () => {
  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 40,
        color: "#010101",
      }}
    >
      <button onClick={signInWithGoogle}>Войти с помощью Google</button>
    </div>
  );
};

export default AuthPage;
