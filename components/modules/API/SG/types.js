/**
 * @typedef {object} filter
 * @property {number} maxLength
 * @property {object} date
 * @property {string} date.from
 * @property {string} date.to
 * @property {number} distance
 * @property {number} rate
 * @property {boolean} recent
 */

//  * @property {boolean} scheduleStatus

/**
 * @typedef userPosition
 * @property {number} latitude
 * @property {number} longitude
 */

/**
 * @typedef {object} area
 * @property {number} latitude
 * @property {number} longitude
 * @property {number} latitudeDelta
 * @property {number} longitudeDelta
 */

/**
  * @typedef {object} track
  * @property {string} origin This is stringified object of {latitude, longitude}
  * @property {string} route This is stringified object of {latitude, longitude}
  * @property {string} destination This is stringified Array
  * @property {number} trackLength
  */

/**
 * @typedef {object} schedule
 * @property {string} from date
 * @property {string} to date
 * @property {number} participants This is stringified Array
 * @property {boolean} userjoined
 */
