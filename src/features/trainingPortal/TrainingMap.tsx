import React, {useEffect} from "react";
import { Loader } from '@googlemaps/js-api-loader';

const loader = new Loader({
    apiKey: "",
    version: "weekly",
    libraries: [],
});

const defaultMapOptions = {
    center: {
        lat: 33.9722862,
        lng: -117.6947923,
    },
    zoom: 8,
};

const TrainingMap = ({address, zoom = 8} : {address: string, zoom: number}) => {
    let geocoder, map;
    useEffect(() => {
        loader
            .load()
            .then((google) => {
                geocoder = new google.maps.Geocoder();
                geocoder.geocode({
                    'address': address,
                }, function (results: any, status: any) {
                    if (status === google.maps.GeocoderStatus.OK) {
                        let locationMapOptions = {
                            center: results[0].geometry.location,
                            zoom,
                        }
                        map = new google.maps.Map(document.getElementById("location-map"), locationMapOptions);

                        new google.maps.Marker({
                            map: map,
                            position: results[0].geometry.location
                        });
                    } else {
                        map = new google.maps.Map(document.getElementById("location-map"), defaultMapOptions);
                    }
                })

            })
            .catch(e => {
                console.log(e)
            });
    }, []);

    return (
        <div id="location-map" className="h-full w-full" />
    );
}

export default TrainingMap;
