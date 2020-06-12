export const EX_ACTION1 = 'EXAMPLE';


export const exAction1 = (num) => {
  const result = num * 2;
  return {
    type: EX_ACTION1,
    payload: result,
  };
};
