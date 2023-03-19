import React, { useEffect, useState } from 'react';
import './App.css';

const newsApi = process.env.REACT_APP_NEWS_API_KEY;
const newsApiUrl = `https://newsapi.org/v2/top-headlines?country=us&apiKey=${newsApi}`;
const randomImage = `https://source.unsplash.com/1600x900/?news`;

function App() {
  const [news, setNews] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  useEffect(() => {
    const cachedNews = localStorage.getItem('news');
    if (cachedNews) {
      setNews(JSON.parse(cachedNews));
    } else {
      fetch(newsApiUrl)
        .then((response) => response.json())
        .then((data) => {
          setNews(data.articles);
          localStorage.setItem('news', JSON.stringify(data.articles));
        });
    }
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm) {
      const searchUrl = `https://newsapi.org/v2/everything?q=${searchTerm}&apiKey=${newsApi}`;
      fetch(searchUrl)
        .then((response) => response.json())
        .then((data) => {
          setNews(data.articles);
          localStorage.setItem('news', JSON.stringify(data.articles));
          setShowSearchResults(true);
        });
    }
  };

  const handleGoBack = () => {
    setShowSearchResults(false);
    setSearchTerm('');
    fetch(newsApiUrl)
      .then((response) => response.json())
      .then((data) => {
        setNews(data.articles);
        localStorage.setItem('news', JSON.stringify(data.articles));
      });
  };

  if (!news.length) {
    return <p>Loading...</p>;
  }

  return (
    <div className="App">
      <div className='header'>
        <h1>Kazkram News</h1>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search all news"
          />
          <button type="submit">Search</button>
        </form>
      </div>
      {showSearchResults ? (
        <div className='news'>
          <button onClick={handleGoBack}>Go back to homepage</button>
          {news.map((article, index) => (
            <div key={index} className="news-articles">
              <h2>{article.title}</h2>
              <img
                src={article.urlToImage || randomImage}
                alt={article.title}
              />
              <a href={article.url}>Read more</a>
            </div>
          ))}
        </div>
      ) : (
        <div className='news'>
          {news.map((article, index) => (
            <div key={index} className="news-articles">
              <h2>{article.title}</h2>
              <img
                src={article.urlToImage || randomImage}
                alt={article.title}
              />
              <a href={article.url}>Read more</a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;