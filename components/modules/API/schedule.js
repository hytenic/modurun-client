/* eslint-disable no-undef */
const url = 'https://modurun.xyz';

const postSchedule = async (createdScheduleInfo) => {
  try {
    const result = await fetch(`${url}/schedules`, {
      method: 'POST',
      //   withCredentials, true,
      credentials: 'include',
      body: JSON.stringify(
        createdScheduleInfo,
      ),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (result.status === 400) return false;

    const json = result.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

const getSchedules = async (filterCondition, userposition) => {
  const encodedFilter = encodeURI(JSON.stringify(filterCondition));
  const encodedPosition = encodeURI(JSON.stringify(userposition));
  const area = {
    latitude: userposition.latitude - 20,
    longitude: userposition.longitude - 20,
    latitudeDelta: 40,
    longitudeDelta: 40,
  };
  const encodedArea = encodeURI(JSON.stringify(area));
  try {
    const response = await fetch(`${url}/schedules/${encodedFilter}/${encodedPosition}/${encodedArea}`);
    if (response.status === 404) return false; // 검색하는 일정이 없음
    const json = response.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  postSchedule,
  getSchedules,
};
