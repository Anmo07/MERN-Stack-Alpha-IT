import React from "react";
import { useState } from "react";

function Usestate() {
    const [count ,setCount ] = useState(0)
    return (
<div> 
    <p>You clicked {count} times ...</p>
    <button onClick={() => setCount(count + 1)}>Click me</button>
    <button >reset</button>
</div>
    )
}
export default Usestate;
