import axios from 'axios';

const userHelpers = {
  loginStatus() {
    axios.get('http://localhost:3001/logged_in',
      {withCredentials: true})
      .then(res => {
        if (res.data.logged_in) {
          this.handleLogin(res)
        } else {
          this.handleLogout()
        }
      })
      .catch(err => console.log('api errors', err))
  }
};

export default userHelpers;
