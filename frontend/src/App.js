import React, { Component } from 'react';

import Profile from './profile';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results: [],
      keyword: '',
      viewProfile: false,
    }
    this.viewProfile = this.viewProfile.bind(this);
  }

  search() {
    if (this.state.keyword.length === 0) {
      return;
    }
    const baseUrl = 'https://betterapi.grahampaye.com/v1/api';
    const payload = JSON.stringify(Object.assign(this.state));
    const header = new Headers({
      'Access-Control-Allow-Origin': '*',
    });
    (async () => {
      const response = await fetch(`${baseUrl}/search/${this.state.keyword}`, { header, method: 'GET', });
      const json = await response.json();
      const newResults = [];
      if (json.data && json.data.length) {
        json.data.forEach((dr) => {
          newResults.push(dr);
        });
      }
      this.setState({ results: newResults });
    })();
  }

  handleChange(property) {
    return e => this.setState({ [property]: e.currentTarget.value }, this.search);
  }

  typeAhead() {
    if (this.state.results.length) {
      return (
        <ul className={"typeahead"} >
          {this.state.results.map((dr, idx) => 
            <li 
              key={dr.npi} 
              data={dr}
              onClick={() => this.viewProfile(`${idx}`)}
            >
              {`Dr. ${dr.profile.first_name} ${dr.profile.last_name}`}
            </li>)}
        </ul>
      );
    }
  }

  viewProfile(idx) {
    const profile = this.state.results[idx];
    this.setState({ viewProfile: profile, keyword: '', results: [] });
  }

  render() {
    return (
      <div className="App">
        <div className="search-box">
          <h1>Find A Doctor</h1>
          <div className="search-input-box">
            <input 
              type="text" 
              placeholder="name" 
              className="search-input" 
              onChange={this.handleChange('keyword')} 
              value={this.state.keyword} 
            />
            <a className="search-button" onClick={() => this.search()} >
              <i className="fa fa-stethoscope" aria-hidden="true"></i>
            </a>
            {this.state.results.length !==0 ? this.typeAhead() : <div className="hidden"></div>}
          </div>
        </div>
        <Profile dr={this.state.viewProfile} />
      </div>
    );
  }
}

export default App;
