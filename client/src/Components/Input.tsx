import React, {  useState } from 'react';
import axios from 'axios';
import './styles.css';

enum Consumption {
  Formula = 0,
  Solid = 1,
  Pepcid = 2,
  Gasdrop = 3,
}

const Input = () => {


  const [currentInput, setCurrentInput] = useState({
    "Consumption": Consumption.Formula,
    "Quantity":"",
    "DateTime": new Date(Date.now() - 18030000).toISOString().slice(0, 16),
  });

    const handleSubmission = async (e) => {

      
      axios.post('/feedData', currentInput)
      .then(res=>console.log(res))
      .catch(err=>console.log(err))
      
    }

    return <>
      <form onSubmit={(e)=>{handleSubmission(e)}}>
        <div className="section">
          <p>Consumption</p>
          <select defaultValue={Consumption.Formula} onChange={(e)=>{setCurrentInput({...currentInput, "Consumption":e.target.value})}}>
            <option value={Consumption.Formula}>Formula</option>
            <option value={Consumption.Solid}>Solid</option>
            <option value={Consumption.Pepcid}>Pepcid</option>
            <option value={Consumption.Gasdrop}>Gasdrop</option>
          </select>
        </div>
        <div className="section">
          <p>Quantity</p>
          <input required onChange={(e)=>{setCurrentInput({...currentInput, "Quantity": e.target.value})}}/>
          {(currentInput.Consumption==Consumption.Formula||currentInput.Consumption==Consumption.Solid)
          ?
          <p>oz</p>
          :
          <p>ml</p>
          }
        </div>
        <div className="section">
          <p>Date Time</p>
          <input value={currentInput.DateTime} type="datetime-local" onChange={(e)=>{setCurrentInput({...currentInput, "DateTime": e.target.value})}}/>
        </div>

        <button type='submit'>Submit</button>
      </form>
    </>
}

export default Input;