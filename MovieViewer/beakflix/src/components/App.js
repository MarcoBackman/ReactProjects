import {BrowserRouter, Route, Routes, Navigate} from "react-router-dom";
import CookieConsent, { Cookies, resetCookieConsentValue, getCookieConsentValue } from "react-cookie-consent";
import React, {useState, useEffect} from 'react';
import history from "./History";

import UserContext from './UserContext';
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import MovieListPage from "./MovieListPage";

import '../stylesheet/App.css';
import axios from "axios";

async function setCookieSeission(name) {
    let form = {
        "user": name,
    }

    await axios.post('/credential/cookieSetup', form)
        .then(resp => {
            console.log(resp);
            alert("Cookie Accpeted");
        })
        .catch(err => {
            console.error(err);
            alert("Failed cookie request: Server Error");
        });
}

function App() {
    //User data
    const [user,setUser] = useState({
        name : 'Guest',
        favorite_list : [],
    });

    //session status
    const [session,setSession] = useState({
        login : false,
        status : "Sign In"
    });

    async function initialize() {
        //Set user by session
        await axios.get('/credential/getSession')
            .then((resp) => {
                if (resp.data === '') {
                    resetCookieConsentValue();
                } else {
                    setUser({
                        name : resp.data,
                        favorite_list : user.favorite_list
                    });
                    setSession({
                        login : true,
                        status : "Sign Out"
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
        if (user.name === "Guest") {
            return;
        }
        //get favorite lists first
        await axios.post('/user/favorite', {id : user.name})
                .then((resp) => {
                    if (resp.data === '') {
                        setUser({
                            name : user.name,
                            favorite_list : []
                        });
                    } else {
                        setUser({
                            name : user.name,
                            favorite_list : resp.data
                        });
                    }
                })
                .catch(err => {
                    console.error(err);
                });
    }

    //Check for session on login
    useEffect(() => {
        initialize();
    }, [user.name]);

    return (
        <div className="App">
            <UserContext.Provider value={user}>
                <BrowserRouter history={history}>
                    <Routes>
                        <Route exact path="*" element={
                            <MovieListPage  user={user} setUser={setUser} session={session} setSession={setSession}/>
                        }/>
                        <Route exact path="/home" element={
                            <MovieListPage  user={user} setUser={setUser} session={session} setSession={setSession}/>
                        }/>
                        <Route exact path="/login" element={
                            <LoginPage user={user} setUser={setUser} session={session} setSession={setSession}/>
                        }/>
                        <Route exact path="/register" element={
                            <RegisterPage/>
                        }/>
                    </Routes>
                </BrowserRouter>
                <CookieConsent
                    onAccept={() => {
                        setCookieSeission(user.name);
                    }}
                    onDecline={() => {
                        alert("Cookie Declined");
                    }}
                    enableDeclineButton
                >This website uses cookies to enhance the user experience.
                </CookieConsent>
            </UserContext.Provider>
        </div>
    );
}

export default App;
