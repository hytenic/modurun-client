import * as actions from '../action/myPage';

const initialState = {
  exampleKey: {
    exampleArr: [1, 2, 3],
    exampleKey: 3,
  },
  exmapleKey2: {
    exampleObj: {
      key: 'value',
    },
    exampleValue: 1,
  },
};

const myPageRudecuer = (state = initialState, action) => {
  // console.log(action);
  if (action.type === actions.EX_ACTION1) {
    const newState = Object.assign(initialState,
      {
        exampleKey: {
          exampleKey: action.payload,
        },
      });
    return newState;
  }
  return state;
};

export default myPageRudecuer;
