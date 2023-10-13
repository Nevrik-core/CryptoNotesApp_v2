import React from "react";
import { signInWithGoogle } from "../services/firebase/auth";
import { AuthPageConteiner, StyledAuthButton } from "./AuthPage.styled";
export const AuthPage = () => {
  return (
    <AuthPageConteiner>
      <StyledAuthButton onClick={signInWithGoogle}>
        Sign in with Google
      </StyledAuthButton>
    </AuthPageConteiner>
  );
};

export default AuthPage;
