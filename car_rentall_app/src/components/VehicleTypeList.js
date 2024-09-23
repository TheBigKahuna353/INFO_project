import React from 'react';
import { Card } from "@mui/material"



const VehicleTypeList = (props) => {

    if (props.cats.count === 0) {
        return <div>
            <h1>Categories</h1>
            <p>Loading...</p>
        </div>
    }
    let cats = props.cats;
    

    return (
        <div>
            <h1>Categories</h1>
            <div style={{display: "flex", flexWrap: "wrap"}}>
                {cats.map((cat) => (
                    <div key={cat.category} style={{margin: "10px"}}>
                        <Card>
                            <h1>{cat.category}</h1>
                            <p>From ${cat.price}</p>
                        </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VehicleTypeList;