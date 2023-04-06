import React, { Fragment, useState} from 'react';
import { connect } from 'react-redux';
import {Link, Redirect} from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types';

const Register = ({setAlert, register, isAuthenticated}) => {
//const Register = ({setAlert, register}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const {name, email, password, password2} = formData;

    const onChange = e => 
      setFormData({...formData, [e.target.name]: e.target.value});
    
      const onSubmit = async e => {
        e.preventDefault();
        if(password !== password2) {
            setAlert('Passwords do not match', 'danger');
        } else{ 
            register({name, email, password});
            /*
            //after filling the form, new user object is created
            const newUser = {
                name,
                email,
                password
            }
            try {
                const config = {
                    headers: {
                        'Content-type': 'application/json'
                    }
                }
                // pass a JavaScript object as the 2nd parameter to the axios.post() function, 
                //Axios will automatically serialize the object to JSON for you. Axios will also set the Content-Type header to 'application/json', so web frameworks like Express can automatically parse it.
                const body = JSON.stringify(newUser);
                const res = await axios.post('/api/users', body, config); //header value
                console.log(res.data); 
            } catch (err) {
                console.error(err.response.data);
            }
                */
        }
    };

    if(isAuthenticated){
      return <Redirect to="/dashboard" />
    }
    return (
      <Fragment>
        <h1 className="large text-primary">Sign Up</h1>
        <p className="lead">
          <i className="fas fa-user" /> Create Your Account
        </p>
        <form className="form" onSubmit={onSubmit}>
          <div className="form-group">
            <input
              type="text"
              placeholder="Name"
              name="name"
              value={name}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              placeholder="Email Address"
              name="email"
              value={email}
              onChange={onChange}
            />
            <small className="form-text">
              This site uses Gravatar so if you want a profile image, use a
              Gravatar email
            </small>
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Password"
              name="password"
              value={password}
              onChange={onChange}
            />
          </div>
          <div className="form-group">
            <input
              type="password"
              placeholder="Confirm Password"
              name="password2"
              value={password2}
              onChange={onChange}
            />
          </div>
          <input type="submit" className="btn btn-primary" value="Register" />
        </form>
        <p className="my-1">
          Already have an account? <Link to="/login">Sign In</Link>
        </p>
      </Fragment>
    );
  };

  Register.propTypes = {
    setAlert: PropTypes.func.isRequired,
    register: PropTypes.func.isRequired,
    isAuthenticated: PropTypes.bool
  };
  
  //redirect after registering
  const mapStateToProps = (state) => ({
    isAuthenticated: state.auth.isAuthenticated
  });

export default connect(mapStateToProps, { setAlert, register })(Register);
