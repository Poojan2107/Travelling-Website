import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, provider } from '../firebase';
import { signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // Listen to Firebase authentication state changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        // Map firebase user object to our app's user object format
        setUser({
          name: currentUser.displayName,
          email: currentUser.email,
          avatar: currentUser.photoURL,
          uid: currentUser.uid
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });

    return () => unsubscribe(); // Cleanup subscription on unmount
  }, []);

  const loginWithGoogle = async () => {
    try {
      await signInWithPopup(auth, provider);
      setIsModalOpen(false); // Close modal on success
    } catch (error) {
      console.error("Error signing in with Google:", error);
      alert("Failed to log in with Google. Please try again.");
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  const openLoginModal = () => setIsModalOpen(true);
  const closeLoginModal = () => setIsModalOpen(false);

  return (
    <AuthContext.Provider value={{ user, loginWithGoogle, logout, isModalOpen, openLoginModal, closeLoginModal }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
