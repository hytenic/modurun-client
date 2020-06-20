import moment from 'moment';

const customizingDateAndTime = (date, time) => {
  let arr;
  let result;
  if (date && !time) {
    const d = moment(date).format('M-D');
    arr = d.split('-');
    result = `${arr[0]}월 ${arr[1]}일`;
  } else {
    const d = moment(time).format('HH:mm:ss');
    arr = d.split(':');
    result = `${arr[0]}시 ${arr[1]}분`;
  }
  return result;
};

const meterToKilo = (meter) => {
  return (meter / 1000).toFixed(2);
};

module.exports = {
  customizingDateAndTime,
  meterToKilo,
};
