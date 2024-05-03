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

  let moodChart; // Declare a variable to store Chart instance

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
      const token = sessionStorage.getItem('token');
      const headers = {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      };
      await axios.post('http://localhost:8000/moods/', { mood: selectedMood, user:"test" }, { headers });
      alert('Mood recorded successfully');
      // Update mood data after submission
      const response = await axios.get('http://localhost:8000/moods/weekly/');
      setMoodData(response.data);
      setDisabled(true); // Disable selection after submission
    } catch (error) {
      console.error('Error recording mood:', error);
    }
  };

  const plotGraph = () => {
    const ctx = document.getElementById('moodChart');
    if (ctx) {
      if (moodChart) {
        moodChart.destroy(); // Destroy existing Chart instance
      }

      const weeks = Object.keys(moodData);
      const weeklyMoods = Object.values(moodData);

      const chartData = {
        labels: weeks,
        datasets: moodOptions.map(mood => ({
          label: mood,
          data: weeks.map((week, index) => weeklyMoods[index]?.[mood] || 0),
          backgroundColor: 'rgba(75, 192, 192, 0.2)', // Customize colors as needed
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        })),
      };

      moodChart = new Chart(ctx, {
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

  useEffect(() => {
    if (Object.keys(moodData).length > 0) {
      plotGraph();
    }
  }, [moodData]);

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
      <div className="mood-data">
        <h3>Mood Data:</h3>
        <ul>
          {Object.entries(moodData).map(([day, moodCounts]) => (
            <li key={day}>
              <strong>{day}:</strong>
              <ul>
                {Object.entries(moodCounts).map(([mood, count]) => (
                  <li key={mood}>
                    {mood}: {count}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>
      <canvas id="moodChart" width="400" height="400"></canvas>
    </div>
  );
};

export default MoodSelection;
