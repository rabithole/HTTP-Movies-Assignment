import React, { useState, useEffect } from "react";
import axios from 'axios';

const UpdateMovie = (props) => {
	// const { title, director, metascore, stars } = props.movie;
 console.log(props.match.params.id);
	 const [movie, updateMovie] = useState({
	 	id: '',
	 	title: '',
	 	director: '',
	 	metascore: '',
	 	stars: []
	 })

	useEffect(() => {
		axios
		.get(`http://localhost:5000/api/movies/${props.match.params.id}`)
		.then((result) => {
			console.log(result)
			updateMovie(result.data)
		})
		.catch((error) => {
			console.log(error)
		})
		// we're subscribing to the param, just in case it ever changes
		// so it'll re-fetch with the new ID
	}, [props.match.params.id])

 	const handleChange = (event) => {
		updateMovie({
			...movie,
			[event.target.name]: [event.target.value],
		})
	}

	const handleSubmit = e => {
		e.preventDefault();
// console.log(movie)
		axios 
 		.put(`http://localhost:5000/api/movies/${props.match.params.id}`, movie)
 		.then((result) => {
 			props.history.push('/')
 		})
 		.catch((error) => {
 			console.log(error);
 		})
	}
 	

	return (
		<div id='updateMovie'>
		  <h1>Update Movie</h1>


		  <form id='movieUpdate' onSubmit={handleSubmit}>
		  	<input 
		  		type='text'
		  		name='title'
		  		placeholder='Movie Title'
		  		value={movie.title}
		  		onChange={handleChange}
		  	/>

		  	<input 
		  		type='text'
		  		name='director'
		  		placeholder='Director'
		  		value={movie.director}
		  		onChange={handleChange}
		  	/>

		  	<input 
		  		type='text'
		  		name='metascore'
		  		placeholder='metascore'
		  		value={movie.metascore}
		  		onChange={handleChange}
		  	/>

			<input 
		  		type='text'
		  		name='stars'
		  		placeholder='Actors'
		  		value={movie.stars}
		  		onChange={handleChange}
		  	/>      	

		  	<button>Submit</button>
		  </form>
		</div>
	);
};

export default UpdateMovie;
