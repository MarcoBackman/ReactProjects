import '../css/App.css';
import Search from "./Search";
import UserContext from "./User";
import Navigation from "./Navigation";
import React, {useState} from 'react';
function App() {


    const [userData,setUserData] = useState({
        name : "Tony Baek",
        favorite_list : {},
        grocery_list : []
    });

    return (
        <UserContext.Provider value={userData}>
            <div>
                <Navigation user={userData}/>
                <h1 id="main_title">Recipe Finder</h1>
                <Search userData={userData} setUserData={setUserData}/>
            </div>
        </UserContext.Provider>
    );
}

export default App;
