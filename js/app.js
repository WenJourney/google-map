//高度自适应
var mainBody = document.getElementById('main-body');
var screenHeight = document.documentElement.clientHeight;
mainBody.style.height = screenHeight+"px";

//获取input和选框
var input = document.getElementById("search－bar");
var leftSide = document.getElementById("left-side");

//地址数据
var locations = [
    {title: 'Cable Wakeboard Park', location: {lat: 49.030289, lng: 2.044365}},
    {title: 'Ile de Loisirs de Cergy-Pontoise', location: {lat: 49.029107, lng: 2.051360}},
    {title: 'Xtrem Aventures Cergy Park', location: {lat: 49.025927, lng: 2.050802}},
    {title: 'Hippopotamus', location: {lat: 49.031316, lng: 2.061402}},
    {title: 'Axe-Majeur Cergy-Pontoise', location: {lat: 49.042077, lng: 2.037841}},
    {title: 'Blue Green Company', location: {lat: 49.041578, lng: 2.030481}}
];

//默认显示所有标记
var newArr = [];
for(var i = 0; i< locations.length; i++){
    newArr.push("<li>"+locations[i].title+"</li>");
}



var locateListArr = newArr.join("");
var locateListUl = document.createElement("ul");
locateListUl.innerHTML = locateListArr;
leftSide.appendChild(locateListUl);



//
//搜索框和地点列表的显示
input.onkeyup = function () {
    var newArr = [];
    for(var i = 0; i<locations.length;i++){
        var val = this.value;
        if(locations[i].title.indexOf(val) === 0){
            newArr.push("<li>"+locations[i].title+"</li>")
        }
    }
    var str = newArr.join("");

    if(leftSide.children[2]){
        leftSide.removeChild(leftSide.children[2]);
    }

    //输入框为空时显示所有地点名称
    if(this.value.length === 0 || newArr.length ===0){
        leftSide.html = locateListUl;
    }

    var optionList = document.createElement("ul");
    optionList.innerHTML = str;
    leftSide.appendChild(optionList)
};




//获取当前



//google 地图API
var map;
var markers = [];
function initMap() {
    // Constructor creates a new map - only center and zoom are required.
    map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 49.033414, lng: 2.076360},
        zoom: 13
    });

    //marker标记


    var largeInfowindow = new google.maps.InfoWindow();
    var bounds = new google.maps.LatLngBounds();

    for (var i = 0; i < locations.length; i++) {
        // Get the position from the location array.
        var position = locations[i].location;
        var title = locations[i].title;
        // Create a marker per location, and put into markers array.
        var marker = new google.maps.Marker({
            map: map,
            position: position,
            title: title,
            animation: google.maps.Animation.DROP,
            id: i
        });
        // Push the marker to our array of markers.
        markers.push(marker);
        // Create an onclick event to open an infowindow at each marker.
        marker.addListener('click', function() {
            populateInfoWindow(this, largeInfowindow);
        });
        bounds.extend(markers[i].position);
    }
    // Extend the boundaries of the map for each marker
    map.fitBounds(bounds);
}

function populateInfoWindow(marker, infowindow) {
    // Check to make sure the infowindow is not already opened on this marker.
    if (infowindow.marker != marker) {
        infowindow.marker = marker;
        infowindow.setContent('<div>' + marker.title + '</div>');
        infowindow.open(map, marker);
        // Make sure the marker property is cleared if the infowindow is closed.
        infowindow.addListener('closeclick',function(){
            infowindow.setMarker = null;
        });
    }
}


//手机端点击出现左侧栏
var navImg = document.getElementById("nav-img");
var liftSide= document.getElementById("left-side");
var nav = document.getElementsByClassName("nav")[0];

navImg.addEventListener('click', function () {

    liftSide.className = "visible-phone lift-new-width";
    nav.className = "nav hidden-phone";
});

