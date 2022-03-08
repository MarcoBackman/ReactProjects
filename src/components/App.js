import '../css/App.css';
import Search from "./Search";
import UserContext from "./User";
import Navigation from "./Navigation";
import {useState,useEffect} from 'react';

//let LOCAL_DATA_FILE = require(`./../recipes.json`);

function App() {
    const [data,setData]=useState([]);

    const user = {
        name : "Tony Baek",
        favoriteList : []
    }

    const fetchData = () => {
        fetch("/recipes.json")
        .then(response => {
            return response.json();
        }).then(data => {
            setData(data);
        });
    }

    useEffect(()=>{
        fetchData();
    },[])

    return (
        <UserContext.Provider value={user}>
            <div>
                <Navigation user={user}/>
                <h1 id="main_title">Recipe Finder</h1>
                <Search userData={user} recipeData = {data}/>
            </div>
        </UserContext.Provider>
    );
}

export default App;
