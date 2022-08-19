import React, { useEffect, useState } from "react";

const ThirdChild = props => {
    const { increaseCounterBy2 } = props;

    useEffect(() => {
        alert("increaseCounterBy2 is changed in 3rd child");
    }, [increaseCounterBy2]);

    return (
        <div>
            <h1>This is Third child</h1>
        </div>
    );
};

export default ThirdChild;
