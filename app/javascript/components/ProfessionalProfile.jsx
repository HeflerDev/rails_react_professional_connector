import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  user: state.userReducer.user.user
});

const ConnectedProfessionalProfile = ({ user, isLoggedIn, match: {params: {id}}}) => {
  const [profData, setProfData] = useState(null);
  const [displayForm, setDisplayForm] = useState(null);
  const [formData, setFormData] = useState({
    schedule: '',
  });
 
  useEffect(() => {
    axios.get(`/api/v1/show/${id}`)
      .then(res => {
        if (res.statusText === 'OK') {
          setProfData(res.data);
        } else {
          throw new Error();
        }
      })
      .catch(err => console.log(err));
  }, []);

  if (profData) {
    const {
      category,
      name,
      description,
      image,
      hourly_wage,
      currency,
      phone_number,
      email,
      working_days,
    } = profData;

    const handleSubmit = e => {
      e.preventDefault();
      const appointment = {
        user_id: user.id,
        professional_id: id,
        schedule: formData.schedule,
      };
      axios.post('http://localhost:3001/appointments', { appointment }, { withCredentials: true })
        .then((res) => {
          console.log(res)
        });
    };

    const handleChange = e => {
      const { name, value } = e.target;
      setFormData({...formData, [name]: value});
      console.log(formData)
    };

    const handleClick = () => {
      setDisplayForm(true);
    };

    const renderForm = () => {
      if(displayForm) {
        const { schedule } = formData;
        if (isLoggedIn) {
          return(
            <form onSubmit={handleSubmit}>
              <label htmlFor="datepick">
                <p>
                  Time and Date:
                </p>
                <input
                  type="datetime-local"
                  name="schedule"
                  value={schedule}
                  onChange={handleChange}
                />
              </label>
              <button type="submit">Hire</button>
            </form>
          );
        } else {
          return(
            <>
            <p>
              In order to Schedule a session with a professional,
              {' '}
              you must log in.
            </p>
            <p><Link to="/login">Click Here</Link> to log in.</p>
            </>
          );
        }
      }
      return null;
    }


    return (
      <div className="board profile-container center">
        <div className="col-l-5 queue center">
          <img src={image} alt="profile_pic" />
        </div>
        <div className="col-l-5">
          <h1>{name}</h1>
          <h2>{category}</h2>
          <p>{ description }</p>
          <div className="queue center">{working_days}</div>
          <div className="queue between">
            <div>
              Wage: {`${hourly_wage} ${currency}`}
            </div>
            <button onClick={handleClick}>Make Proposal</button>
          </div>
        </div>
        <div className="col-10">
          { renderForm() }
        </div>
      </div>
    );
  }

  return <>Loading...</>
};

const ProfessionalProfile = connect(mapStateToProps)(ConnectedProfessionalProfile);

export default ProfessionalProfile;
