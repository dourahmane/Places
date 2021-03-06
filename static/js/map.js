var planes                          = {{result|safe}} ;
var spot                            = {{spot|safe}} ;

var map                             = L.map('mapid').setView([home[1][0],home[1][1]], 18);
var HIcon                           = new L.icon({
iconUrl: '/static/img/home.png',
iconSize: [35, 45],
iconAnchor: [22, 94],
popupAnchor: [-3, -76]
});

L.marker([home[1][0],home[1][1]], {icon: HIcon}).bindPopup(home[0][0])
.addTo(map);

mapLink                             = '<a href="http://openstreetmap.org">OpenStreetMap</a>';
L.tileLayer(
'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
attribution: '&copy; ' + mapLink + ' Contributors',
maxZoom: 18,
}).addTo(map);
var markers = L.markerClusterGroup();
for (var i = 0; i < planes.length; i++) {
    var myIcon = new L.icon({
        iconUrl: planes[i][3],
        iconSize: [30, 40],
        iconAnchor: [22, 94],
        popupAnchor: [-3, -76]
    });
    marker = new L.marker([planes[i][1],planes[i][2]], {icon: myIcon}).bindPopup(planes[i][0]);
    markers.addLayer(marker);
}
map.addLayer(markers);

var geocoder = L.Control.geocoder({
        defaultMarkGeocode: false
    })
    .on('markgeocode', function(e) {
        map.setView(e.geocode.center, 15)
        L.marker(e.geocode.center).addTo(map)
        .bindPopup(e.geocode.html)
        .openPopup();
    })
    .addTo(map);