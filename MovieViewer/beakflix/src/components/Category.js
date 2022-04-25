import '../stylesheet/Category.css';
import axios from "axios";
import React, {useEffect, useState} from 'react';
import MovieCard from "./MovieCard";
import LoadingComponent from "./LoadingComponent";

//Separate movie by genres
function Category(props) {
    //Stores Top 10 movies

    const [loadStatus, setLoadStatus] = useState(false);
    const [movieCardList, setMovieCardList] = useState([]);
    const [movieList, setMovieList] = useState([]);


    async function createMovieCard() {
        let list = [];
        for (let i = 0; i < movieList.length; i++) {
            list.push(<MovieCard key={i} data={movieList[i]} user={props.user}/>);
        }
        setMovieCardList(list);
        setLoadStatus(true);
    }

    async function getMoviesByGenre() {
        //Get Top 10 from each Genres by descending rate order
        let form = {
            "genre" : props.title,
        }
        await axios.post('/movie/getMoviesByGenre', form)
            .then(async (resp) => {
                //Do something with data
                if (resp.data !== null) {
                    await setMovieList(resp.data);
                }
            })
            .then(() => {
                createMovieCard();
            })
            .catch(err => {
                console.error(err);
            });
    }

    //Execute this after page load
    useEffect(() => {
        getMoviesByGenre();

    }, []); //Load only once

    //Execute this after page load
    useEffect(() => {
        createMovieCard();
    });

    return (
        <div className="category_panel">
            <h1>{props.title}</h1>
            <div className="card_field">
                {loadStatus === false ? <LoadingComponent/> : movieCardList}
            </div>
        </div>
    );
}

export default Category;