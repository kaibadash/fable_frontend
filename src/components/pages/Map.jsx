import React, { useEffect, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";
import { SwipeableTemporaryDrawer } from "../organisms/MapDrawer";

export const Map = () => {
  const [mapStyle, setMapStyle] = useState({});
  const defaultCenter = {
    lat: 35.69575,
    lng: 139.77521,
  };

  const locations = [
    {
      name: "高尾山",
      location: {
        lat: 35.625412,
        lng: 139.243739,
      },
    },
    {
      name: "昭和記念公園",
      location: {
        lat: 35.710975,
        lng: 139.393889,
      },
    },
  ];
  const mapOptions = {
    mapTypeControl: false,
  };

  //mapのサイズを動的に合わせる
  useEffect(() => {
    const handleResize = () => {
      setMapStyle({
        width: window.innerWidth + "px",
        height: window.innerHeight + "px",
      });
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_API_KEY,
  });

  if (loadError) return "Error loading maps";
  if (!isLoaded) return "Loading Maps";

  return (
    <>
      <SwipeableTemporaryDrawer />
      <GoogleMap
        mapContainerStyle={mapStyle}
        zoom={13}
        center={defaultCenter}
        options={mapOptions}
      >
        {locations?.map((item) => {
          return <Marker key={item.name} position={item.location} />;
        })}
      </GoogleMap>
    </>
  );
};
