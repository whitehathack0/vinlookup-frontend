import './App.css';
import { useState } from "react"



function App() {

  const [name, setName] = useState("");
  const [vin, setVin] = useState("");
  const [message, setMessage] = useState("");
  
  let handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let res = await fetch("http://localhost:8000/api/vin/", {
        method: 'POST',
        body: JSON.stringify({ name: name, vin: vin }),
        headers: { 
          'Content-Type': 'application/json',
        },
      });

      let resJson = await res.json();

      if (res.status) {
        setName("");
        setVin("");
        setMessage(resJson["data"]["year"] + " " + resJson["data"]["make"] + " " + resJson["data"]["model"] + " " + resJson["data"]["trim"]);
      } 
      else {
        setMessage("Some error occured");
      }

    } catch (err) {
      console.log("ERROR" + err);
    }

  };

  return (
    <><div className="title">
      <h1> Vin lookup </h1>
    </div>

    <div className="App">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={name}
          placeholder="Name"
          onChange={(e) => setName(e.target.value)} />
        <input
          type="text"
          value={vin}
          placeholder="Vin"
          onChange={(e) => setVin(e.target.value)} />

        <button type="submit">Create</button>

        <div className="message">{message ? <p>{message}</p> : null}
        
        
        </div>
      </form>
    </div></>
  );
}

export default App;
