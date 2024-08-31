import React, {useEffect, useState, useRef} from "react";
import * as atlas from 'azure-maps-control';
import "../../../assets/css/azure-map.css";

const AzureMapInstance = ({values}) => {
    const map = useRef(null);
    const dataSourceRef = new atlas.source.DataSource();
    const layerRef = new atlas.layer.SymbolLayer(dataSourceRef);
    const [isMapReady, setIsMapReady] = useState(false);

    useEffect(() => {
        map.current = new atlas.Map(document.getElementById('map_div'), {
            center: [-118.295, 34.010166],
            zoom: 10,
            view: 'Auto',
            authOptions: {
                authType: atlas.AuthenticationType.subscriptionKey,
                subscriptionKey: '0em0MsBOEk3y74NL6ELRB2qjSQ0c3IlJZObu2n9_93Q'
            }
        });
        map.current.events.add('ready', function () {
            // set mapIsReady
            setIsMapReady(true);
            // add the zoom control to the map.
            map.current.controls.add(new atlas.control.ZoomControl(), {
                position: 'top-right'
            });
        });
    }, []);

    useEffect(() => {
        if (isMapReady && values.latitude && (typeof values.latitude === 'number') && values.longitude && (typeof values.longitude === 'number') ) {
            map.current.sources.add(dataSourceRef);
            map.current.layers.add(layerRef);
            map.current.setCamera({
                center: [values.longitude, values.latitude],
                zoom: values.zoom ? values.zoom : 19,
            });
            const newPoint = new atlas.data.Position(values.longitude, values.latitude);
            dataSourceRef.add(new atlas.data.Feature(new atlas.data.Point(newPoint)));
        }
    }, [isMapReady, values]);

    return (
        <div className="h-full" id="map_div" />
    );
}

export default AzureMapInstance;