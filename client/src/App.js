import logo from './logo.svg';
import './App.css';
import React, { useState, useEffect } from'react';

function App() {
  const [reviews, setReviews] = useState([])
  useEffect(() => {
    fetch('http://localhost:4000/')
        .then(res => res.json())
        .then(data => setReviews(data))
  }, [])
  return (
      <div className="App">
        <header className="App-header">
          <h1>All Reviews</h1>
          {reviews && reviews.map(blog => (
              <div key={blog.id}>{blog.title}</div>
          ))}
        </header>
      </div>
  );
}

export default App;
