import '../Styles/editspot.min.css';
import React, { useState, useContext } from 'react'
import { UserContext } from "../context/user";
import logo from "../images/spot_check-2.png"
import { useLocation, Link, useNavigate } from 'react-router-dom'

const MAX_AMOUNT = 8

function EditSpot() {
    const {user} = useContext(UserContext)
    const location = useLocation()
    let navigate = useNavigate()
    const state = location.state
    const [editName, setEditName] = useState(state.name)
    const [editAbout, setEditAbout] = useState(state.about)
    const [existingPhotos, setExistingPhotos] = useState(state.image_urls)
    const [newPhotos, setNewPhotos] = useState([])
    const [flatBar, setFlatBar] = useState(state.flat_bar)
    const [handrail, setHandrail] = useState(state.handrail)
    const [manualPad, setManualPad] = useState(state.manual_pad)
    const [gap, setGap] = useState(state.gap)
    const [ledge, setLedge] = useState(state.ledge)
    const [transition, setTransition] = useState(state.transition)
    const [bank, setBank] = useState(state.bank)
    const [stairs, setStairs] = useState(state.stairs)
    const [deleteSpot, setDeleteSpot] = useState(false)

    const handlePhotosArray = files => {
        const photosToUpload = [...newPhotos];
        files.some((file) => {
            photosToUpload.push(file)
        })
        setNewPhotos(photosToUpload)
    };

    const handlePhotoEvent = (e) => {
        const uploadedPhotos = Array.prototype.slice.call(e.target.files)
        handlePhotosArray(uploadedPhotos)
    }

    const handleDeleteDiv = () => {
        setDeleteSpot(!deleteSpot)
    }

    const handleSubmitEdit = (e) => {
        e.preventDefault()
        const formData = new FormData()
        formData.append('spot[name]', editName)
        formData.append('spot[about]', editAbout)
        formData.append('spot[user_id]', user.id)
        formData.append('spot[handrail]', handrail)
        formData.append('spot[manual_pad]', manualPad )
        formData.append('spot[gap]', gap)
        formData.append('spot[ledge]', ledge )
        formData.append('spot[transition]', transition)
        formData.append('spot[bank]', bank)
        formData.append('spot[stairs]', stairs)
        newPhotos.forEach((photo, index) =>
            formData.append(`images[]`, photo)
        );

        fetch(`/spots/${state.id}`, {
            method: "PATCH",
            body: formData,
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((spot) => {
                    console.log(spot)
                    navigate(`/spots/${state.id}`)
                });
            } else {
                response.json().then((errors) => console.log(errors));
            }
        });
    }

    const deleteSpotConfirmation = () => {
        fetch(`/spots/${state.id}`, {
            method: "DELETE",
            }).then((response) => {
                if (response.ok) {
                    navigate('/')
            }
        })
    }

   
  return (
    <div className="edit_spot_window">
    <div className="edit_spot_main_div">
    <Link  className='close' to={`/spots/${state.id}`}><h5 className="add_spot_exit_button">x</h5></Link>
        <img className="logo" src={logo} alt="Spot Check"/>
        <h1 className='welcome'>Edit your spot</h1>
    <div className="add_spot_form_div">
        <form onSubmit={handleSubmitEdit}>
            <input
                placeholder="New name of the Spot"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
                className="add_spot_top_input"   
            />
            <h4 className="edit_spot_address">{state.address}</h4>
            <br/>
            <input
                id="photosUpload"
                type="file"
                className="off"
                accept=".jpg, .jpeg, .png, .webp"                        
                onChange={handlePhotoEvent}
                disabled={newPhotos.length === MAX_AMOUNT}
                />
            <div className="edit_spot_photos_main_div">
                <h5 className='edit_spot_photos_div_header'>Existing Photos</h5>
                <div className="edit_spot_photos_div">
                    {existingPhotos && existingPhotos.map ((photo, index) => {
                        return <img className="existing_photo" src={photo} key={index}/>
                    })}
                </div>
                <h5 className='edit_spot_photos_div_header'>New Photos</h5>
                <h5 className="warning">(will replace Existing Photos)</h5>
                <div className='edit_spot_existing_photos_div'>
                {newPhotos && newPhotos.map ((photo, index) => {
                    return <div key={index}>
                            <button className="filter_photo"
                            onClick={() => setNewPhotos((photos) => {
                                    return photos.filter((photo, i) => i !== index);
                             })}>x</button>
                            <img className="existing_photo" src={URL.createObjectURL(photo)} />
                            </div>
                    })}
                </div>
            </div>
            <div className="add_spot_photo_button_div">
                    <label htmlFor="photosUpload">
                        <a className="add_spot_photo_button">{newPhotos.length === MAX_AMOUNT? "Limit Reached!" : "Add Photos"}</a>
                    </label>
            </div>
            <textarea
                placeholder="Description of Spot"
                value={editAbout}
                onChange={(e) => setEditAbout(e.target.value)}
                className="edit_spot_textarea"   
            />
            <div className="edit_spot_attributes_div">
                <div className="edit_spot_attribute_pairs">
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
                <div className="edit_spot_attribute_pairs">
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
                <div className="edit_spot_attribute_pairs">
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
                <div className="edit_spot_attribute_pairs">
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
            <h5 className="edit_spot_attributes_header">Select Attributes</h5>
            <br/>
            <button className="edit_spot_submit">Edit Spot</button>
            </form>
            <p className='edit_spot_delete' onClick={handleDeleteDiv}>Delete Spot</p>
    </div>
    <div className={deleteSpot? "edit_spot_delete_div": "off"}>
            <div className='delete_spot_div'>
                <h5 className='delete_spot_header'>Delete your spot</h5>
                <div className='delete_spot_button_div'>
                    <button className='delete_spot_button' onClick={deleteSpotConfirmation}>Yes</button>
                    <button className='delete_cancel_button' onClick={handleDeleteDiv}>Cancel</button>
                </div>
            </div>
        </div>
    </div>
</div>
  )
}

export default EditSpot