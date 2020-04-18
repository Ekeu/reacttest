import React, { useEffect, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import BandWidth from './BandWidth';
import Concurrent from './Concurrent';
import { extractCurrentClient } from '../../actions/profile';
import { extractchartData } from '../../actions/chart';
import { extractConcurrentViewers } from '../../actions/viewers';

const Dashboard = ({
  extractCurrentClient,
  extractchartData,
  extractConcurrentViewers,
  auth: { user },
  profile: { profile, loading },
  chart: { cdn, p2p, maxSum, maxCdn },
  viewers: {concurrence}
}) => {
  useEffect(() => {
    extractCurrentClient();
    extractchartData('max', 1585834831000, 1589118031000);
    extractConcurrentViewers(1585834831000, 1589118031000);
  }, []);
  return loading && profile === null ? (
    <Spinner />
  ) : (
    <Fragment>
      <h1 className='large text-primary'>Streaming</h1>
      <p className='lead'>
        <i className='fas fa-chart-line'></i>
        Welcome {user && user.lname}
      </p>
      <BandWidth cdn={cdn} p2p={p2p} maxSum={maxSum} maxCdn={maxCdn} />
      <Concurrent concurrence={concurrence}/>
    </Fragment>
  );
};

Dashboard.propTypes = {
  extractCurrentClient: PropTypes.func.isRequired,
  extractchartData: PropTypes.func.isRequired,
  extractConcurrentViewers: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  chart: state.chart,
  viewers: state.viewers,
});

export default connect(mapStateToProps, {
  extractCurrentClient,
  extractchartData,
  extractConcurrentViewers
})(Dashboard);
