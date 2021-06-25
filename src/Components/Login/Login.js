import firebase from "firebase/app";
import "firebase/auth";
import React, { useContext, useEffect } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { UserContext } from '../../App';
import Header from '../Home/Header/Header';
import firebaseConfig from './firebase.config';



const Login = () => {

    const [loggedInUser, setLoggedInUser] = useContext(UserContext);


    const history = useHistory();
    const location = useLocation();

    const { from } = location.state || { from: { pathname: "/" } };

    if (firebase.apps.length === 0) {
        firebase.initializeApp(firebaseConfig);
    }
    const addUserUrl = 'https://sleepy-mountain-41781.herokuapp.com/addUser';

    const handleGoogleSignIn = () => {
        var provider = new firebase.auth.GoogleAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function (result) {
            const { displayName, email, photoURL } = result.user;
            const signedInUser = { name: displayName, email, image: photoURL };
            setLoggedInUser(signedInUser);
            localStorage.setItem('loggedInUser', JSON.stringify(signedInUser));
            history.replace(from);

        }).catch(function (error) {
            const errorMessage = error.message;
            console.log(errorMessage, loggedInUser);
        });
    }


    useEffect(() => {
        fetch(addUserUrl, {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(loggedInUser)
        }).then(response => console.log(response))
    }, [loggedInUser])


    return (
        <div>
            <Header />
            <div className="container">
                <div className="row text-center">
                    <div className="mt-5 pt-5">
                        <button className="btn btn-danger" onClick={handleGoogleSignIn}>Google Sign in</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;