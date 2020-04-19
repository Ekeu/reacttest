import React, { useState, Fragment, useEffect } from 'react';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile, extractCurrentClient } from '../../actions/profile'

const EditProfile = ({ profile: {profile, loading}, updateProfile, extractCurrentClient, history}) => {
  const [formData, setFormData] = useState({
    company: '',
    fname: '',
    lname: '',
    email: '',
    website: '',
    description: '',
  });

  useEffect(() => {
      extractCurrentClient();

      setFormData({
        company: loading || !profile.company ? '' : profile.company,
        fname: loading || !profile.fname ? '' : profile.fname,
        lname: loading || !profile.lname ? '' : profile.lname,
        email: loading || !profile.email ? '' : profile.email,
        website: loading || !profile.website ? '' : profile.website,
        description: loading || !profile.description ? '' : profile.description
      });
  }, [loading]);
  const { company, fname, lname, email, website, description } = formData;
  const onChange = e => setFormData({...formData, [e.target.name]: e.target.value});

  const onSubmit = e => {
      e.preventDefault();
      updateProfile(formData, history);
  }
  return (
    <Fragment>
      <h1 className='large text-primary'>Update Your Profile</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Let's get some information to make your
        profile stand out
      </p>
      <small>* = required field</small>
      <form className='form' onSubmit={e => onSubmit(e)}>
        <div className='form-group'>
          <input type='text' placeholder='Company' name='company' onChange={(e) => onChange(e)} value={company}/>
          <small className='form-text'>
            Could be your own company or one you work for: https://mywebsite.com
          </small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='First Name' name='fname' onChange={(e) => onChange(e)} value={fname}/>
          <small className='form-text'>Provide your First Name: John</small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Last Name' name='lname' onChange={(e) => onChange(e)} value={lname}/>
          <small className='form-text'>Provide your Last Name: Doe</small>
        </div>
        <div className='form-group'>
          <input type='email' placeholder='Email' name='email' onChange={(e) => onChange(e)} value={email}/>
          <small className='form-text'>
            Provide tour Email: johndoe@gmail.com
          </small>
        </div>
        <div className='form-group'>
          <input type='text' placeholder='Website' name='website' onChange={(e) => onChange(e)} value={website}/>
          <small className='form-text'>
            Could be your own or a company website
          </small>
        </div>
        <div className='form-group'>
          <textarea placeholder='A short description of yourself' name='description' onChange={(e) => onChange(e)} value={description}></textarea>
          <small className='form-text'>Tell us a little about yourself</small>
        </div>

        <input type='submit' className='btn btn-primary my-1' />
        <Link className='btn btn-light my-1' href='dashboard.html'>
          Go Back
        </Link>
      </form>
    </Fragment>
  );
};

EditProfile.propTypes = {
    updateProfile: PropTypes.func.isRequired,
    extractCurrentClient: PropTypes.func.isRequired,
    profile: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    profile: state.profile
});

export default connect(mapStateToProps, {updateProfile, extractCurrentClient})(withRouter(EditProfile));
