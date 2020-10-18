import Axios from 'axios';
import React,{useEffect, useState} from 'react'
import './favorite.css';
import {Popover} from 'antd';
import {IMAGE_BASE_URL} from '../../Config';

function FavoritePage() {


    const [Favorites, setFavorites] = useState([])

    useEffect(() => {
        fetchFavoredMovie()
    }, [])

    const fetchFavoredMovie = () => {
        Axios.post('/api/favorite/getFavoredMovie',{userForm:localStorage.getItem('userId')})
        .then(response => {
            console.log(response.data)
            if(response.data.success){
                setFavorites(response.data.favorites)
            }else {
                alert('Failed to load movie information')
            }
        })

    }

    const onClickDelete = (movieId,userForm) => {
        const variables = { 
            movieId,
            userForm
        }

        Axios.post('/api/favorite/removeFromFavorite',variables)
            .then(response =>{
                if(response.data.success){
                    fetchFavoredMovie()
                }else { 
                    alert('Failed to remove favorite')
                }
            })
        }

    const renderCards = Favorites.map((favorite,index) => {
       
        const content = (
            <div>
                {favorite.moviePost ? 
                <img src={`${IMAGE_BASE_URL}w500${favorite.moviePost}`} /> :"no image"}
            </div>
        )

        return <tr key={index}>

          <Popover content={content} title={`${favorite.movieTitle}`}>
              <td>{favorite.movieTitle}</td>
          </Popover>

          <td>{favorite.movieRunTime} mins</td> 
          <td><button onClick={() => onClickDelete(favorite.movieId,favorite.userForm)}>Remove</button></td>
        </tr>
    })
  
    return (
        <div style={{width :'85%', margin : '3rem auto'}}>
            <h2>Favorite  Movies</h2>
            <hr />


            <table>
                <thead>
                    <tr>
                        <th>Movie Title</th>
                        <th>Movie RunTime</th>
                        <th>Movie from favorites</th>
                    </tr>
                </thead>
                <tbody>
        
                {renderCards}

                </tbody>
            </table>
        </div>
    )
}

export default FavoritePage
