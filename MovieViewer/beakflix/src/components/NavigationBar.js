import '../stylesheet/NavigationBar.css';
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {resetCookieConsentValue} from "react-cookie-consent";

function NavigationBar(props) {
    let navigate = useNavigate();

    async function deleteCookieSession() {
        await axios.get('/credential/deleteCookie')
            .then(resp => {
                console.log(resetCookieConsentValue());
                resetCookieConsentValue()
            })
            .catch(err => {
                console.error(err);
            });
    }


    async function sessionLogOut() {
        await axios.get('/credential/sessionLogout')
            .then((resp) => {
                console.error(resp);
            })
            .catch(err => {
                console.error(err);
            });
    }

    function clickEventHandler(event) {
        if (props.session.status === "Sign In") {
            navigate("/login");
        } else {

            deleteCookieSession();
            sessionLogOut();

            props.setSession({
                login : false,
                status : "Sign In"
            });

            props.setUser({
                name : 'Guest',
                favorite_list : [],
            });

            navigate("/home");
        }
    }

    return (
        <div id="navigation_bar">
            <h1 className="nav_title" onClick={(e) => {navigate("/home");}}>BAEKFLIX</h1>
            <button id="login_button" className="nav_button" onClick={clickEventHandler}>
                {props.session.status}
            </button>

            <label id="user_label" className="nav_label">
                Welcome! {props.user.name}
            </label>
        </div>
    );
}

export default NavigationBar;
