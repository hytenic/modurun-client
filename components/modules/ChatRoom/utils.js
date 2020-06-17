const prettyTime = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minute = date.getMinutes();
  const front = hours < 12 ? '오전' : '오후';
  const cleanHours = hours < 12 ? hours : hours - 12;
  return `${front} ${cleanHours}:${minute}`;
};

export default {
  prettyTime,
}