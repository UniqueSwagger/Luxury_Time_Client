import axios from "axios";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithPopup,
  GoogleAuthProvider,
  GithubAuthProvider,
  signOut,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  updateProfile,
} from "firebase/auth";
import { useState, useEffect } from "react";
import initializeAuthentication from "../firebase/firebase.init.js";
initializeAuthentication();
const useFirebase = () => {
  const auth = getAuth();
  //all state
  const [currentUser, setCurrentUser] = useState({});
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);
  //all provider
  const googleProvider = new GoogleAuthProvider();
  const githubProvider = new GithubAuthProvider();

  // handle sign up
  const handleSignup = (email, password, name) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password)
      .then(() => {
        const newUser = { email, displayName: name };
        setCurrentUser(newUser);
        // save user to the database
        saveUser(email, name, "post");
        updateProfile(auth.currentUser, {
          displayName: name,
        })
          .then(() => {
            //profile updated successfully
          })
          .catch((error) => {
            //an error occurred
            console.log(error.message);
          });
      })
      .finally(() => setLoading(false));
  };

  //handle sign in
  const handleSignIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password).finally(() => {
      setLoading(false);
    });
  };

  //handle google sign in
  const handleGoogleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider)
      .then((result) => {
        //save user to the database
        setCurrentUser(result.user);
        saveUser(result.user.email, result.user.displayName, "put");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //handle github sign in
  const handleGithubSignIn = () => {
    return signInWithPopup(auth, githubProvider)
      .then((result) => {
        //save user to the database
        setCurrentUser(result.user);
        saveUser(result.user.email, result.user.displayName, "put");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  //handle logout
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        setCurrentUser({});
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  //reset password
  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  //admin check
  useEffect(() => {
    setLoading(true);
    axios
      .get(
        `https://vast-plains-88495.herokuapp.com/users/${currentUser?.email}`
      )
      .then((res) => {
        setAdmin(res.data.admin);
        if (admin) {
          setLoading(false);
        }
        setInterval(() => {
          if (!admin) {
            setLoading(false);
          }
        }, 5000);
      });
  }, [admin, currentUser?.email]);

  // observing the current user
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user);
      } else {
        setCurrentUser({});
      }
      setLoading(false);
    });
    return unsubscribe;
  }, [auth]);

  //save user to the database
  const saveUser = (email, displayName, httpMethod) => {
    const user = { email, displayName };
    axios({
      method: httpMethod,
      url: "https://sheltered-ocean-21876.herokuapp.com/users",
      data: user,
    });
  };

  return {
    handleSignup,
    currentUser,
    loading,
    admin,
    setCurrentUser,
    handleGoogleSignIn,
    handleGithubSignIn,
    handleLogout,
    handleSignIn,
    resetPassword,
  };
};

export default useFirebase;
