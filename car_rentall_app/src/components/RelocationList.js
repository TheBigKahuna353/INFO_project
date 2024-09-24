import React from 'react';
import RelocationListObj from './RelocationListObj';


const RelocationList = ({relocations}) => {

    const card = {
        padding: "10px",
        margin: "20px",
        display: "inline-grid",
        width: "fit-content",
        minWidth: "20%",
        position: "relative",
    }

    if (relocations.count === 0) {
        return <div>
            <h1>Relocations</h1>
            <p>Loading...</p>
        </div>
    }

    console.log(relocations);
    return (
        <div style={{}}>
            <div style={{}}>
                {relocations.map((relocation) => (
                    <div key={relocation.rego} style={card}>
                        <RelocationListObj {...relocation}/>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default RelocationList;