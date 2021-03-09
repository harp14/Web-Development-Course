import React from "react";

function Form(props) {
    let isRegistered = true;

    return (
    <form className="form">
        <input type="text" placeholder="Username" />
        <input type="password" placeholder="Password" />
        {!isRegistered && <input type="password" placeholder="Confirm Password" />}
        <button type="submit">
            {isRegistered ? "Login" : "Register"}
        </button>
    </form>
    );
}

export default Form;