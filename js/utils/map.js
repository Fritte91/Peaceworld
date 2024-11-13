if (mapboxgl) {
    mapboxgl.accessToken = 'your_mapbox_token';

    const map = new mapboxgl.Map({
        container: 'map',
        style: 'mapbox://styles/mapbox/dark-v10', // Using a predefined style
        center: [YOUR_LONGITUDE, YOUR_LATITUDE],
        zoom: 15,
        fog: {
            'range': [0.5, 10],
            'color': '#242B4B',
            'horizon-blend': 0.1
        }
    });

    // Add marker
    new mapboxgl.Marker({
        color: "#39FF14" // Neon green color
    })
    .setLngLat([YOUR_LONGITUDE, YOUR_LATITUDE])
    .addTo(map);
} 