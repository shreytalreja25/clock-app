import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styling for the Clock
const ClockContainer = styled.div`
  font-size: 6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.body === '#121212' ? '#ffffff' : '#000000'};
  text-align: center;
  margin: 20px auto;
  max-width: 600px;
`;

const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 60000); // Update every minute
    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <ClockContainer>
      {formatTime(time)}
    </ClockContainer>
  );
};

export default Clock;