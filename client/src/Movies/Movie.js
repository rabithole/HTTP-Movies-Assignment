import React from "react";
import axios from "axios";
import MovieCard from "./MovieCard";

export default class Movie extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      movie: null
    };
  }

  deleteMovie = (e, id, props) => {
    axios
      .delete(`http://localhost:5000/api/movies/${id}`)
      .then((result) => {
        console.log('Movie has been deleted')
        this.props.history.push('/')
      })
      .catch((error) => {
        console.log(error);
      })
  }

  componentDidMount() {
    this.fetchMovie(this.props.match.params.id);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.match.params.id !== newProps.match.params.id) {
      this.fetchMovie(newProps.match.params.id);
    }
  }

  fetchMovie = id => {
    axios
      .get(`http://localhost:5000/api/movies/${id}`)
      .then(res => this.setState({ movie: res.data }))
      .catch(err => console.log(err.response));
  };

  saveMovie = () => {
    const addToSavedList = this.props.addToSavedList;
    addToSavedList(this.state.movie);
  };

  render(movies, deleteMovie, props) {
    if (!this.state.movie) {
      return <div>Loading movie information...</div>;
    }
console.log(this.props.match.params.id)
    return (
      <div className="save-wrapper">
        <MovieCard movie={this.state.movie} />
        <div className="save-button" onClick={this.saveMovie}>
          Save
        </div>
        <button onClick={(e) => this.deleteMovie(e, this.props.match.params.id)} id='deleteButton'>Delete</button>
      </div>
    );
  }
}


