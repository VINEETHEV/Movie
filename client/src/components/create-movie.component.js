import React, { Component } from 'react';
import axios from 'axios';

export default class CreateMovie extends Component {
  constructor(props) {
    super(props);

    this.onChangename = this.onChangename.bind(this);
    this.onChangeDescription = this.onChangeDescription.bind(this);
    this.onChangeDuration = this.onChangeDuration.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.onChangeDirector = this.onChangeDirector.bind(this);
    this.onChangeLanguage = this.onChangeLanguage.bind(this);

    this.state = {
      name: '',
      description: '',
      duration: '',
      director: '',
      language: ''
    }
  }


  onChangename(e) {
    this.setState({
      name: e.target.value
    })
  }

  onChangeDescription(e) {
    this.setState({
      description: e.target.value
    })
  }

  onChangeDuration(e) {
    this.setState({
      duration: e.target.value
    })
  }


  onChangeDirector(e) {
    this.setState({
      director: e.target.value
    })
  }

  onChangeLanguage(e) {
    this.setState({
      language: e.target.value
    })
  }

  onSubmit(e) {
    e.preventDefault();

    const movie = {
      name: this.state.name,
      description: this.state.description,
      duration: this.state.duration,
      director: this.state.director,
      language: this.state.language
    }

    console.log(movie);

    axios.post('/api/movies/add', movie)
      .then(res => console.log(res.data));

    window.location = '/';
  }

  render() {
    return (
    <div>
      <h3>Create New Movie</h3>
      <form onSubmit={this.onSubmit}>
        <div className="form-group"> 
          <label>Name: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.name}
              onChange={this.onChangename}
              />
        </div>
        <div className="form-group"> 
          <label>Description: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.description}
              onChange={this.onChangeDescription}
              />
        </div>
        <div className="form-group">
          <label>Duration (in minutes): </label>
          <input 
              type="text" 
              className="form-control"
              value={this.state.duration}
              onChange={this.onChangeDuration}
              />
        </div>

        <div className="form-group"> 
          <label>Director: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.director}
              onChange={this.onChangeDirector}
              />
        </div>

        <div className="form-group"> 
          <label>Language: </label>
          <input  type="text"
              required
              className="form-control"
              value={this.state.language}
              onChange={this.onChangeLanguage}
              />
        </div>


        <div className="form-group">
          <input type="submit" value="Create Movie" className="btn btn-primary" />
        </div>
      </form>
    </div>
    )
  }
}
