import PropTypes, { InferProps } from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import { Link, Navigate } from 'react-router-dom';

interface LandingProps {
  isAuthenticated?: boolean;
}

const Landing: React.FC<LandingProps> = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }
  return (
    <section className="landing">
      {/* Rest of the code */}
    </section>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool
};

const mapStateToProps = (state: any) => ({
  isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps)(Landing);