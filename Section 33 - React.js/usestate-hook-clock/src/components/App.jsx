import React, {useState} from "react";

function App() {
    const now = new Date().toLocaleTimeString();
    const [time, setTime] = useState(now);
    setInterval(updateTime, 1000);

    function updateTime() {
        const currentTime = new Date().toLocaleTimeString();
        setTime(currentTime);
    }

    return (
    <div className="container">
        <h1>{time}</h1>
        <button onClick={updateTime}>Get Time</button>
    </div>
    );
}

export default App;