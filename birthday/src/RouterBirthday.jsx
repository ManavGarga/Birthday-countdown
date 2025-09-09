import React from 'react';
import { useParams } from 'react-router-dom';
import Birthday from './Birthday';

const RouterBirthday = () => {
  const { name, day, month } = useParams();

  return (
    <Birthday
      name={name || 'Friend'}         
      day={day ? parseInt(day) : 1}  
      month={month ? parseInt(month) : 1}
    />
  );
};

export default RouterBirthday;
