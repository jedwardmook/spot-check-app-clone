import React, { useEffect, useState, useContext } from "react"
import { GoogleMap, LoadScript, Marker} from "@react-google-maps/api"
import { Link } from "react-router-dom";
import '../Styles/mapcontainer.min.css'
import board from '../images/board.svg'
import marker from '../images/marker.svg'
import favorite_marker from '../images/favorite_marker.svg'
import Places from "./Places";
import { SwitchesContext } from "../context/switches";
import { UserContext } from "../context/user";


const containerStyle = {
    display: 'flex',
    width: "100%" ,
    height: '500px'
};

const center = {
    lat: 41.88183,
    lng: -87.646177
};

const options = {
    disableDefaultUI: false,
    clickableIcons: false,
    streetViewControl: false,
    fullscreenControl: false,
    mapTypeControl: false,
}

const Libraries = ['places']


function MapContainer({setSpotLat, setSpotLng}) {
    const {user} =useContext(UserContext)
    const {addSpot, setAddSpot, showFavorites, setIsClicked} = useContext(SwitchesContext)
    const [map, setMap] = useState(null)
    const [whereabouts, setWhereabouts] = useState(null)
    const [spots, setSpots] = useState([])
    const [selectedSpot, setSelectedSpot] = useState(null)
    const [favoriteSpots, setFavoriteSpots] = useState(null)

    const handleClick = (e) => {
        setSpotLat(e.latLng.lat());
        setSpotLng(e.latLng.lng());
        setAddSpot(!addSpot)
        setSelectedSpot(null)
    }

    useEffect(() => {
        fetch('/spots')
            .then((response) => {
                if (response.ok) {
                response.json().then((spots) => {
                    setSpots(spots)
                    });
                } else {

            }
            })
    }, [])

    useEffect(() => {
        let arrayOfFavoriteSpots = []
        user.favorites_array && user.favorites_array.map ((favorite, index) => {
            return fetch(`/spots/${favorite}`)
                        .then((response) => {
                        if (response.ok) {
                        response.json().then((spot) => arrayOfFavoriteSpots.push(spot));
                        } else {
                        }
                        })
        })
        setFavoriteSpots(arrayOfFavoriteSpots)
    }, [user.favorites_array])

    const favoritedSpotsToDisplay = favoriteSpots && favoriteSpots.map((spot, index) => {
        return <Marker key={index} icon={{url: favorite_marker, scaledSize: {width: 80, height: 60}}} position={spot.lat_lng} clickable={true} onClick={() => setSelectedSpot(spot)} />
    })
     
    const allSpots = spots.map((spot, index) => {
        return <Marker key={index} icon={{url: marker, scaledSize: {width: 60, height: 60}}} position={spot.lat_lng} clickable={true} onClick={() => setSelectedSpot(spot)}/>
    })

    return (
        <LoadScript
            googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}
            libraries={Libraries}
            >
            <div onClick={() => setIsClicked(false)} className="map_div">
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={center}
                    zoom={14}
                    options={options}
                    onLoad={map => setMap(map)}
                    onClick={handleClick}
                >
                    {showFavorites && user.favorites_array.length > 0 ? favoritedSpotsToDisplay: allSpots}
                    {whereabouts && <Marker icon={{url:board, scaledSize:{width: 40, height: 60}}} position={whereabouts}/>}
                </GoogleMap>
                {selectedSpot && (
                    <Link to={`/spots/${selectedSpot.id}`} className="selected_spot_link"><div className="selected_spot_div">
                        <div className="selected_spot_image_div">
                            <img className="selected_spot_image" alt="Spot" src={selectedSpot.image_urls[0] ? selectedSpot.image_urls[0] : "https://user-images.githubusercontent.com/24848110/33519396-7e56363c-d79d-11e7-969b-09782f5ccbab.png"} />
                        </div>
                        <div className="selected_spot_info_div">
                            <h4 className="selected_spot_info_header">{selectedSpot.name}</h4>
                            <h4 className="selected_spot_info_header">Rating: {selectedSpot.ratings_average? `${selectedSpot.ratings_average} ✶`: '5 ✶'}</h4>
                            <p className="<selected_spot_info_about"><strong>About: </strong>{selectedSpot.about.substring(0,50)}...</p>
                        </div>
                    </div></Link>
                )}
                <Places
                    map={map}
                    setWhereabouts={setWhereabouts}/>
                
            </div>
        </LoadScript>
    )
}

export default MapContainer