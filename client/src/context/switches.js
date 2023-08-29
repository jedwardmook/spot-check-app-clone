import React, { useState } from "react";

const SwitchesContext = React.createContext();

function SwitchesProvider({children}) {
    const [placesDiv, setPlacesDiv] = useState(false)
    const [isClicked, setIsClicked] = useState(false)
    const [addSpot, setAddSpot] = useState(false)
    const [showFavorites, setShowFavorites] = useState(false)

    return <SwitchesContext.Provider value={{placesDiv, setPlacesDiv, isClicked, setIsClicked, addSpot, setAddSpot, showFavorites, setShowFavorites}}>
                {children}
            </SwitchesContext.Provider>
}

export { SwitchesContext, SwitchesProvider}