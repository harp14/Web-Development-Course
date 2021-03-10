import React, {useState} from "react";

function App() {
  
    const [headingText, setHeadingText] = useState("Hello");
    const [hoverState, setHoverState] = useState(false);
    
    function handleClick() {
        setHeadingText("Submitted");
    }
    
    function handleMouseOver() {
        setHoverState(true);
    }

    function handleMouseOut() {
        setHoverState(false);
    }

    return (
    <div className="container">
        <h1>{headingText}</h1>
        <input type="text" placeholder="What's your name?" />
        <button
            onClick={handleClick}
            onMouseOver={handleMouseOver}
            onMouseOut={handleMouseOut}
            style={{backgroundColor: hoverState ? "black" : "white"}}>Submit
        </button>
    </div>
    );
}

export default App;