import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import { extractCurrentClient } from '../../actions/profile'

const Dashboard = ({ extractCurrentClient, auth, profile}) => {

    useEffect(() => {
        extractCurrentClient();
    }, []);
    return (
        <div>
            Dashboard
        </div>
    )
};

Dashboard.propTypes = {
    extractCurrentClient: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profie: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
})

export default connect(mapStateToProps, { extractCurrentClient })(Dashboard);
