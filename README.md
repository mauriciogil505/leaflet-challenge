# Leaflet Challenge: Earthquake Visualization

## Project Overview
The United States Geological Survey (USGS) is responsible for monitoring and providing scientific data on natural hazards, including earthquakes. The goal of this project is to visualize earthquake data to help the USGS better educate the public and inform other government organizations. This visualization will also help highlight the importance of USGS's work in securing funding for future research.

### 1. Launch VS code and create files

### 2. Create Index html
Index html code:
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Earthquake Data Visualization</title>
    
    <!-- Leaflet CSS -->
    <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css" />
    
    <!-- Custom CSS -->
    <style>
        #mapid {
            height: 600px;
            width: 100%;
        }
        .info.legend {
            background-color: white;
            padding: 6px 8px;
            font-size: 14px;
            color: #555;
        }
    </style>
</head>
<body>

    <h1>Earthquake Visualization</h1>
    <div id="mapid"></div>

    <!-- Leaflet JS -->
    <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
    
    <!-- D3.js for data fetching -->
    <script src="https://d3js.org/d3.v6.min.js"></script>
    
    <!-- Link to your JavaScript file -->
    <script src="logic.js"></script>
    
</body>
</html>

### Logic.js

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


## Earthquake Visualization

### Map Setup
- **Create a Map**:
  - Used Leaflet.js to create a map centered at a default location.
  - Added a tile layer from Mapbox for the base map.

### Fetch Earthquake Data
- **Fetch Earthquake Data**:
  - Earthquake data was fetched from a local JSON file in the data directory, which contains earthquake records for the past 7 days.

### Plot Earthquake Data
- **Plot Earthquake Data**:
  - Plotted earthquake data on the map using markers.
  - The size of the markers represents the magnitude of the earthquake.
  - The color of the markers represents the depth of the earthquake.

### Marker Popups
- **Marker Popups**:
  - Added popups to each marker to display additional information about the earthquake, including its magnitude, depth, location, and time.

### Legend
- **Legend**:
  - Created a legend to provide context for the map, explaining the color coding for depth and the size scaling for magnitude.

## Instructions to Run the Project

### Clone the Repository
- Clone the repository using the following command:
  ```bash
  git clone https://github.com/your-username/leaflet-challenge.git

  ### Credits: Stack overflow, Xpert Learning Assitant, Classroom study materials
