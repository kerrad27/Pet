import React, {useState, useEffect} from 'react'
import axios from './axios';
import './Row.css';
import YouTube from 'react-youtube';
import movieTrailer from 'movie-trailer';

// `https://api.themoviedb.org/3${fetchUrl}`

const base_url ="https://image.tmdb.org/t/p/original/";
// const img_error = "http://artismedia.by/blog/wp-content/uploads/2018/05/in-blog2-1.png"

// test

function Row({title, fetchUrl, isLargeRow}) {
    const [movies, setMovies] = useState([]);
    const [trailerUrl, setTrailerUrl] = useState("");

    useEffect(() =>{

        async function fetchData() {
            const request = await axios.get(fetchUrl);
            setMovies(request.data.results);
            return request;
        }
        fetchData();
    }, [fetchUrl]);

    const opts = {
        height: '390',
        width:"100%",
        playerVars: {
             autoplay:1,
        }
    }

    const handleClick = (movie) => {
        if (trailerUrl){
            setTrailerUrl('');
            console.log( setTrailerUrl(''),trailerUrl )
            console.log(movie)
        }else{
            movieTrailer( null, { tmdbId: movie.id || movie.title} )
            .then((url) => {
                const urlParams = new URLSearchParams(new URL(url).search);
                console.log(setTrailerUrl (urlParams.get('v')))
                

            }).catch((error) => console.log(error))
        }
    }

    return (
        <div className="row">
            <h2> {title} </h2>
            <div className="row_posters">
                {movies.map(movie => (
                    <img 
                        key={movie.id}
                        onClick={() => handleClick(movie)}
                        className={`row_poster ${isLargeRow && "row_posterLarge"}`}
                        src={`${base_url}${isLargeRow ? movie.poster_path : movie.backdrop_path}`} 
                        alt={movie.name} 
                        onError={(e) => {
                                e.target.src = 'https://st2.depositphotos.com/2673929/6455/i/600/depositphotos_64556341-stock-photo-404-symbol.jpg' 
                                e.target.style = 'max-width:167px; object-fit: revert;'
                            }}
                    />
                ))}
            </div>
            {trailerUrl && <YouTube videoId={trailerUrl} opts={opts} />}
        </div>
    )
}


export default Row
