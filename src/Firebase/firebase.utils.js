import firebase from 'firebase/app';

import 'firebase/firestore';

import 'firebase/auth';

const config = 
    {
        apiKey: "AIzaSyBSAY1MtNeRDH9MWrxXxonLdY69ZYy9nIs",
        authDomain: "e-commerce-site-643d9.firebaseapp.com",
        databaseURL: "https://e-commerce-site-643d9.firebaseio.com",
        projectId: "e-commerce-site-643d9",
        storageBucket: "e-commerce-site-643d9.appspot.com",
        messagingSenderId: "235721677685",
        appId: "1:235721677685:web:a0a918ecc3eb62813b513c",
        measurementId: "G-RLVPYGSXVS"
      }


  export const createUserProfileDocument = async (userAuth,additionalData) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);

    const snapShot = await userRef.get();

    if(!snapShot.exists){
      const {displayName, email} = userAuth;
      const createdAt = new Date();

      try{
        await userRef.set({
          displayName,
          email,
          createdAt,
          ...additionalData
        })
      }catch(error){
        console.log('error creating user', error.message);
      }
    }
    return userRef;
  }

//Setting up Firebase for google authentication
firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

//Google authentication part:

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account'});



export const SignInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;