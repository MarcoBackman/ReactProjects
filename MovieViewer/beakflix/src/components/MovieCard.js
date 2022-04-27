import '../stylesheet/MovieCard.css';
import { MdOutlineFavorite, MdFavoriteBorder } from 'react-icons/md';
import { GrView } from 'react-icons/gr';

import React, {useEffect, useState} from 'react';
import UserContext from './UserContext';
import axios from "axios";

function convertTime(duration) {
    let time_string = ""
    let remainders = parseInt(duration / 60);
    let minutes = remainders % 60;
    remainders = parseInt(remainders / 60);
    let hours = remainders % 60;
    if (hours !== 0) {
        time_string += hours + "h";
    }

    if (minutes === 0) {
        time_string += "00m";
    } else if (minutes < 10) {
        time_string += "0" + minutes + "m";
    } else {
        time_string += minutes + "m";
    }
    return time_string;
}

function MovieCard(props) {
    const [icon, setIcon] = useState(<MdFavoriteBorder/>);
    const [iconText, setIconText] = useState("Like");
    const [button, setButton] = useState(null);
    let changed = false;

    function identifyUserFavorite() {
        if (props.user.name !== "Guest") {
            //Check userstate if someone liked the movie
            if (props.user.favorite_list.includes(props.data._id)) {
                setIcon(<MdOutlineFavorite/>);
                setButton(
                    <button type="button"  className="add_favorite" name="add_favorite" onClick={onFavClickHandler}>
                        {icon} {iconText}
                    </button>
                );
            } else {
                setButton(
                    <button type="button"  className="add_favorite" name="add_favorite" onClick={onFavClickHandler}>
                        {icon} {iconText}
                    </button>
                );
            }
        } else {
            setButton(
                null
            );
        }
    }

    async function sync_favorite_list() {
        //get favorite lists first
        await axios.post('/user/favorite', {id : props.user.name})
            .then((resp) => {
                if (resp.data === '') {
                    props.setUser({
                        name : props.user.name,
                        favorite_list : []
                    });
                } else {
                    props.setUser({
                        name : props.user.name,
                        favorite_list : resp.data
                    });
                }
            })
            .catch(err => {
                console.error(err);
            });
    }

    async function requestAddFavorite() {
        console.log("Add request " + props.user.name);
        console.log("id " + props.data._id);
        let target = props.data._id;
        await axios.post('/user/add_favorite', {id : props.user.name, movieId: target})
            .then((resp) => {
                console.log(resp);
            })
            .catch(err => {
                console.error(err);
            });
    }

    async function requestRemoveFavorite() {
        console.log("Remove request");
        let target = props.data._id;
        await axios.post('/user/remove_favorite', {id : props.user.name, movieId: target})
            .then((resp) => {
                console.log(resp);
            })
            .catch(err => {
                console.error(err);
            });
    }

    //identify favorite list on favorite change
    useEffect(() => {
        if (props.user.favorite_list.length > 0) {
            identifyUserFavorite();
        }
    }, [props.user.favorite_list]);

    //Change icon on state change
    useEffect(() => {
        if (props.user.name === "Guest") {
            setButton(null);
        } else {
            setButton(
                <button type="button"  className="add_favorite" name="add_favorite" onClick={onFavClickHandler}>
                    {icon} {iconText}
                </button>
            );
        }
    }, [icon, iconText, props.user.name]);

    //Switch view on clicking detailed view button
    function onViewClickHandler(e) {
        e.preventDefault();
    }

    //change icon and statement on fav button click
    async function onFavClickHandler(e) {
        e.preventDefault();
        //If not liked -> add to user favorite DB
        if (iconText === "Like") {
            //Add to DB first
            requestAddFavorite();
            setIcon(<MdOutlineFavorite/>);
            setIconText("Unlike");
            sync_favorite_list();
        } else {
            //Remove from user favorite DB
            requestRemoveFavorite();
            setIcon(<MdFavoriteBorder/>);
            setIconText("Like");
            sync_favorite_list();
        }
    }

    return (
        <article className="movieCard">
            <img className="movie_img"
                 src={props.data.image_url.replace("http", "https")}
                 onError={(e)=>{e.target.onerror = null; e.target.src='./movie.jpg'}}>
            </img>
            <div className="movie_title"   style={{flexDirection:'row',flexWrap: 'wrap'}}>
                <p style={{ flexWrap: 'wrap'}}>{props.data.title}</p>
            </div>
            <p>Rating: {props.data.rating}</p>
            <p>Duration: {convertTime(props.data.running_time_secs)}</p>
            <button type="button" className="view_detail" name="view_detail"
                    onClick={onViewClickHandler}>
                <GrView/> View Movie
            </button>
            {button}
        </article>
    );
}

export default MovieCard;