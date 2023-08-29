import React,{ useState, useContext, useEffect} from "react";
import { UserContext } from "../context/user";
import Geocode from 'react-geocode'
import { Link, useNavigate } from "react-router-dom"
import "../Styles/addspot.min.css"
import logo from "../images/spot_check-2.png"

const MAX_AMOUNT = 8;

function AddSpot({spotLat, spotLng}){
    const {user} = useContext(UserContext)
    let navigate = useNavigate()
    const [name, setName] = useState("")
    const [lat, setLat] = useState(spotLat)
    const [lng, setLng] = useState(spotLng)
    const [about, setAbout] = useState("")
    const [userId, setUserId] = useState(user.id)
    const [photos, setPhotos] = useState([])
    const [address, setAddress] = useState()
    const [flatBar, setFlatBar] = useState(false)
    const [handrail, setHandrail] = useState(false)
    const [manualPad, setManualPad] = useState(false)
    const [gap, setGap] = useState(false)
    const [ledge, setLedge] = useState(false)
    const [transition, setTransition] = useState(false)
    const [bank, setBank] = useState(false)
    const [stairs, setStairs] = useState(false)
    const [errors, setErrors] = useState ()
    
    Geocode.setApiKey(process.env.REACT_APP_GOOGLE_MAPS_API_KEY)
    Geocode.setLocationType("ROOFTOP");
    useEffect(() => {Geocode.fromLatLng(spotLat, spotLng).then((response) => {
        setAddress(response.results[0].formatted_address)
        })
        }, [])

    const handleSubmitSpot = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('spot[name]', name)
        formData.append('spot[lat]', lat)
        formData.append('spot[lng]', lng)
        formData.append('spot[about]', about)
        formData.append('spot[user_id]', userId)
        formData.append('spot[address]', address)
        formData.append('spot[handrail]', handrail)
        formData.append('spot[manual_pad]', manualPad)
        formData.append('spot[flat_bar]', flatBar)
        formData.append('spot[gap]', gap)
        formData.append('spot[ledge]', ledge )
        formData.append('spot[transition]', transition)
        formData.append('spot[bank]', bank)
        formData.append('spot[stairs]', stairs)
        photos.forEach((photo, index) =>
            formData.append(`images[]`, photo)
        );

        fetch('/spots', {
            method: "POST",
            body: formData,
        }).then((response) => {
            if (response.ok) {
                response.json().then((spot) => {;
                    navigate(`/spots/${spot.id}`);
                })
            } else {
                response.json().then((errors) => setErrors(errors.errors))
            }
        })
    }

    const handlePhotosArray = files => {
        const photosToUpload = [...photos];
        files.some((file) => {
            photosToUpload.push(file)
        })
        setPhotos(photosToUpload)
    };

    const handlePhotoEvent = (e) => {
        const uploadedPhotos = Array.prototype.slice.call(e.target.files)
        handlePhotosArray(uploadedPhotos)
    }

    return (
        <div className="add_spot_window">
            <div className={errors? "add_spot_main_div_long" : "add_spot_main_div"}>
            <Link  className='close' to='/'><h5 className="add_spot_exit_button">x</h5></Link>
                <img className="logo" src={logo} alt="Spot Check"/>
                <h1 className='welcome'>Add your spot</h1>
                <h5 className='add_spot_address'>({address})</h5>
            <div className="add_spot_form_div">
                <form onSubmit={handleSubmitSpot}>
                    <input
                        placeholder="Name of Spot"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="add_spot_top_input"   
                    />
                    <textarea
                        placeholder="Description of Spot"
                        value={about}
                        onChange={(e) => setAbout(e.target.value)}
                        className="add_spot_textarea"   
                    />
                    <input
                        id="photosUpload"
                        type="file"
                        className="off"
                        accept=".jpg, .jpeg, .png, .webp"
                        onChange={handlePhotoEvent}
                        disabled={photos.length === MAX_AMOUNT}
                    />
                    <div className="add_spot_photos_div">
                        {photos && photos.map ((photo, index) => {
                            return <div key={index}>
                                        <button type="button" className="filter_photo" onClick={() => 
                                                    setPhotos((photos) => {
                                                        return photos.filter((photo, i) => i !== index);
                                        })}>x</button>
                                        <img height={"60px"} src={URL.createObjectURL(photo)} />
                                    </div>
                        })}
                    </div>
                    <div className="add_spot_photo_button_div">
                        <label htmlFor="photosUpload">
                            <a className="add_spot_photo_button">{photos.length === MAX_AMOUNT? "Limit Reached!" : "Add Photos"}</a>
                        </label>
                    </div>
                    <div className="add_spot_attributes_div">
                        <div className="add_spot_attribute_pairs">
                            <label>
                                <input 
                                type="checkbox" 
                                className="add_spot_checkbox"
                                checked={transition}
                                onChange={() => setTransition(!transition)}/>Transition
                            </label>
                            <label>
                                <input 
                                type="checkbox" 
                                className="add_spot_checkbox"
                                checked={stairs}
                                onChange={() => setStairs(!stairs)}/>Stairs
                            </label>
                        </div>
                        <div className="add_spot_attribute_pairs">
                        <label>
                        <input 
                            type="checkbox" 
                            className="add_spot_checkbox"
                            checked={gap}
                            onChange={() => setGap(!gap)}/>Gap
                        </label>
                        <label>
                        <input 
                            type="checkbox" 
                            className="add_spot_checkbox"
                            checked={manualPad}
                            onChange={() => setManualPad(!manualPad)}/>Manual Pad
                        </label>
                        </div>
                        <div className="add_spot_attribute_pairs">
                        <label>
                        <input 
                            type="checkbox" 
                            className="add_spot_checkbox"
                            checked={handrail}
                            onChange={() => setHandrail(!handrail)}/>Handrail
                        </label>
                        <label>
                        <input 
                            type="checkbox" 
                            className="add_spot_checkbox"
                            checked={flatBar}
                            onChange={() => setFlatBar(!flatBar)}/>Flat Bar
                        </label>
                        </div>
                        <div className="add_spot_attribute_pairs">
                        <label>
                        <input 
                            type="checkbox" 
                            className="add_spot_checkbox"
                            checked={ledge}
                            onChange={() => setLedge(!ledge)}/>Ledge
                        </label>
                        <label>
                        <input 
                            type="checkbox" 
                            className="add_spot_checkbox"
                            checked={bank}
                            onChange={() => setBank(!bank)}/>Bank
                        </label>
                        </div>
                    </div>
                        <h5 className="add_spot_attributes_header">Select Attributes</h5>
                    <br/>
                    <button className="add_spot_submit">Confirm Spot</button>
                    </form>
            </div>
            {errors && <div className="add_spot_errors_div">{errors.map((error, index) => {
                return <h5 className="add_spot_error">- {error} -</h5>}
                )}
                </div>}
            </div>
        </div>
    )
}

export default AddSpot;