import React, { Fragment, useState } from 'react';
import { connect } from 'react-redux';
import { Link, Redirect } from 'react-router-dom';
import { setAlert } from '../../actions/alert';
import { register } from '../../actions/auth';
import PropTypes from 'prop-types'

const Register = (props) => {
  /**
   * formData: Object with all field values
   * setFormData: Function used to update our state
   * Pulling all that from useState
   */
  const [formData, setFormData] = useState({
    fname: '',
    lname: '',
    email: '',
    website: '',
    description: '',
    password: '',
    password2: '',
  });

  const {
    fname,
    lname,
    email,
    website,
    description,
    password,
    password2,
  } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });
  const onSubmit = async e => {
      e.preventDefault();
      if (password !== password2) {
          props.setAlert('Passwords do not match', 'danger')
      }else {
          props.register({fname, lname, email, website, description, password})
      }
  };

  if (props.isAuthenticated) {
    return <Redirect to='/dashboard' />
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Sign Up</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Create Your Account
      </p>
      <form className='form' onSubmit={(e) => onSubmit(e)}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='First Name'
            value={fname}
            onChange={(e) => onChange(e)}
            name='fname'
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Last Name'
            value={lname}
            onChange={(e) => onChange(e)}
            name='lname'
          />
        </div>
        <div className='form-group'>
          <input
            type='email'
            placeholder='Email Address'
            value={email}
            onChange={(e) => onChange(e)}
            name='email'
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Website'
            value={website}
            onChange={(e) => onChange(e)}
            name='website'
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Describe yourself in few words...'
            value={description}
            onChange={(e) => onChange(e)}
            name='description'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => onChange(e)}
            name='password'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            value={password2}
            onChange={(e) => onChange(e)}
            name='password2'
          />
        </div>
        <input type='submit' className='btn btn-primary' value='Register' />
      </form>
      <p className='my-1'>
        Already have an account? <Link to={'/login'}>Sign in</Link>
      </p>
    </Fragment>
  );
};

Register.propTypes = {
  setAlert: PropTypes.func.isRequired,
  register: PropTypes.func.isRequired,
  isAuthenticated: PropTypes.bool,
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { setAlert, register })(Register);
