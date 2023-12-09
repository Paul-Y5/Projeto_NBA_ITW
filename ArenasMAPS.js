/* MAPAS */
var nbaArenas = [
  {
    name: "Madison Square Garden",
    city: "New York",
    state: "New York",
    lat: 40.7505,
    lng: -73.9934,
  },
  {
    name: "Staples Center",
    city: "Los Angeles",
    state: "California",
    lat: 34.043,
    lng: -118.2673,
  },
  {
    name: "TD Garden",
    city: "Boston",
    state: "Massachusetts",
    lat: 42.3662,
    lng: -71.0621,
  },
  {
    name: "Oracle Arena",
    city: "San Francisco",
    state: "California",
    lat: 37.7503,
    lng: -122.203,
  },
  {
    name: "Chase Center",
    city: "San Francisco",
    state: "California",
    lat: 37.7681,
    lng: -122.3878,
  },
  {
    name: "United Center",
    city: "Chicago",
    state: "Illinois",
    lat: 41.8807,
    lng: -87.6742,
  },
  {
    name: "American Airlines Arena",
    city: "Miami",
    state: "Florida",
    lat: 25.7814,
    lng: -80.187,
  },
  {
    name: "Scotiabank Arena",
    city: "Toronto",
    country: "Canada",
    lat: 43.6435,
    lng: -79.3791,
  },
  {
    name: "Wells Fargo Center",
    city: "Philadelphia",
    state: "Pennsylvania",
    lat: 39.9012,
    lng: -75.1719,
  },
  {
    name: "Smoothie King Center",
    city: "New Orleans",
    state: "Louisiana",
    lat: 29.949,
    lng: -90.0821,
  },
  {
    name: "Fiserv Forum",
    city: "Milwaukee",
    state: "Wisconsin",
    lat: 43.0451,
    lng: -87.9162,
  },
  {
    name: "State Farm Arena",
    city: "Atlanta",
    state: "Georgia",
    lat: 33.7573,
    lng: -84.3963,
  },
  {
    name: "Moda Center",
    city: "Portland",
    state: "Oregon",
    lat: 45.5316,
    lng: -122.6666,
  },
  {
    name: "Capital One Arena",
    city: "Washington, D.C.",
    lat: 38.8977,
    lng: -77.0365,
  },
  {
    name: "Denver Ball Arena",
    city: "Denver",
    state: "Colorado",
    lat: 39.7487,
    lng: -105.0077,
  },
  {
    name: "AT&T Center",
    city: "San Antonio",
    state: "Texas",
    lat: 29.4271,
    lng: -98.4376,
  },
  {
    name: "Amway Center",
    city: "Orlando",
    state: "Florida",
    lat: 28.5392,
    lng: -81.383,
  },
  {
    name: "Target Center",
    city: "Minneapolis",
    state: "Minnesota",
    lat: 44.9794,
    lng: -93.2768,
  },
  {
    name: "Barclays Center",
    city: "Brooklyn",
    state: "New York",
    lat: 40.6826,
    lng: -73.9754,
  },
  {
    name: "Vivint Arena",
    city: "Salt Lake City",
    state: "Utah",
    lat: 40.7683,
    lng: -111.9011,
  },
  {
    name: "Spectrum Center",
    city: "Charlotte",
    state: "North Carolina",
    lat: 35.2251,
    lng: -80.8392,
  },
  {
    name: "Rocket Mortgage FieldHouse",
    city: "Cleveland",
    state: "Ohio",
    lat: 41.4966,
    lng: -81.6882,
  },
  {
    name: "Bankers Life Fieldhouse",
    city: "Indianapolis",
    state: "Indiana",
    lat: 39.7639,
    lng: -86.1554,
  },
  {
    name: "Chesapeake Energy Arena",
    city: "Oklahoma City",
    state: "Oklahoma",
    lat: 35.4634,
    lng: -97.5151,
  },
  {
    name: "Little Caesars Arena",
    city: "Detroit",
    state: "Michigan",
    lat: 42.3411,
    lng: -83.055,
  },
  {
    name: "Toyota Center",
    city: "Houston",
    state: "Texas",
    lat: 29.7508,
    lng: -95.3621,
  },
  {
    name: "Golden 1 Center",
    city: "Sacramento",
    state: "California",
    lat: 38.5802,
    lng: -121.4994,
  },
  {
    name: "Talking Stick Resort Arena",
    city: "Phoenix",
    state: "Arizona",
    lat: 33.4457,
    lng: -112.0712,
  },
  {
    name: "Bank of America Stadium",
    city: "Charlotte",
    state: "North Carolina",
    lat: 35.2251,
    lng: -80.8392,
  },
];

// Define os limites do mapa para os EUA
const map = L.map("map", {
  center: [39.8283, -98.5795], // centrar nos EUA
  zoom: 4.6,
  maxBounds: [
    [50.3457868, -66.9345703], // Limite Norte e Este
    [23.396308, -125.0016502], // Limite Sul e oeste
  ],
  maxBoundsViscosity: 1
});

// Cria "Titulo do mapa"
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© OpenStreetMap contributors'
}).addTo(map);

nbaArenas.forEach(function (arena) {
    L.marker([arena.lat, arena.lng]).addTo(map).bindPopup(arena.name, arena.state);
});