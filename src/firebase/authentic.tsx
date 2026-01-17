import { useState } from "react";
import { auth, googleProvider } from "../../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

function authentic() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // console.log(auth?.currentUser?.photoURL);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (error) {
      console.error(error);
    }
  };

  const signIn = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.error(error);
    }
  };

  const Logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <input
        onChange={(e) => setEmail(e.target.value)}
        value={email}
        placeholder="Email..."
        type="email"
      />
      <input
        onChange={(e) => setPassword(e.target.value)}
        value={password}
        placeholder="Password..."
        type="password"
      />
      <button onClick={signIn}>Sign IN</button>

      <button onClick={signInWithGoogle}>Sign In With Google</button>

      <button onClick={Logout}>Logout</button>
    </div>
  );
}

export default authentic;
