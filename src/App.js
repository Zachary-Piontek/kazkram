import React, { useEffect, useState } from 'react';
import './App.css';
import LazyLoad from 'react-lazy-load';

const newsApi = process.env.REACT_APP_NEWS_API_KEY;
const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApi}`;
const randomImage = `https://source.unsplash.com/400x300/?news`;

function App() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    fetch(newsApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
      });
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      const searchUrl = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${newsApi}`;
      fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
          setNews(data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
          setShowSearchResults(true);
          setSearchTerm(''); // Reset the search term
        });
    }
  };

  const handleSportsClick = () => {
    const sportsUrl = `https://newsapi.org/v2/everything?q=sports&apiKey=${newsApi}`;
    fetch(sportsUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
        setShowSearchResults(true);
      });
  };

  const handleBusinessClick = () => {
    const businessUrl = `https://newsapi.org/v2/everything?q=business&apiKey=${newsApi}`;
    fetch(businessUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
        setShowSearchResults(true);
      });
  };

  const handleTechnologyClick = () => {
    const technologyUrl = `https://newsapi.org/v2/everything?q=technology&apiKey=${newsApi}`;
    fetch(technologyUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
        setShowSearchResults(true);
      });
  };

  const handleEntertainmentClick = () => {
    const entertainmentUrl = `https://newsapi.org/v2/everything?q=entertainment&apiKey=${newsApi}`;
    fetch(entertainmentUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
        setShowSearchResults(true);
      });
  };

  const handleScienceClick = () => {
    const scienceUrl = `https://newsapi.org/v2/everything?q=science&apiKey=${newsApi}`;
    fetch(scienceUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
        setShowSearchResults(true);
      });
  };

  const handleHealthClick = () => {
    const healthUrl = `https://newsapi.org/v2/everything?q=health&apiKey=${newsApi}`;
    fetch(healthUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
        setShowSearchResults(true);
      });
  };

  const handleMoneyClick = () => {
    const moneyUrl = `https://newsapi.org/v2/everything?q=money&apiKey=${newsApi}`;
    fetch(moneyUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles.sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt)));
        setShowSearchResults(true);
      });
  };

  const handleGoBack = () => {
    setShowSearchResults(false);
    setSearchTerm('');
    fetch(`${newsApiUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
      });
  };

  return (
    <div className="App">
      <div className='header'>
        <h1>Kazkram News 📰</h1>
        <form onSubmit={handleSearch} className='search-form'>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search all news" />
          <button type="submit">Search</button>
        </form>
        <div className='topics'>
        {showSearchResults && <button onClick={handleGoBack}>Go back to homepage</button>}
          <button onClick={handleSportsClick}>Sports</button>
          <button onClick={handleBusinessClick}>Business</button>
          <button onClick={handleTechnologyClick}>Technology</button>
          <button onClick={handleEntertainmentClick}>Entertainment</button>
          <button onClick={handleScienceClick}>Science</button>
          <button onClick={handleHealthClick}>Health</button>
          <button onClick={handleMoneyClick}>Money</button>
        </div>
        {showSearchResults ? (
          <div className='news'>
            {news.map((article, index) => (
              <div key={index} className="news-articles">
                <h2>{article.title}</h2>
                <LazyLoad offset={300}>
                <img
                  src={article.urlToImage || randomImage}
                  alt={article.title} />
                </LazyLoad>
                <h3>{new Date(article.publishedAt).toDateString()}</h3>
                <a href={article.url}>Read more</a>
              </div>
            ))}
          </div>
        ) : (
          <div className='news'>
            {news.map((article, index) => (
              <div key={index} className="news-articles">
                <h2>{article.title}</h2>
                <LazyLoad offset={300}>
                <img
                  src={article.urlToImage || randomImage}
                  alt={article.title} />
                </LazyLoad>
                <h3>{new Date(article.publishedAt).toDateString()}</h3>
                <a href={article.url}>Read more</a>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default App;