import React, { Component } from 'react';
import axios from 'axios';

class MovieCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      news_results: []
    };
  }

  componentDidMount() {
    const { movie } = this.props;

    const url = 'http://localhost:1337/gateway.watsonplatform.net:443/discovery/api/v1/environments/system/collections/news-en/query?version=2018-08-01&count=2&deduplicate=false&natural_language_query=' + movie.title;
    const user = ''; //Discovery user as string
    const pass = ''; //Discovery password as string
    // const url = 'http://localhost:1337/api.twitter.com:443/1.1/search/tweets.json?q=venom' // for twitter
    const creds = btoa(user + ':' + pass);
    // const basicAuth = 'Bearer bearer-token-for-twitter-goes-here';
    const basicAuth = 'Basic ' + creds;
    // console.log(url);
    // console.log(basicAuth);
    axios.get(url, {
      headers: { 'Authorization': basicAuth }
    }).then(res => {
      // console.log('got result back!');
      // console.log(res);
      this.setState({ news_results: res.data.results });
    })
  }

  render() {
    const { movie } = this.props;
    return (
      <div>
        {movie.title}
        <ul>
          { this.state.news_results.map((result) => {
            return (
              <li
                key={result.id}
              >
                <a href={result.url}>
                  {result.title}
                </a>
              </li>
            )}
          )}
        </ul>
      </div>
    )
  }
}

export default MovieCard;