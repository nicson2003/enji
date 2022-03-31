import { initializeApp } from 'firebase/app';
import {
  GoogleAuthProvider,
  getAuth,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from 'firebase/firestore';
import axios from 'axios';
import jwt_decode from 'jwt-decode';

const firebaseConfig = {
  apiKey: 'AIzaSyDc1Jhx7-SmhAy91NuAqCjWZNnC8LxtA9c',
  authDomain: 'reactjs-template-50a5b.firebaseapp.com',
  projectId: 'reactjs-template-50a5b',
  storageBucket: 'reactjs-template-50a5b.appspot.com',
  messagingSenderId: '676056373942',
  appId: '1:676056373942:web:7efe685b42738219ab6417',
  measurementId: 'G-92PGEV1MER',
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

const setAuthToken = (token) => {
  if (token) {
    axios.defaults.headers.common['x-auth-token'] = token;
    localStorage.setItem('ENJI-TOKEN', token);
  }
};

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
    const q = query(collection(db, 'users'), where('uid', '==', user.uid));
    const docs = await getDocs(q);
    if (docs.docs.length === 0) {
      await addDoc(collection(db, 'users'), {
        uid: user.uid,
        name: user.displayName,
        authProvider: 'google',
        email: user.email,
      });
    }
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const logInWithEmailAndPassword_firebase = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    alert(err.message);
  }
};

const isAuthenticated = () => {
  let token = localStorage.getItem('ENJI-TOKEN');
  let result = false;

  try {
    let decodedToken = jwt_decode(token);
    let currentDate = new Date();

    if (decodedToken.exp * 360000 < currentDate.getTime()) {
      result = false;
    } else {
      result = true;
    }
  } catch (err) {
    result = false;
  }
  console.log(token);
  console.log('testing');
  return result;
};

const logInWithEmailAndPassword = async (email, password) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ user_name: email, password });

  try {
    const res = await axios.post(
      'http://localhost:4001/api/user/login',
      body,
      config
    );
    const token = res?.data;
    setAuthToken(token);
  } catch (err) {}
};

const registerWithEmailAndPassword = async (name, email, password) => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const user = res.user;
    await addDoc(collection(db, 'users'), {
      uid: user.uid,
      name,
      authProvider: 'local',
      email,
    });
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};

const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert('Password reset link sent!');
  } catch (err) {
    console.error(err);
    alert(err.message);
  }
};
const logout = () => {
  signOut(auth);
  localStorage.removeItem('ENJI-TOKEN');
};
export {
  auth,
  db,
  logInWithEmailAndPassword_firebase,
  signInWithGoogle,
  logInWithEmailAndPassword,
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  isAuthenticated,
};
