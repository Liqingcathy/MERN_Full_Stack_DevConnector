//fetch all data using action and pass down to components(exp, edu..)
import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import { getCurrentProfile } from '../../actions/profile';
import { Fragment } from 'react';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';

const Dashboard = ({ 
    getCurrentProfile, auth: {user}, profile: {profile, loading} }) => {
    useEffect(() => {
        getCurrentProfile();
    }, []);


    return loading && profile === null ? (<Spinner />) : (
    <Fragment>
        <h1 className="large text-primary">Dashboard</h1>
        <p className="lead">
            <i className="fas fa-user"></i> Welcome {user && user.name}
        </p>
        {profile !== null ? (
        <Fragment><DashboardActions></DashboardActions></Fragment>
        ) : (
        <Fragment>
            <p>You have not set up a profile, please add some info</p>
        <Link to='/create-profile' className="btn btn-primary my-1">Create a profile</Link>
        </Fragment>
        )}
    </Fragment>  
    );
};

Dashboard.propTypes = {
    getCurrentProfile: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getCurrentProfile })(Dashboard);
