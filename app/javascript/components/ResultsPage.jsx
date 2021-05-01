import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ProfessionalsSelector from './subComponents/ProfessionalSelector';
import loadingGif from '../../assets/gifs/loading.gif';

const ResultsPage = ({ match: { params: { query } } }) => {
  const [dataArray, setDataArray] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    axios.get(`/api/v1/professionals/categories/${query}`)
      .then((res) => {
        if (res.statusText === 'OK') {
          setDataArray(res.data);
        } else {
          throw new Error();
        }
      })
      .then(() => setLoaded(true))
      .catch((err) => err);
  }, [query]);

  return dataArray && loaded ? (
    <div className="board">
      {
        dataArray.map((obj) => (
          <div key={obj.phone_number} className="col-l-3 col-m-6 col-12">
            <ProfessionalsSelector data={obj} />
          </div>
        ))
      }
    </div>
  ) : (
    <>
      <div className="queue center">
        <img src={loadingGif} alt="" />
      </div>
    </>
  );
};

ResultsPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      query: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default ResultsPage;
