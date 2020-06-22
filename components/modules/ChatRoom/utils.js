const prettyTime = (time) => {
  const date = new Date(time);
  const hours = date.getHours();
  const minute = date.getMinutes();
  const mappedMinute = minute.toString().length < 2 ? `0${minute}` : minute;
  const front = hours < 12 ? '오전' : '오후';
  const cleanHours = hours < 12 ? hours : hours - 12;
  return `${front} ${cleanHours}:${mappedMinute}`;
};

const checkMyMessage = (chat, userId) => chat.map((message) => {
  if (message.userId === userId) {
    return Object.assign(message, {
      isMine: true,
    });
  }
  return Object.assign(message, { isMine: false });
});

export default {
  prettyTime,
  checkMyMessage,
}