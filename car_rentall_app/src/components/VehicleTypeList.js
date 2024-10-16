import React from 'react';
import { Card, CardMedia } from "@mui/material"



const VehicleTypeList = (props) => {

    if (props.cats.count === 0) {
        return <div>
            <h1>Categories</h1>
            <p>Loading...</p>
        </div>
    }
    let cats = props.cats;
    
    const getURL = (category) => "http://localhost/INFO_project/Server/models/ImageModel.php?type=" + category;

    return (
        <div>
            <h1>Categories</h1>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
                {cats.map((cat) => (
                    <div key={cat.category} style={{margin: "10px"}}>
                        <Card>
                            <CardMedia 
                                component="img" 
                                height="250"
                                width="250"
                                sx={{objectFit:"cover"}}
                                image={getURL(cat.category)} 
                                alt="Vehicle Image" />
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