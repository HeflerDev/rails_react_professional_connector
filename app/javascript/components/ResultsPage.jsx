import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import ProfessionalsSelector from './subComponents/ProfessionalSelector';

const ResultsPage = ({ match: { params: { query } } }) => {
  const [dataArray, setDataArray] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/professionals/categories/${query}`)
      .then((res) => {
        if (res.statusText === 'OK') {
          setDataArray(res.data);
        } else {
          throw new Error();
        }
      })
      .then(() => setDataArray({ ...dataArray, redirect: true }))
      .catch((err) => err);
  }, []);

  return dataArray ? (
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
      Loading ...
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
