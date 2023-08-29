import '../App.css';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import LogIn from './LogIn';
import MapContainer from './MapContainer';
import SignUp from './SignUp';
import Navbar from './Navbar';
import MyProfile from './MyProfile';
import AddSpot from './AddSpot';
import { UserProvider } from '../context/user';
import { useState } from 'react';
import { SwitchesProvider } from '../context/switches';
import Spot from './Spot';
import AddReview from './AddReview';
import EditSpot from './EditSpot';
import EditProfile from './EditProfile';
import EditReview from './EditReview';

function App() {
  const [spotLat, setSpotLat] = useState(null)
  const [spotLng, setSpotLng] = useState(null)


  return (
    <Router>
    <div className="App">
      <UserProvider>
        <SwitchesProvider>
        <Navbar />
        <Routes>
          <Route exact path='/'
          element={<MapContainer
            setSpotLat={setSpotLat}
            setSpotLng={setSpotLng}
            />}
          />
          <Route exact path='addspot'
          element={<AddSpot
            spotLat={spotLat}
            spotLng={spotLng}
            />}
          />
          <Route path='signup'
          element={<SignUp />}
          />
          <Route path='login'
          element={<LogIn />}
          />
          <Route path='myprofile'
          element={<MyProfile />}
          />
          <Route path={`spots/:spotId`}
          element={<Spot />}
          />
          <Route path={`spots/add_review`}
          element={<AddReview />}
          />
           <Route path={`spots/edit_review`}
          element={<EditReview />}
          />
          <Route path={`spots/edit_spot`}
          element={<EditSpot />}
          />
          <Route path={`/edit_profile`}
          element={<EditProfile />}
          />
      </Routes>
      </SwitchesProvider>
      </UserProvider>
    </div>
    </Router>
  );
}

export default App;
