import React, { useState, useEffect } from 'react';
import ProfessionalsSelector from './subComponents/ProfessionalSelector';
import axios from 'axios';

const ResultsPage = ({match: {params: { query }}}) => {
  const [dataArray, setDataArray] = useState(null);

  useEffect(() => {
    axios.get(`/api/v1/professionals/categories/${query}`)
    .then(res => {
      if (res.statusText === 'OK') {
        setDataArray(res.data);
      } else {
        throw new Error();
      }
    })
      .then(() => setRoute({...route, redirect: true}))
      .catch((err) => err);
  }, []);

  return dataArray ? (
    <div className="board">
      {
        dataArray.map(obj => (
          <div key={obj.phone_number} className="col-l-4 col-m-6 col-12">
            < ProfessionalsSelector data={obj} />
          </div>
        ))
      }
    </div>
  ) : (
    <>
      Loading ...
    </>
  )
}

export default ResultsPage
