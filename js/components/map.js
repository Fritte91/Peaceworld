document.addEventListener('DOMContentLoaded', function() {
    // Replace with your actual Mapbox access token
    mapboxgl.accessToken = 'pk.eyJ1IjoiZnJpdHRlYm95IiwiYSI6ImNtMzFndHVoODBxeDIyc3IzZGdsenprZzQifQ.vyk0EKHv-QZljRxs6o2O1g';

    try {
        const map = new mapboxgl.Map({
            container: 'map',
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [100.631451, 14.075401], // Updated coordinates [longitude, latitude]
            zoom: 15,
            pitch: 45,
            projection: 'mercator',
            trackResize: true,
            fog: false,
            transformRequest: (url, resourceType) => {
                if (resourceType === 'Source' || resourceType === 'Style') {
                    return {
                        url: url,
                        headers: {
                            'Accept': 'application/json'
                        }
                    }
                }
            }
        });

        // Wait for map to load before adding marker
        map.on('load', () => {
            // Add marker
            const marker = new mapboxgl.Marker({
                color: "#00ff00"
            })
                .setLngLat([100.631451, 14.075401]) // Updated marker position
                .addTo(map);

            // Add popup
            const popup = new mapboxgl.Popup({ offset: 25 })
                .setHTML(
                    '<h3>Peace World</h3>' +
                    '<p>63/9 หมู่9 ซอยเทพกุญชร9 ตำบลคลองหนึ่ง คลองหนึ่ง Khlong Luang District, Pathum Thani 12120</p>'
                );

            marker.setPopup(popup);

            // Add navigation controls
            map.addControl(new mapboxgl.NavigationControl());
        });

        // Error handling
        map.on('error', (e) => {
            console.error('Map error:', e);
        });

    } catch (error) {
        console.error('Error initializing map:', error);
    }
}); 