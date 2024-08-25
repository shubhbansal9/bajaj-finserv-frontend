import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [error, setError] = useState('');
  const [response, setResponse] = useState(null);
  const [selectedOptions, setSelectedOptions] = useState([]);

  const handleJsonChange = (e) => {
    setJsonInput(e.target.value);
    setError('');
  };

  const handleSubmit = async () => {
    try {
      const parsedInput = JSON.parse(jsonInput);
      if (!parsedInput.data || !Array.isArray(parsedInput.data)) {
        setError('Invalid JSON format: "data" should be an array.');
        return;
      }

      const res = await axios.post('https://bajaj-finserv-backend-six.vercel.app/bfhl', parsedInput);
      setResponse(res.data);
    } catch (err) {
      setError('Invalid JSON format or server error.');
    }
  };

  const handleOptionChange = (e) => {
    const value = Array.from(e.target.selectedOptions, option => option.value);
    setSelectedOptions(value);
  };

  const renderResponse = () => {
    if (!response) return null;

    return (
      <div className="response">
        {selectedOptions.includes('Alphabets') && (
          <div><strong>Alphabets:</strong> {response.alphabets.join(', ')}</div>
        )}
        {selectedOptions.includes('Numbers') && (
          <div><strong>Numbers:</strong> {response.numbers.join(', ')}</div>
        )}
        {selectedOptions.includes('Highest lowercase alphabet') && (
          <div><strong>Highest Lowercase Alphabet:</strong> {response.highest_lowercase_alphabet.join(', ')}</div>
        )}
      </div>
    );
  };

  return (
    <div className="App">
      <h1>21BCE0840</h1>
      <textarea
        value={jsonInput}
        onChange={handleJsonChange}
        placeholder='Enter JSON here'
        rows={5}
        cols={50}
      />
      <button onClick={handleSubmit}>Submit</button>
      {error && <div className="error">{error}</div>}

      {response && (
        <div className="filters">
          <label>Select Response Filters:</label>
          <select multiple={true} onChange={handleOptionChange}>
            <option value="Alphabets">Alphabets</option>
            <option value="Numbers">Numbers</option>
            <option value="Highest lowercase alphabet">Highest lowercase alphabet</option>
          </select>
        </div>
      )}

      {renderResponse()}
    </div>
  );
}

export default App;
