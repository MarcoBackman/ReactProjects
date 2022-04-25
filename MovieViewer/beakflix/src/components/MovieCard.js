import '../stylesheet/MovieCard.css';
import { MdOutlineFavorite, MdFavoriteBorder } from 'react-icons/md';
import { GrView } from 'react-icons/gr';

import React, {useEffect, useState} from 'react';
import UserContext from './UserContext';

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

    const [button, setButton] = useState(null);
    const [icon, setIcon] = useState(null);

    function identifyUser() {
        if (props.user.name !== "Guest") {
            setButton(
                <button type="button"  className="add_favorite" name="add_favorite"
                        onClick={onFavClickHandler}>
                    <MdOutlineFavorite/> Like
                </button>
            );
        } else {
            setButton(
                null
            );
        }
    }

    //Execute this after page load
    useEffect(() => {
        identifyUser();
    });

    //Switch view on clicking detailed view button
    function onViewClickHandler(e) {
        e.preventDefault();
    }

    //change icon and statement on fav button click
    function onFavClickHandler(e) {
        e.preventDefault();
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