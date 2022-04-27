import '../stylesheet/Category.css';
import axios from "axios";
import React, {useEffect, useState} from 'react';
import MovieCard from "./MovieCard";
import LoadingComponent from "./LoadingComponent";

//Separate movie by genres
function Category(props) {
    //Stores Top 10 movies for normal case
    const [movieCardList, setMovieCardList] = useState([]);
    const [movieList, setMovieList] = useState([]);
    const [userMovieList, setUserMovieList] = useState([]);


    async function createMovieCard() {
        let list = [];
        for (let i = 0; i < movieList.length; i++) {
            list.push(<MovieCard key={i} data={movieList[i]} user={props.user} setUser={props.setUser}/>);
        }
        setMovieCardList(list);
    }

    async function createUserMovieCard(list) {
        let cardList = [];
        for (let i = 0; i < list.length; i++) {
            //console.log("Creating");
            cardList.push(<MovieCard key={i} data={list[i]} user={props.user}/>);
        }
        setMovieCardList(cardList);
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
                    setMovieList(resp.data);
                }
            })
            .then(() => {
                createMovieCard();
            })
            .catch(err => {
                console.error(err);
            });
    }

    async function getMoviesByLiked (movieID) {
        //find movie - returns map not list!!!
        return await axios.post('/movie/getMovieByID', {movie: movieID})
            .then(async (resp) => {
                if (resp.data !== null) {
                    return resp.data;
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    async function createUserCards() {
        let list = [];
        for (let i = 0; i < props.user.favorite_list.length; i++) {
            let data = await getMoviesByLiked(props.user.favorite_list[i]);
            list.push(data);
        }
        createUserMovieCard(list);
    }

    useEffect(() => {
        if (props.title === "My likes") {
            createUserCards();
        } else {
            getMoviesByGenre();
        }
    }, [props.user, props.user.favorite_list]); //Load only once

    //Execute this after page load
    useEffect(() => {
        createMovieCard();
    }, [movieList]);

    return (
        <div className="category_panel">
            <h1>{props.title}</h1>
            <div className="scroll_panel">
                <div className="card_field">
                    {userMovieList}
                    {movieCardList}
                </div>
            </div>
        </div>
    );
}

export default Category;