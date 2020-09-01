import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Movie = props => (
  <tr>
    <td>{props.movie.name}</td>
    <td>{props.movie.description}</td>
    <td>{props.movie.duration}</td>
    <td>{props.movie.director}</td>
    <td>{props.movie.language}</td>
    <td>
      <Link to={"/edit/"+props.movie._id}>edit</Link> | <a href="#" onClick={() => { props.deleteMovie(props.movie._id) }}>delete</a>
    </td>
  </tr>
)

export default class MoviesList extends Component {
  constructor(props) {
    super(props);

    this.deleteMovie = this.deleteMovie.bind(this)

    this.state = {movies: []};
  }

  componentDidMount() {
    axios.get('http://localhost:5000/api/movies/')
      .then(response => {
        this.setState({ movies: response.data })
      })
      .catch((error) => {
        console.log(error);
      })
  }

  deleteMovie(id) {
    axios.delete('http://localhost:5000/api/movies/'+id)
      .then(response => { console.log(response.data)});

    this.setState({
      movies: this.state.movies.filter(el => el._id !== id)
    })
  }

  movieList() {
    return this.state.movies.map(currentmovie => {
      return <Movie movie={currentmovie} deleteMovie={this.deleteMovie} key={currentmovie._id}/>;
    })
  }

  render() {
    return (
      <div>
        <h3>Movies</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Name</th>
              <th>Description</th>
              <th>Duration(in minutes)</th>
              <th>Director</th>
              <th>Language</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            { this.movieList() }
          </tbody>
        </table>
      </div>
    )
  }
}