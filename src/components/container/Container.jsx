import React from "react";

function Container({children}) {  // we define styling property only
    return (
        <div className="w-full max-w-7xl mx-auto">{children}</div>
    )
}

export default Container;