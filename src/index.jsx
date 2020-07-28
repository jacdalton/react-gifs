import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import giphy from 'giphy-api';

import '../assets/stylesheets/application.scss';

const giphyKey = process.env.GIPHY_API_KEY;

class Gif extends Component {
  handleClick = () => {
    if(this.props.selectGif) {
      this.props.selectGif(this.props.id);
    }
  }

  render() {
    const src = `https://media2.giphy.com/media/${this.props.id}/200.gif`;
    return(
      <img src={src} className="gif" onClick={this.handleClick}></img>
    );
  }
}

const GifList = (props) => {
  return(
    <div className="gif-list">
      {props.gifs.map(gif => <Gif id={gif.id} key={gif.id} selectGif={props.selectGif} />)}
    </div>
  );
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      focused: false
    };
  }
  handleChange = (event) => {
    this.props.searchFn(event.target.value);
  }

  // handleFocus = () => {
  //   if(!this.state.focused) {
  //     this.setState({ focused: true });
  //   } 
  // }

  // handleBlur = () => {
  //   if(this.state.focused) {
  //     this.setState({ focused: false });
  //   }
  // }

  render() {
    return (
      <input type="text" className={this.state.focused ? "form-control form-search focused" : "form-control form-search"} onChange={this.handleChange} /*onFocus={this.handleFocus} onBlur={this.handleBlur}*/ ></input>
    );
  }
}

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gifs: [],
      selectedGifId: "xT9IgDEI1iZyb2wqo8"
    };
  }

  search = (query) => {
    giphy({ apiKey: giphyKey, https: true })
      .search({
        q: query,
        rating: 'g',
        limit: 10
      }, (err, result) => {
        this.setState({
          gifs: result.data
        });
      });
  }

  selectGif = (id) => {
    this.setState({ selectedGifId: id });
  }

  render() {
    return (
      <div>
        <div className="left-scene">
          <SearchBar searchFn={this.search}/>
          <div className="selected-gif">
            <Gif id={this.state.selectedGifId} />
          </div>
        </div>
        <div className="right-scene">
          <div className="gif-list">
            <GifList gifs={this.state.gifs} selectGif={this.selectGif} />
          </div>
        </div>
      </div>
    );
  }
}

const root = document.getElementById('root');
if (root) {
  ReactDOM.render(<App />, root);
}
