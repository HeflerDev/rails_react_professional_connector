import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { Link } from 'react-router-dom';

const mapStateToProps = state => ({
  isLoggedIn: state.userReducer.isLoggedIn,
  user: state.userReducer.user.user
});

const ConnectedProfessionalProfile = ({ history, user, isLoggedIn, match: {params: {id}}}) => {
  const [profData, setProfData] = useState(null);
  const [displayForm, setDisplayForm] = useState(null);
  const [formData, setFormData] = useState({
    schedule: '',
    error: null,
  });
  const [pageError, setPageError] = useState(null);
 
  useEffect(() => {
    axios.get(`/api/v1/show/${id}`)
      .then(res => {
        if (res.statusText === 'OK') {
          setProfData(res.data);
        } else {
          throw new Error();
        }
      })
      .catch(err => {
        setPageError(err);
      });
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
      if (appointment.schedule) {
        axios.post('http://localhost:3001/appointments', { appointment }, { withCredentials: true })
          .then((res) => {
            if (res.data.status === 'created') {
              history.push('/');
            } else {
              throw new Error();
            }
          })
          .catch(err => ({...formData, error: err}));
      } else {
        setFormData({...formData, error: 'Date Can\'t be Blank'});
        console.log(formData);
      }
    };

    const handleChange = e => {
      const { name, value } = e.target;
      setFormData({...formData, [name]: value});
    };

    const handleClick = () => {
      setDisplayForm(true);
    };

    const renderForm = () => {
      if(displayForm) {
        const { schedule } = formData;
        if (isLoggedIn) {
          return(
            <div className="stack">
              <form className="board" onSubmit={handleSubmit}>
                <label htmlFor="datepick" className="col-12">
                  <h3>
                    Time and Date:
                  </h3>
                  <input
                    type="datetime-local"
                    name="schedule"
                    value={schedule}
                    onChange={handleChange}
                  />
                </label>
                <button type="submit">Hire {name}!</button>
              </form>
              <div>
                { formData.error }
              </div>
            </div>
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

    if (pageError) {
      return (
        <div className="stack">
          <p>Could not fetch user: { pageError }</p>
        </div>
      );
    }

    return (
      <div className="profile-container">
      <div className="board center profile">
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
            <button onClick={handleClick}>Make Schedule</button>
          </div>
        </div>
        <div className="col-12 queue center">
          { renderForm() }
        </div>
      </div>
      </div>

    );
  }

  return <>Loading...</>
};

const ProfessionalProfile = connect(mapStateToProps)(ConnectedProfessionalProfile);

export default ProfessionalProfile;
