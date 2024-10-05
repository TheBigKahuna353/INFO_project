import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet'
import 'leaflet/dist/leaflet.css';
import icon from "leaflet/dist/images/marker-icon.png";
import L from "leaflet";
import iconShadow from "leaflet/dist/images/marker-shadow.png";

const Cities = require('../utils/nz.json');


// possible props: 
// origin: [lat, long]
// destination: [lat, long] : optional

const center = [-40.9006, 174.8860]
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [28, 46],
    iconAnchor: [14, 46]
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;

const Map = (props) => {


    const cityData = Cities.filter(city => city.city.toUpperCase() === props.origin)[0];

    if (!props.origin || !cityData) {
        console.log("Origin not provided");
        console.log(props.origin);
        console.log(cityData);
        return (
            <div>
                <h1>Map</h1>
                <p>Origin not provided</p>
            </div>
        );
    }
    var destination = null;
    if (props.destination) {
        destination = Cities.filter(city => city.city.toUpperCase() === props.destination)[0];
        destination = [destination.lat, destination.lng];
    }

    const origin = [cityData.lat, cityData.lng];

    console.log(origin);
    console.log(destination);

    return (
        <MapContainer center={center} zoom={5} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={origin}>
                <Popup>
                    {props.origin}
                </Popup>
            </Marker>
            {props.destination && <Marker position={destination}>
                <Popup>
                    {props.destination}
                </Popup>
                && <Polyline positions={[origin, destination]} />
                </Marker>}
        </MapContainer>
    );
}

export default Map;