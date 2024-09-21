import React, { useState, useEffect } from "react";
import styled from "styled-components";
import OpenAI from "openai";

// Styling for the Recommendation Container
const RecommendationContainer = styled.div`
  font-size: 1.4rem;
  background-color: ${({ theme }) =>
    theme.body === "#121212" ? "#2c2c2c" : "#f9f9f9"};
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.15);
  width: 100%;
  max-width: 600px;
  margin: 0 auto;
`;

// Styling for Buttons
const Button = styled.button`
  background-color: ${({ theme }) =>
    theme.body === "#121212" ? "#ffffff" : "#333333"};
  color: ${({ theme }) => (theme.body === "#121212" ? "#000000" : "#ffffff")};
  border: none;
  padding: 12px 25px;
  cursor: pointer;
  border-radius: 8px;
  font-size: 1rem;
  font-weight: bold;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: ${({ theme }) =>
      theme.body === "#121212" ? "#f0f0f0" : "#444444"};
    transform: translateY(-2px);
  }
`;

const DirectionsButton = styled(Button)`
  background-color: #4285f4; /* Google Maps color */
  color: white;

  &:hover {
    background-color: #357ae8;
  }
`;

// Wrapper for buttons to align them
const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 10px;
  margin-top: 15px;
`;

const WeatherRecommendation = ({ weather, location }) => {
  const [recommendation, setRecommendation] = useState("");
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);

  const getRecommendation = async () => {
    try {
      setLoading(true);
      const now = new Date();
      const hours = now.getHours();
      const timeOfDay = `${hours < 12 ? "morning" : hours < 18 ? "afternoon" : "evening"}`;
      const api_Key = import.meta.env.VITE_OPENAI_API_KEY;
      const openai = new OpenAI({
        apiKey: api_Key,
        dangerouslyAllowBrowser: true // Use the environment variable here
      });

      const prompt = `
        Based on the current weather in ${location.name}, ${location.country}, with ${weather.current.condition.text} conditions 
        and a temperature of ${weather.current.temp_c}°C during the ${timeOfDay}, suggest one nearby activity that is suitable under these conditions. 
        Provide both a brief description of the activity (limited to 3-4 lines) and the name of the specific location (only the name of the place).`;

      const completion = await openai.chat.completions.create({
        model: "gpt-4",
        messages: [{ role: "user", content: prompt }],
      });

      const responseText = completion.choices[0].message.content.trim();
      const splitResponse = responseText.split("Location:");
      const activityText = splitResponse[0].trim();
      const locationName = splitResponse[1] ? splitResponse[1].trim() : "";

      setRecommendation(activityText);
      setPlace(locationName); // Set the exact place name for Google Maps
    } catch (error) {
      console.error("Error fetching recommendation:", error);
      setRecommendation("Sorry, I couldn’t fetch a recommendation at this time.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (weather && location) {
      getRecommendation();
    }
  }, [weather, location]);

  const handleGetDirections = () => {
    if (place) {
      const query = encodeURIComponent(`${place}, ${location.name}, ${location.country}`);
      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, "_blank");
    } else {
      alert("No location available for directions.");
    }
  };

  return (
    <RecommendationContainer>
      {loading ? (
        <p>Loading recommendation...</p>
      ) : (
        <p>{recommendation}</p>
      )}

      <ButtonContainer>
        <Button onClick={getRecommendation}>Get Another Recommendation</Button>
        {place && (
          <DirectionsButton onClick={handleGetDirections}>
            Get Directions
          </DirectionsButton>
        )}
      </ButtonContainer>
    </RecommendationContainer>
  );
};

export default WeatherRecommendation;
