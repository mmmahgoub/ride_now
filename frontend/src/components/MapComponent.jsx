import React, { useEffect, useState } from 'react'
import { GoogleMap, LoadScript, MarkerF, InfoWindowF } from '@react-google-maps/api'
import './MapComponent.css'

const MapComponent = ({ onLocationSelect }) => {
  const [map, setMap] = useState(null)
  const [userLocation, setUserLocation] = useState({
    lat: 25.2854,
    lng: 55.3641
  })
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [infoWindow, setInfoWindow] = useState(null)

  const containerStyle = {
    width: '100%',
    height: '400px'
  }

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords
        setUserLocation({ lat: latitude, lng: longitude })
      })
    }
  }, [])

  const handleMapClick = (e) => {
    const newLocation = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    }
    setSelectedLocation(newLocation)
    onLocationSelect(newLocation)
  }

  return (
    <LoadScript googleMapsApiKey={process.env.REACT_APP_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={userLocation}
        zoom={13}
        onClick={handleMapClick}
        onLoad={setMap}
      >
        {/* User Location Marker */}
        <MarkerF position={userLocation} title="Your Location" />

        {/* Selected Location Marker */}
        {selectedLocation && (
          <MarkerF position={selectedLocation} title="Destination" />
        )}
      </GoogleMap>
    </LoadScript>
  )
}

export default MapComponent
