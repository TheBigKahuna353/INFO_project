import React from 'react';
import { Card, CardMedia, CardActionArea } from "@mui/material"



const VehicleTypeList = (props) => {

    if (props.cats.count === 0) {
        return <div>
            <h1>Categories</h1>
            <p>Loading...</p>
        </div>
    }
    let cats = props.cats;
    
    const getURL = (category) => "http://localhost/INFO_project/Server/models/ImageModel.php?type=" + category;

    // this function replaces '_' with ' ' and capitalizes the first letter of each word
    const capitalize = (str) => {
        return str.toLowerCase().split('_').map((word) => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    }

    const onClick = (event) => {
        console.log(event);
    }

    return (
        <div>
            <h1>Categories</h1>
            <div style={{display: "flex", flexWrap: "wrap", justifyContent: "space-around"}}>
                {cats.map((cat) => (
                    <div key={cat.category} style={{margin: "10px"}} href='/'>
                            <Card>
                                <CardActionArea onClick={onClick}>
                                    <CardMedia 
                                        component="img" 
                                        height="250"
                                        width="250"
                                        sx={{objectFit:"cover"}}
                                        image={getURL(cat.category)} 
                                        alt="Vehicle Image" />
                                    <h1>{capitalize(cat.category)}</h1>
                                    <p>From ${cat.price}</p>
                                </CardActionArea>
                            </Card>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default VehicleTypeList;