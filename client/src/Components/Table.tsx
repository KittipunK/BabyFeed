import React, { useEffect, useState } from 'react';

import './styles.css';

enum Consumption {
  Formula = 0,
  Solid = 1,
  Pepcid = 2,
  Gasdrop = 3,
}


const Table = () => {


  const [currentData, setCurrentData] = useState([]);
  const [err, setErr] = useState("");

  useEffect(() => {

    fetch('/feedData', {
        method: 'GET',
        mode: 'cors',
        headers: {
 // Ensure the server allows requests from this origin
          'Content-Type': 'application/json'
        }
      })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        setCurrentData(data)
    })
    .catch(error => {
        setErr(error.toLocaleString());
    });

  },[])

  function convertTo12HourFormat(time24) {
    // Split the time string into hours and minutes
    const [hours, minutes] = time24.split(':').map(Number);
  
    // Determine AM or PM
    const period = hours >= 12 ? 'PM' : 'AM';
  
    // Adjust hours for 12-hour format
    let hours12 = hours % 12;
    hours12 = hours12 === 0 ? 12 : hours12;
  
    // Format the 12-hour time string
    return `${hours12}:${minutes.toString().padStart(2, '0')} ${period}`;
  }

  const handleDelete = (id: Number) => {
    const body = {id: id};
    fetch('/feedData', {
        method: 'PUT',
        mode: 'cors',
        headers: {
 // Ensure the server allows requests from this origin
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
      })
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    })
    .then(data => {
        setCurrentData(data)
    })
    .catch(error => {
        setErr(error.toLocaleString());
    });
  }

    return <div className='table'>
        <div className='header'>
            <p>Date</p>
            <p>Time</p>
            <p>Type</p>
            <p>Qt</p>
            <p></p>
        </div>
        {currentData.map((data, index)=>{
            var type = "N/A";
            var unit = "oz";
            switch (data.type) {
                case Consumption.Formula:
                    type = "Formula"
                    break;
                case Consumption.Solid:
                    type = "Solid"
                    break;
                case Consumption.Pepcid:
                    type = "Pepcid"
                    unit = "ml"
                    break;
                case Consumption.Gasdrop:
                    type = "Gasdrop"
                    unit = "ml"
                    break;
                default:
                    break;
            }
            return <div key={data.id} className="dataLine">
                
                <p>{data.datetime.substring(0, 10)}</p>
                <p>{convertTo12HourFormat(data.datetime.substring(11, 16))}</p>
                <p>{type}</p>
                <p>{data.quantity} {unit}</p>
                <button type='submit' onClick={(e)=>{handleDelete(data.id)}}>x</button>
            </div>;
        })}
      </div>
    
}

export default Table;