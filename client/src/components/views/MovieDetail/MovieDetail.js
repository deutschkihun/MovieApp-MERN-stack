import React,{useEffect,useState} from 'react'
import { API_KEY,API_URL,IMAGE_BASE_URL } from '../../Config'
import MainImage from '../commons/MainImage';
import MovieInfo from './MovieInfo';
import GridCards from '../commons/GridCards';
import {Row} from 'antd';
import Favorite from './Favorite';

function MovieDetail(props) {
    

    let movieId = props.match.params.movieId
    const [Movie, setMovie] = useState([])
    const [Casts, setCasts] = useState([])
    const [ActorToggle, setActorToggle] = useState(false)
    useEffect(() => {

        let endpointCrew = `${API_URL}movie/${movieId}/credits?api_key=${API_KEY}`;  // with credits = crew information 
        let endpointInfo = `${API_URL}movie/${movieId}?api_key=${API_KEY}`;
        
        fetch(endpointInfo)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setMovie(response)
            })


            fetch(endpointCrew)
            .then(response => response.json())
            .then(response => {
                console.log(response)
                setCasts(response.cast)
            })
       
    }, [])

    const toogleActorView = () => {
        setActorToggle(!ActorToggle) // ActorToggle = true
    }

    return (
        <div>
                {/* Header */}
                <MainImage
                        image={`${IMAGE_BASE_URL}w1280${Movie.backdrop_path}`}
                        title={Movie.original_title}
                        text={Movie.overview}
                        // those are going to MovieDetail as a props !!
                        // image,title,text come from MainImage
                    />

                {/* Body */}
                <div style={{width:'85%',margin:'1rem auto'}}>
                
                {/*Favorite Button */}
                
                <div style={{display:'flex',justifyContent:'flex-end',margin:'2rem'}}>
                <Favorite movieInfo={Movie} movieId ={movieId} userForm={localStorage.getItem('userId')}/> 
                {/* we need movieinfo,movieid and userForm for Favorite list */}   

                </div>
             
                {/*
                 movieId ={movieId}, movieId in {} is the url information,that user can see on the url
                 movieId in {} = props.match.params.movieId

                localStorage.getItem('userId')

                when user login into the web site. You can see the userId and value on the Application (inspection -> Application -> Local Storage -> your localost)
                we will call this userId information to use for userForm

                */}

                {/* MovieInfo, movie comes from MovieInfo */}
                <MovieInfo movie={Movie} /> 
                  
                <div style={{display:'flex',justifyContent:'center',margin:'2rem'}}>
                        <button onClick={toogleActorView}>Toogle Actor view</button>
                </div>
                {/* Actor grid */}
                {ActorToggle &&
                <Row gutter={[16, 16]} >

                {Casts && Casts.map((cast, index) => (
                    <React.Fragment key={index}>
                        <GridCards
                           image={cast.profile_path ?
                           `${IMAGE_BASE_URL}w500${cast.profile_path}` : null}
                            castName={cast.name}/>
                        </React.Fragment>
                    ))}
                    </Row>
                    }

                  </div>
        </div>
    )
}

export default MovieDetail
