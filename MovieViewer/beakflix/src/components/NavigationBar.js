import '../stylesheet/NavigationBar.css';
import {useNavigate} from "react-router-dom";

function NavigationBar(props) {
    let navigate = useNavigate();

    function clickEventHandler(event) {
        if (props.session.status === "Sign In") {
            navigate("/login");
        } else {
            alert("You have signed out");
            props.setSession({
                login : true,
                status : "Sign In"
            });

            //Change user state
            props.setUser({
                name : "Guest",
                favorite_list : {},
                recent_watch_list : {}
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
