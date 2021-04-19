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
    <div className="search-form-container queue center">
    <form onSubmit={handleSubmit} className="board">
      <div className="col-7 queue">
        <label htmlFor="category">
          <h4>Category:{' '}</h4>
          <select id="category" name="selectedCategory" onChange={handleChange}>
          <option value="">-- Select a Category --</option>
          {
            avaiableCategories.map(category => (
              <option key={category} value={category}>{category}</option>
            ))
          }
          </select>
        </label>
      </div>
      <div className="col-4 queue center">
        <button type="submit" onSubmit={handleSubmit}>Submit</button>
      </div>
    </form>
    </div>
  )
}

export default SearchForm;
