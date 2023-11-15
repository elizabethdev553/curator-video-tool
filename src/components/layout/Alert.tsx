import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

interface AlertProps {
  alerts: {
    id: number;
    alertType: string;
    msg: string;
  }[];
}

const Alert: React.FC<AlertProps> = ({ alerts }) => (
  <div className="alert-wrapper">
    {alerts.map((alert) => (
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    ))}
  </div>
);

Alert.propTypes = {
  alerts: PropTypes.array.isRequired
};

const mapStateToProps = (state:any) => ({
  alerts: state.alert
});

export default connect(mapStateToProps)(Alert);
