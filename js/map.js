let map = L.map('map').setView([40.7537, -73.9992], 13);

let osm = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
});
osm.addTo(map);

L.marker([40.7537, -73.9992]).addTo(map)
    .bindPopup("Brooklyn, NY")
    .openPopup();

function updateMap(lat, lng, ct, reg) {
    map.setView([`${lat}`, `${lng}`], 13);
    L.marker([`${lat}`, `${lng}`]).addTo(map)
    .bindPopup(`${ct}, ${reg}`)
    .openPopup();
}
