import React, { useState } from 'react';
import DateTimePicker from '@react-native-community/datetimepicker';

const DateTimePickerCompoment = ({ setAction, type, setShow }) => {
  const onChangeAction = (event, selectedDate) => {
    setShow(false);
    if (!selectedDate && selectedDate === undefined) {
      return;
    }
    setAction(selectedDate);
  };
  return (
    <DateTimePicker
      value={new Date()}
      onChange={onChangeAction}
      mode={type}
    />
  );
};

export default DateTimePickerCompoment;
