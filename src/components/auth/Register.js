import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom'

const Register = () => {
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
          console.log('Passwords do not match');
      }else {
          console.log('SUCCESS');
      }
  };
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
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Last Name'
            value={lname}
            onChange={(e) => onChange(e)}
            name='lname'
            required
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
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Describe yourself in few words...'
            value={description}
            onChange={(e) => onChange(e)}
            name='description'
            required
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => onChange(e)}
            name='password'
            minLength='6'
          />
        </div>
        <div className='form-group'>
          <input
            type='password'
            placeholder='Confirm Password'
            value={password2}
            onChange={(e) => onChange(e)}
            name='password2'
            minLength='6'
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

export default Register;
