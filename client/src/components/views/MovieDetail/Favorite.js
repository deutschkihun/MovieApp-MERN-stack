import React,{useEffect,useState} from 'react'
import Axios from 'axios';
import {Button} from 'antd';

function Favorite(props) {

    const movieId = props.movieId
    const userForm = props.userForm
    const movieTitle = props.movieInfo.title
    const moviePost = props.movieInfo.backdrop_path
    const movieRunTime = props.movieInfo.runtime

    const [FavoriteNumber, setFavoriteNumber] = useState(0)
    const [Favorited, setFavorited] = useState(false)

    let variables = {
        userForm,
        movieId,
        movieTitle,
        moviePost,
        movieRunTime
    }

    //==How many people add this movie in Favorite List==// 
    useEffect(() => {
       
            // request to server : Axios or fetch !! 
            // we are not getting all information from server. Set variables to get information, which we want to have.
            // use Axios to send it to server (index.js => router => favorite.js => post('/favoriteNumber') )
            Axios.post('/api/favorite/favoriteNumber', variables)
                .then(response => {
                    console.log(response.data)
                    setFavoriteNumber(response.data.favoriteNumber)
                    if(response.data.success){                    
                    }else {
                        alert('Failed to get the information from Favorite model')
                    }
                })

            // use Axios to send it to server (index.js -> router -> favorite.js => post('/favorited'))
            Axios.post('/api/favorite/favorited', variables)
                .then(response => {
                    console.log(response.data)
                    setFavorited(response.data.favorited)
                    if(response.data.success){                    
                    }else {
                        alert('Failed to get the favorite information')
                    }
                })       
        
    }, [])
    const onClickFavorite = () => { 

        if(Favorited){
            Axios.post('/api/favorite/removeFromFavorite',variables)
                .then(response =>{
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber-1)
                        setFavorited(!Favorited)
                    }else { 
                        alert('Failed to remove from FavoriteList')
                    }
                })
            } 
            else {
            Axios.post('/api/favorite/addToFavorite',variables)
                .then(response => {
                    if(response.data.success){
                        setFavoriteNumber(FavoriteNumber+1)
                        setFavorited(!Favorited)
                        // !Favorited is switcher : from true to false and from false to true 
                        // It doesn't mean that !Favorited = true (default value of Favorited is false)
                    } else { 
                        alert('Failed to add into FavoriteList')
                    }
                }) 
        }
    }
    return (
        <div>
            <Button onClick={onClickFavorite}>{Favorited ? "Not Favorited" : "Add to Favorite"} {FavoriteNumber} </Button>
        </div>
    )
}
export default Favorite
