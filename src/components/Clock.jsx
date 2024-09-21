import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

// Styling for the Clock
const ClockContainer = styled.div`
  font-size: 6rem;
  font-weight: bold;
  color: ${({ theme }) => theme.body === '#121212' ? '#ffffff' : '#000000'};
  text-align: center;
  margin: 20px auto;
  max-width: 600px;  // Add this to control the width
`;


const Clock = () => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <ClockContainer>
      {time.toLocaleTimeString()}
    </ClockContainer>
  );
};

export default Clock;
