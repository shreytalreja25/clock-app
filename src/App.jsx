import React, { useState } from 'react';
import Clock from './components/Clock';
import WeatherWidget from './components/WeatherWidget';
import WeatherRecommendation from './components/WeatherRecommendation';
import { ThemeProvider } from 'styled-components';
import { GlobalStyles, lightTheme, darkTheme } from './styles/GlobalStyles';
import styled from 'styled-components';

// Main App container
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
`;

// Toggle Button for Light and Dark Mode
const ToggleButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: ${({ theme }) => theme.body === '#121212' ? '#ffffff' : '#000000'};
  color: ${({ theme }) => theme.body === '#121212' ? '#000000' : '#ffffff'};
  border: none;
  padding: 10px 20px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ theme }) => theme.body === '#121212' ? '#f0f0f0' : '#444444'};
  }
`;

function App() {
  const [theme, setTheme] = useState('light');
  const [weather, setWeather] = useState(null);
  const [location, setLocation] = useState(null);

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  const handleWeatherData = (weatherData) => {
    setWeather(weatherData);
    setLocation(weatherData.location);
  };

  return (
    <ThemeProvider theme={theme === 'light' ? lightTheme : darkTheme}>
      <GlobalStyles />
      <AppContainer>
        {/* Light/Dark Mode Toggle Button */}
        <ToggleButton onClick={toggleTheme}>
          {theme === 'light' ? 'Dark Mode' : 'Light Mode'}
        </ToggleButton>
        {/* Clock Component */}
        <Clock />
        {/* Weather Widget */}
        <WeatherWidget onWeatherData={handleWeatherData} />
        {/* Weather Recommendation if weather data is available */}
        {weather && location && (
          <WeatherRecommendation weather={weather} location={location} />
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
