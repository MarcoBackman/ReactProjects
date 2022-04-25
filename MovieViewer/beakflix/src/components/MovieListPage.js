import '../stylesheet/MovieListPage.css';
import NavigationBar from "./NavigationBar";
import Category from "./Category";

import React, {useEffect, useState} from 'react';
import axios from "axios";

function MovieListPage(props) {
    //If user is logged in, add two more categories

    //Set list of genres(categories)
    //Key - genre(in alphabetical order) | Value - array[movie set(rate in ascending order)]
    const [genreList, setGenreList]=useState([]);

    //read json file
    const getGenre = async () => {
        //Get Genres
        await axios.get('/movie/getGenreTypes')
            .then(resp => {
                //Get genre on each dictionary
                if (resp.data !== null) {
                    let data = [];
                    for (let i = 0; i < resp.data.length; i++) {
                        //Only allow genres more than 10
                        if (resp.data[i].amount >= 10) {
                            data.push(resp.data[i].genre);
                        }
                    }
                    data.sort(); //Sort in alphabetical order
                    setGenreList(data);
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    //only run once or twice
    useEffect(() => {
        getGenre();
    }, []);

    //create categories
    let listOfCategory = [];
    for (let i = 0; i < genreList.length; i++) {
        listOfCategory.push(<Category key={i} title={genreList[i]} user={props.user}/>);
    }

    return (
        <article id="register_page">
            <NavigationBar user={props.user} setUser={props.setUser} session={props.session} setSession={props.setSession}/>
            <div id="category_holder">
                {listOfCategory}
            </div>
        </article>
    );
}

export default MovieListPage;
