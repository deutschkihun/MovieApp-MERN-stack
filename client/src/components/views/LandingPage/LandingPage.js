import React,{useEffect,useState} from 'react'
import {API_URL,API_KEY,IMAGE_BASE_URL} from '../../Config';
import MainImage from '../commons/MainImage';
import GridCards from '../commons/GridCards';
import {Row,Button} from 'antd';

function LandingPage() {

    const [Movies, setMovies] = useState([])
    const [MainMovieImage, setMainMovieImage] = useState(null)
    const [CurrentPage, setCurrentPage] = useState(0)

    useEffect(() => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
        // return popular movie 
        fetchMovies(endpoint)
    }, [])

    const loadMoreItems = () => {
        const endpoint = `${API_URL}movie/popular?api_key=${API_KEY}&language=en-US&page=${CurrentPage+1}`;
        fetchMovies(endpoint)
    }
    // Question : loadMoreItems isn't into the useEffect.... why ?. Because loadMore button doesn't work after access to the component(LandingPage), It works after click the button. 
    // so it's not the part of useEffect

        const fetchMovies =  (endpoint) => {
            fetch(endpoint)
                .then(response => response.json())
                .then(response => {
                    console.log(response) // output in console
                    setMovies([...Movies,...response.results]) // ...Movies mean add new page information, not overwrite
                    setMainMovieImage(response.results[0]) // Main Movie = most popular movie = first element of array = array[0] = response.result[0]
                    setCurrentPage(response.page)
                })
        }

    return (
        <div style={{width:'100%',margin:'0'}}>
            {/*Main Image, MainMovieImage && = if MainMovieImage exist*/}
            {/*Component retrun methods*/}

             {MainMovieImage &&
                <MainImage
                    image={`${IMAGE_BASE_URL}w1280${MainMovieImage.backdrop_path}`}
                    title={MainMovieImage.original_title}
                    text={MainMovieImage.overview}
                    // those are going to MainImage as a props !!
                />
            }
            <div style={{ width: '85%', margin: '1rem auto' }}>

                <h2>Movies by latest</h2>
                <hr />
            
                {/*Movie grid card component*/}
                <Row gutter={[16, 16]} >
                    {Movies && Movies.map((movie, index) => (
                        <React.Fragment key={index}>
                            <GridCards
                                landingPage
                                image={movie.poster_path ?
                                    `${IMAGE_BASE_URL}w500${movie.poster_path}` : null}
                                movieId={movie.id}
                                movieName={movie.original_title}
                                // movie.poster_path ? = if movie.poster_path true 
                            />
                        </React.Fragment>
                    ))}

                </Row>
            </div>

            <div style={{display:'flex',justifyContent:'center'}}>
                <Button onClick={loadMoreItems}>Load more</Button>
            </div>
        </div>
    )
}
export default LandingPage
