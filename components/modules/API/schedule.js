import getEnvVars from '../../../environment';

const { bareURL } = getEnvVars('dev');

const postSchedule = async (createdScheduleInfo) => {
  console.log('hello');
  try {
    const result = await fetch(`${bareURL}/schedules`, {
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
    console.log(result);
    if (result.status === 400) return false;

    const json = result.json();
    return json;
  } catch (e) {
    console.log(e);
  }
};

module.exports = {
  postSchedule,
};
