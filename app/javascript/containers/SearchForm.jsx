import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import axios from 'axios';

const SearchForm = () => {
  const [query, setQuery] = useState({
    selectedCategory: '',
  });
  const [avaiableCategories, setAvaiableCategories] = useState([]);
  const [redirect, setRedirect] = useState(false);
 

  useEffect(() => {
    axios.get('/api/v1/professionals/categories', { withCredentials: true })
      .then(res => {
        if (res.statusText === 'OK') {
          setAvaiableCategories(res.data);
        };
      });
  }, []);

  const handleChange = e => {
    const { value, name } = e.target;
    setQuery({...query, [name]: value});
  };

  const handleSubmit = e => {
    e.preventDefault();
    setRedirect(true);
  };

  const { selectedCategory } = query;

  if (redirect) {
    return (
      <Redirect to={`/results/${selectedCategory}`} />
    );
  };

  return (
    <div className="stack">
    <form onSubmit={handleSubmit} className="board">
    <label htmlFor="category" className="col-12 queue">
    <p>Category:</p>
    <select id="category" name="selectedCategory" onChange={handleChange}>
    <option value="">-- Select a Category --</option>
    {
      avaiableCategories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))
    }
    </select>
    </label>
    <button type="submit" onSubmit={handleSubmit}>Submit</button>
    </form>
    </div>
  )
}

export default SearchForm;
