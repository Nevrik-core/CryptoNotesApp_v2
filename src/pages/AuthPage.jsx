import React from "react";
import { signInWithGoogle } from "../services/firebase/auth";
import theme from "constants/theme";

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
      <button
        style={{
          backgroundColor: theme.colors.blue,
          color: "#ffffff",
          fontSize: 18,
          borderRadius: 8,
          padding: "10px 20px",
          boxShadow: "2px 2px 4px rgba(0, 0, 0, 0.2)",
          border: "none"
        }}
        onClick={signInWithGoogle}
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default AuthPage;
