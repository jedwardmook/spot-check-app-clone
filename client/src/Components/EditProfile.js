import '../Styles/editprofile.min.css';
import React, { useState, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import logo from "../images/spot_check-2.png"
import { UserContext } from '../context/user';

function EditProfile() {
    const {user, setUser} = useContext(UserContext)
    let navigate = useNavigate()
    const [photo, setPhoto] = useState()
    const [displayPhoto, setDisplayPhoto] = useState(user.photo_url)
    const [name, setName] = useState(user.name)
    const [username, setUsername] = useState(user.username)
    const [bio, setBio] = useState(user.bio)
    const [confirmPhoto, setConfirmPhoto] = useState(false)


    const handlePhotoEvent = (e) => {
        let profileImage = e.target.files[0]
        setPhoto(profileImage)
        let imageTodisplay = URL.createObjectURL(profileImage)
        setDisplayPhoto(imageTodisplay)
    }

    const handleProfilePatch = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('user[username]', username)
        formData.append('user[name]', name)
        formData.append('user[bio]', bio)
        formData.append('user[photo]', photo)
        
        fetch(`/users/${user.id}/update_photo`, {
            method: "PATCH",
            body: formData,
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    setUser(user);
                    navigate('/myprofile')
                });
            } else {
                response.json().then((errors) => console.log(errors));
            }
        });
    }

    const handleProfileNoPhoto = (e) => {
        e.preventDefault();
        const formData = new FormData()
        formData.append('user[username]', username)
        formData.append('user[name]', name)
        formData.append('user[bio]', bio)
        
        fetch(`/users/${user.id}`, {
            method: "PATCH",
            body: formData,
        })
        .then((response) => {
            if (response.ok) {
                response.json().then((user) => {
                    setUser(user);
                    navigate('/myprofile')
                });
            } else {
                response.json().then((errors) => console.log(errors));
            }
        });
    }

  return (
    <div className="edit_profile_window">
        <div className="edit_profile_main_div">
            <Link  className='close' to="/myprofile"><h5 className="add_spot_exit_button">x</h5></Link>
            <img className="logo" src={logo} alt="Spot Check"/>
            <h1 className='welcome'>Edit your profile</h1>
        <form className="edit_profile_form">
            <input
                type="file"
                id="photoUpload"
                placeholder="Profile Pic"
                accept=".jpg, .jpeg, .png, .webp"
                onChange={handlePhotoEvent}
                className="off"
            />
            <div className="edit_profile_photo_div">
                <div>
                    <img className="edit_profile_photo" src={displayPhoto} />
                </div>
                <div className="edit_profile_photo_button_div">
                    <label htmlFor="photoUpload">
                        <a className="edit_profile_photo_button">Change Photo</a>
                    </label>
                </div>
            </div>
            <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
                className="edit_profile_name"
            />
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                className="edit_profile_name"
            />
            <textarea
                type="text"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                placeholder="About"
                className="edit_profile_about"
            />
            {photo? <button onClick={handleProfilePatch} className="edit_profile_photo_button">Confirm Edit</button> : <button onClick={handleProfileNoPhoto}className="edit_profile_submit_button">Edit Profile</button>}
        </form>
        </div>
    </div>
  )
}

export default EditProfile