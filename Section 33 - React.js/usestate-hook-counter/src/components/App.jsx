import React, {useState} from "react";

function App() {  
    const [count, updateCount] = useState(0);

    function decrease() {
        updateCount(count - 1);
    }

    function increase() {
        updateCount(count + 1);
    }    
    
    return (<div className="container">
         <h1>{count}</h1>
         <button onClick={decrease}>-</button>
         <button onClick={increase}>+</button>
    </div>);
}

export default App;