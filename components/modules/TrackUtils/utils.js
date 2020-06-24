export const prettyLength = (length) => {
  if (length < 1000) return `${Math.floor(length)}m`;
  const inKm = Math.floor(length) / 1000;
  const cleanKm = Math.floor(inKm * 10) / 10;
  return `${cleanKm}km`;
};

export const prettyDuration = (durationInMinute) => {
  const prettyMinute = Math.floor(durationInMinute);
  const hour = Math.floor(prettyMinute / 60);
  const minute = prettyMinute - hour * 60;
  if (!hour) return `${prettyMinute}분`;
  return `${hour}시간 ${minute}분`;
};

export const predictDuration = (length, sex = 'm') => {
  if (sex === 'm') return prettyDuration(length / 90);
  if (sex === 'f') return prettyDuration(length / 70);
  return prettyDuration(length / 90);
};
