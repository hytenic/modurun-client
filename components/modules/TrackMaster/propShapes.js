import PropTypes from 'prop-types';

export default {
  schedule: {
    scheduleTitle: PropTypes.string,
    from: PropTypes.string,
    to: PropTypes.string,
    participants: PropTypes.number,
    userJoined: PropTypes.bool,
  },
  track: {
    trackTitle: PropTypes.string,
    origin: PropTypes.string,
    route: PropTypes.string,
    destination: PropTypes.string,
    trackLength: PropTypes.number,
  },
};
