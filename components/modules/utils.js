const customizingDateAndTime = (date, time) => {
  let arr;
  let result;
  if (date || !time) {
    arr = date.split('-');
    result = `${arr[0]}월 ${arr[1]}일`;
  } else {
    arr = time.split(':');
    result = `${arr[0]}시 ${arr[1]}분`;
  }
  return result;
};

export default customizingDateAndTime;
