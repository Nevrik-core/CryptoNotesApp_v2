import { auth } from "./config";
import { GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

export const signInWithGoogle = async () => {
  const provider = new GoogleAuthProvider();

  try {
    const result = await signInWithPopup(auth, provider);
    const user = result.user;
    // eslint-disable-next-line no-unused-vars
    const idToken = await user.getIdToken(/* forceRefresh */ true);
  } catch (error) {
    console.error("Error during sign in:", error);
  }
};

export const signOutUser = async () => {
  try {
    await signOut(auth);
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};
