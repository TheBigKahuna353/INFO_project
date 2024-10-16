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

    const locations = props.locations;
    console.log(locations);

    if (locations.length === 0) {
        return <p>Loading...</p>
    }
    console.log(locations);
    const data = []
    locations.forEach((location) => {
        const temp = Cities.filter(city => city.city.toUpperCase() === location)[0];
        data.push([temp.lat, temp.lng]);
    })

    const drawLine = props.drawLine ? true : false;

    console.log(data);


    return (
        <MapContainer center={center} zoom={5} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={data[0]}>
                <Popup>
                    {locations[0]}
                </Popup>
            </Marker>
            {data.slice(1).map((loc, index) => {
                return (
                <Marker key={loc} position={loc}>
                    <Popup>
                        {locations[index + 1]}
                    </Popup>
                    {drawLine && <Polyline positions={[data[0], loc]} />}
                </Marker>
            )}) }
        </MapContainer>
    );
}

export default Map;