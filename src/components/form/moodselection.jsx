import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Chart from 'chart.js/auto';

const MoodSelection = () => {
  const [selectedMood, setSelectedMood] = useState('');
  const [disabled, setDisabled] = useState(false);
  const [moodData, setMoodData] = useState({});
  const moodOptions = [
    'Very Sad', 'Depressed', 'Lonely', 'Happy', 'Overconfident',
    'Fearful', 'Very Happy', 'Suicidal', 'Lazy', 'Dull'
  ];

  useEffect(() => {
    const fetchMoodData = async () => {
      try {
        const response = await axios.get('http://localhost:8000/moods/weekly/');
        setMoodData(response.data);
      } catch (error) {
        console.error('Error fetching mood data:', error);
      }
    };

    fetchMoodData();
  }, []);

  const handleMoodSelection = (mood) => {
    setSelectedMood(mood);
  };

  const handleSubmit = async () => {
    try {
      await axios.post('http://localhost:8000/moods', { mood: selectedMood });
      alert('Mood recorded successfully');
      // Update mood data after submission
      const response = await axios.get('http://localhost:8000/moods/weekly/');
      setMoodData(response.data);
      setDisabled(true); // Disable selection after submission
    } catch (error) {
      console.error('Error recording mood:', error);
    }
  };

  // Plot graph when mood data changes
  useEffect(() => {
    if (Object.keys(moodData).length > 0) {
      plotGraph();
    }
  }, [moodData]);

  const plotGraph = () => {
    const ctx = document.getElementById('moodChart');
    if (ctx) {
      const daysOfWeek = Object.keys(moodData);
      const moodCounts = Object.values(moodData);

      const chartData = {
        labels: daysOfWeek,
        datasets: moodOptions.map(mood => ({
          label: mood,
          data: daysOfWeek.map(day => moodCounts[day]?.[mood] || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize colors as needed
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        })),
      };

      new Chart(ctx, {
        type: 'bar',
        data: chartData,
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
    }
  };

  return (
    <div className="mood-selection">
      <h2>How is your mood today?</h2>
      <ul>
        {moodOptions.map(mood => (
          <li key={mood}>
            <label>
              <input
                type="radio"
                value={mood}
                checked={selectedMood === mood}
                onChange={() => handleMoodSelection(mood)}
                disabled={disabled} // Disable selection if already submitted for today
              />
              {mood}
            </label>
          </li>
        ))}
      </ul>
      <button onClick={handleSubmit} disabled={disabled}>Submit</button>
      <canvas id="moodChart" width="400" height="400"></canvas>
    </div>
  );
};

export default MoodSelection;
