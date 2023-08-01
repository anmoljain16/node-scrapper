// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DriveList from './DriveList';

const App = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch data from the server API
    axios.get('http://localhost:5000/api/drives')
      .then(response => {
        console.log("response")
        console.log(response)
        setData(response.data);
        console.log(data)
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  return (
    <div>
      <h1>List of Drives</h1>
      {data.length > 0 ? <DriveList drives={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default App;
