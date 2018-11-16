import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import $ from 'jquery';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      row: "Please type above...",
      value: ""

    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.keyPressed= this.keyPressed.bind(this);

  }

  handleChange(event) {
    this.setState({ value: event.target.value });
  }

  handleSubmit(event) {
    this.performSearch(this.state.value)
    event.preventDefault();
  }
  keyPressed(event)
{
  if(event.key=="Enter")
  {
    this.performSearch(this.state.value)
    event.preventDefault();
  }
}

  performSearch(searchTerm) {
    const urlString = "http://api.giphy.com/v1/gifs/search?api_key=SZohhq3UD65msi3MleOOBggWYNA3mzZX&q=" + searchTerm;
    $.ajax(
      {
        url: urlString,
        success: (searchResults) => {
          const results = searchResults.data
          var resultrows = []
          results.forEach((result) => {
            const resultrow = <div class="result-card" >
              <table key={result.id}>
                <tbody>
                  <tr>
                    <td className="image-box">
                      <img src={result.images.downsized.url} className="img-size" />
                    </td>
                    <td className="details-box">
                      <div className="title"><h3>{result.title}</h3></div>
                      <div className="App-link">
                        <a href={result.source}>Go To Source</a>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            resultrows.push(resultrow)

          })
          this.setState({ row: resultrows })
        },
        error: (xhr, status, err) => {
          console.error("failed")
        }
      }
    ) }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div class="head-text">
            <h1>GIF Xplore</h1>
          </div>
        </header>
        <div class="content-area">
          <div class="search-area">
            <div class="search-bar">
              <input type="text" class="inputfield" placeholder="Start Exploring..." value={this.state.value} onChange={this.handleChange}  onKeyPress={this.keyPressed} />
            </div>
            <div class="button-area">
              <button class="custom-button" onClick={this.handleSubmit} >Explore</button>
            </div>
          </div>
          <div class="search-result">
            {this.state.row}
          </div>

        </div>
      </div>
    );
  }
}

export default App;
