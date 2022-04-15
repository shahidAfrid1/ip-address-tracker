const ipAddress = document.getElementById('ipAddress')
const ipLocation = document.getElementById('ipLocation')
const ipTimezone = document.getElementById('ipTimezone')
const ipIsp = document.getElementById('ipIsp')
const searchInput = document.getElementById('searchInput')
const goBtn = document.getElementById('goBtn')
const validIp = "^((25[0-5]|(2[0-4]|1[0-9]|[1-9]|)[0-9])(\.(?!$)|$)){4}$"


goBtn.addEventListener('click', handleGoBtn)
searchInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter") {  
      handleGoBtn()
    }
  });
function handleGoBtn(){
    if(!searchInput.value.match(validIp)){
        searchInput.value = "" 
        searchInput.placeholder = "Invalid ip address, please enter a valid ip address" 
        return
    }
    searchInput.placeholder = "Search for any IP address or domain" 
    callIpApi()
    searchInput.value = "" 
    searchInput.placeholder = "Loading..."    
}




let callIpApi = () => fetch(`https://geo.ipify.org/api/v2/country,city?apiKey=at_BtXnffCIOEZQ5013hGULXpAcEaIWi&ipAddress=${searchInput.value?searchInput.value:""}`)
.then( response => response.json())
.then(data => {
    ipAddress.innerHTML = data.ip
    ipLocation.innerHTML = `${data.location.city}, ${data.location.region}, ${data.location.country}`
    ipTimezone.innerHTML = `UTC${data.location.timezone}`
    ipIsp.innerHTML = data.isp
    searchInput.placeholder = "Search for any IP address or domain" 
    setMapPosition(data.location.lat,data.location.lng)
})
.catch(error => console.log(error));
callIpApi()


//map part
var map = L.map('map').setView([51.5, -0.09], 13);
map.zoomControl.setPosition("bottomleft")
L.tileLayer('https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic2hhaDFkYWZyMWQxIiwiYSI6ImNsMXdpbnlkMTB3cjQza281d2tiazd5NWQifQ.ARnEr6gOaOe8r8Oz00eFkQ', {
    attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1,
    accessToken: 'your.mapbox.access.token'
}).addTo(map);


function setMapPosition(lat,lng){
    map.setView([lat,lng],13)
    L.marker([lat,lng]).addTo(map);
}
