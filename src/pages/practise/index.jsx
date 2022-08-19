import React, { useCallback, useMemo, useState } from "react";
import ChildPractise from "./components/child-practise";
import ThirdChild from "./components/third-child";

const Practise = () => {
    const [counter, setCounter] = useState(0);
    const [name, setName] = useState("");

    alert("re-rendered 1");
    const increaseCounter = () => {
        setCounter(counter + 1);
    };

    const increaseCounterBy2 = useCallback(() => {
        setCounter(counter + 2);
    }, [setCounter, counter]);

    /*const calculate = () => {
        // complex calculations or operations here
    };
*/
    const calculate = useMemo(() => {
        // complex calculations or operations here
    }, [counter]);

    alert("re-rendered 2");
    calculate();

    return (
        <div>
            <h1>This is Practise page</h1>

            <h2>Parent Count: {counter}</h2>

            <br />
            <br />
            <br />
            <br />
            <h2>Current name: {name}</h2>

            <button
                type='button'
                onClick={() => {
                    setName("vikas");
                }}
            >
                Change name
            </button>

            <br />

            <button type='button' onClick={increaseCounter}>
                Parent button - inc by 1
            </button>

            <ChildPractise
                counter={counter}
                increaseCounterBy2={increaseCounterBy2}
            />

            <ThirdChild increaseCounterBy2={increaseCounterBy2} />
        </div>
    );
};

export default Practise;
