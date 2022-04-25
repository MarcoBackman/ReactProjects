import '../stylesheet/RegisterPage.css';

import React, {useEffect, useState} from 'react';
import {useNavigate} from "react-router-dom";
import axios from 'axios';

function RegisterPage(props) {

    const navigate = useNavigate();

    const [saveStatus, setSaveStatus] = useState("Register");
    const [allowSubmit, setAllowSubmit] = useState(false);

    function matchEmailRegex(email_string) {
        //Email form regex
        const regex = /[\w]+\.{0,1}[\w]+\@{1}.*\..*\w/;
        let matches;
        if ((matches = regex.exec(email_string)) !== null) {
            if (email_string === matches[0]) {
                return true;
            }
        }
        return false;
    }

    /* Password must contain:
     *      - at least one specifal character
     *      - at least one uppercase character
     *      - at least one lowercase character
     *      - at least one number
     *      - at least 8 characters long
     */
    function matchPasswordRegex(password) {
        const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/;
        let matches;
        if ((matches = regex.exec(password)) !== null) {
            return true;
        }
        return false;
    }

    async function validate_form() {
        let form = await getRegisterJsonForm();
        let id = form.id;
        //validate id
        if (id.length < 5) {
            setAllowSubmit(false);
            alert("ID is too short");
            return;
        }
        //validate email
        let is_valid_email = matchEmailRegex(form.email);

        if (is_valid_email === false) {
            setAllowSubmit(false);
            alert("Wrong email format");
            return;
        }

        //validate password
        let is_valid_password = matchPasswordRegex(form.pw);

        if (is_valid_password === false) {
            setAllowSubmit(false);
            alert("Wrong password format");
            return;
        }

        setAllowSubmit(true);
    }

    async function handleSubmit(form) {
        //Post
        await axios.post('/user/register', form)
            .then(resp => {
                console.log(resp);
                if (resp.data === false) {
                    alert("Please choose different ID");
                } else {
                    alert("User registered");
                }
            })
            .catch(err => {
                console.error(err);
                alert("Failed request: Server Error");
            });
    }

    async function registerEvent(event) {
        event.preventDefault();

        if (saveStatus === "Processing...") {
            alert("Still on process");
            return;
        }

        setSaveStatus("Processing...");

        await validate_form();

        if (allowSubmit === false) {
            setSaveStatus("Register");
            return;
        }

        let form = await getRegisterJsonForm();
        await handleSubmit(form);

        setSaveStatus("Register");
    }

    async function getRegisterJsonForm() {
        let id = document.querySelector("#id_input_register").value;
        let email = document.querySelector("#email_input_register").value;
        let pw = document.querySelector("#pw_input_register").value;

        let newRegister = {
            'id': id,
            'email': email,
            'pw': pw,
        };

        return newRegister;
    }

    return (
        <div id="register_page">
            <div id="navigation_bar">
                <h1 className="nav_title" onClick={(e) => {navigate("/home");}}>BAEKFLIX</h1>
            </div>
            <form id="submit_register" action="/user/register"  method="post"/>
            <div className="input_panel">
                <h2>Register</h2>
                <div className="input_form" id="register_form">
                    <label className="login_label" >
                        User ID
                        <input id="id_input_register" className="login_input" />
                    </label>
                    <label className="login_label" >
                        Email
                        <input id="email_input_register" className="login_input" />
                    </label>
                    <label className="login_label" >
                        User Password
                        <input id="pw_input_register" className="login_input" type="password" />
                    </label>
                    <label className="login_label" >
                        Re-enter Password
                        <input id="re_pw_input_register" className="login_input" type="password" />
                    </label>
                </div>
                <div className="button_section">
                    <button id="submit_register_btn" className="login_page_btn" type="submit" form="submit_register" onClick={registerEvent}>
                        {saveStatus}
                    </button>
                    <label>Already registered?</label>
                    <button id="find_id_btn" className="login_page_btn" onClick={(e) => {navigate("/login");}}>
                        Sign in
                    </button>
                </div>
            </div>
        </div>
    );
}

export default RegisterPage;
