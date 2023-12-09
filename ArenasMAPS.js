/* MAPAS */
var nbaTeams = [
{ name: 'Los Angeles Lakers', lat: 34.0522, lon: -118.2437 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
{ name: 'Golden State Warriors', lat: 37.7749, lon: -122.4194 },
];

// Define os limites do mapa
var bounds = L.latLngBounds(L.latLng(30.0522, -118.2437), L.latLng(38, -118.5));

var map = L.map('map', {
    center: bounds.getCenter(),
    zoom: 10,
    maxBounds: bounds,
    maxBoundsViscosity: 0.2
});

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

nbaTeams.forEach(function (team) {
    L.marker([team.lat, team.lon]).addTo(map)
    .bindPopup(team.name);
});