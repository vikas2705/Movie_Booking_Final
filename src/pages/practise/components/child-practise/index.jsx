import React, { useEffect, useState } from "react";

const ChildPractise = props => {
    const { counter, increaseCounterBy2 } = props;

    const [childCounter, setChildCounter] = useState(counter);
    const [isCountChanged, setCountChanged] = useState(false);

    const increaseCounterBy3 = () => {
        setChildCounter(childCounter + 3);
    };

    useEffect(() => {
        alert("increaseCounterBy2 is changed");
    }, [increaseCounterBy2]);

    useEffect(() => {
        //  alert("component mounte");
    }, []);

    useEffect(() => {
        if (counter > 0) {
            alert("counter is changed");
            setCountChanged(true);
            setChildCounter(counter);
        }
    }, [counter]);

    return (
        <div>
            <h1>This is ChildPractise page</h1>

            <h2>Child Count: {childCounter}</h2>

            {isCountChanged && <h2>New parent count: {counter}</h2>}

            <br />
            <br />
            <br />
            <br />
            <br />

            <button type='button' onClick={increaseCounterBy2}>
                Child button - inc by 2
            </button>
        </div>
    );
};

export default ChildPractise;
