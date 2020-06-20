/* eslint-disable no-undef */
const url = 'https://modurun.xyz';

const postSchedule = async (createdScheduleInfo) => {
  try {
    const result = await fetch(`${url}/schedules`, {
      method: 'POST',
      //   withCredentials, true,
      credentials: 'include',
      body: JSON.stringify({
        createdScheduleInfo,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    // console.log(result);
    if (result.status === 400) return false;

    const json = result.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

const postFilter = async ({ filter, userposition, area }) => {
  try {
    const result = await fetch(`${url}/schedules/${filter}/${userposition}/${area}`);
    if (result.status === 404) return false; // 검색하는 일정이 없음

    const json = result.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  postSchedule,
  postFilter,
};
