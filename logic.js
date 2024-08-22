var myMap = L.map("mapid").setView([0, 0], 2);  // Centered on the world

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(myMap);

    // Pull the Data from Website using JSON URL
    var queryUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/4.5_month.geojson";

d3.json(queryUrl).then(function(data) {
    // Call a function to create markers
    createMarkers(data.features);
});

    // Create Markers for Data Visualization
function createMarkers(earthquakeData) {
    function onEachFeature(feature, layer) {
        layer.bindPopup(`<h3>${feature.properties.place}</h3><hr><p>${new Date(feature.properties.time)}</p><p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
    }

    function markerSize(magnitude) {
        return magnitude * 4;  // Adjust size as needed
    }

    function markerColor(depth) {
        return depth > 90 ? '#ff5f65' :
               depth > 70 ? '#fca35d' :
               depth > 50 ? '#fdb72a' :
               depth > 30 ? '#f7db11' :
               depth > 10 ? '#dcf400' :
                            '#a3f600';
    }

    var earthquakes = L.geoJSON(earthquakeData, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: markerSize(feature.properties.mag),
                fillColor: markerColor(feature.geometry.coordinates[2]),
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: onEachFeature
    });

    earthquakes.addTo(myMap);
}
    // Code to Add a Legend for the Map
    var legend = L.control({ position: "bottomright" });

legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");
    var depths = [-10, 10, 30, 50, 70, 90];
    var colors = ['#a3f600', '#dcf400', '#f7db11', '#fdb72a', '#fca35d', '#ff5f65'];

    for (var i = 0; i < depths.length; i++) {
        div.innerHTML += `<i style="background:${colors[i]}"></i> ${depths[i]}${(depths[i + 1] ? '&ndash;' + depths[i + 1] + '<br>' : '+')}`;
    }

    return div;
};

legend.addTo(myMap);

