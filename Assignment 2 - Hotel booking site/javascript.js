// Hotels

var hotels = [
{
  "name" : "The Grand",
  "starRtng" : 5,
  "cityDist" : 0.5,
  "pricePerNight" : 190,
  "includedWifi" : true,
  "includedPool" : false,
  "image" : "images/thegrand.png",
},
{
  "name" : "The Plaza",
  "starRtng" : 4,
  "cityDist" : 1,
  "pricePerNight" : 70,
  "includedWifi" : true,
  "includedPool" : true,
  "image" : "images/theplaza.png",
},
{
  "name" : "The Lord Milburn",
  "starRtng" : 4,
  "cityDist" : 5,
  "pricePerNight" : 65,
  "includedWifi" : true,
  "includedPool" : false,
  "image" : "images/thelordmilburn.png",
},
{
  "name" : "The Grange",
  "starRtng" : 3,
  "cityDist" : 1,
  "pricePerNight" : 57,
  "includedWifi" : true,
  "includedPool" : false,
  "image" : "images/thegrange.png",
},
{
  "name" : "The Windmill",
  "starRtng" : 1,
  "cityDist" : 10,
  "pricePerNight" : 5,
  "includedWifi" : false,
  "includedPool" : false,
  "image" : "images/thewindmill.png",
},
{
  "name" : "The Excel",
  "starRtng" : 3,
  "cityDist" : 0.5,
  "pricePerNight" : 56,
  "includedWifi" : true,
  "includedPool" : false,
  "image" : "images/theexcel.png",
},
{
  "name" : "The Victoria",
  "starRtng" : 4,
  "cityDist" : 0.5,
  "pricePerNight" : 80,
  "includedWifi" : true,
  "includedPool" : false,
  "image" : "images/thevictoria.png",
},
{
  "name" : "The Ritz",
  "starRtng" : 2,
  "cityDist" : 5,
  "pricePerNight" : 14,
  "includedWifi" : true,
  "includedPool" : false,
  "image" : "images/theritz.png",
},
{
  "name" : "Phoenix House",
  "starRtng" : 4,
  "cityDist" : 1,
  "pricePerNight" : 72,
  "includedWifi" : true,
  "includedPool" : false,
  "image" : "images/phoenixhouse.png",
},
{
  "name" : "The Lodge",
  "starRtng" : 2,
  "cityDist" : 1,
  "pricePerNight" : 25,
  "includedWifi" : false,
  "includedPool" : false,
  "image" : "images/thelodge.png",
},
{
  "name" : "The Sanctum",
  "starRtng" : 5,
  "cityDist" : 2,
  "pricePerNight" : 180,
  "includedWifi" : true,
  "includedPool" : true,
  "image" : "images/thesanctum.png",
}

]

// Functions

function criteriaGrab() {
  document.getElementById("hotelResults").innerHTML="";
  console.log(document.getElementById("hotelsForm").elements);
  var starRtng = document.querySelector('input[name="stars"]:checked').value;
  var cityDist = document.getElementById("hotelsForm").elements.item(7).value;
  var pricePerNight = document.getElementById("hotelsForm").elements.item(10).value;
  var includedWifi = document.getElementById("hotelsForm").elements.item(13).checked;
  var includedPool = document.getElementById("hotelsForm").elements.item(15).checked;
  compareHotels(starRtng, cityDist, pricePerNight, includedWifi, includedPool);
  outputHotels();
}

function compareHotels(starRtng, cityDist, pricePerNight, includedWifi, includedPool) {
  for (var i=0; i< hotels.length; i++) {
    compareStars(hotels[i], starRtng);
    compareDistance(hotels[i], cityDist);
    comparePrice(hotels[i], pricePerNight);
    compareWifi(hotels[i], includedWifi);
    comparePool(hotels[i], includedPool);
    calcTotalMatch(hotels[i]);
  }
}

function compareStars(hotel, input) {
  var starsDiff = Math.abs(hotel.starRtng - input);
  var starsMatch = 100 - (starsDiff * 20);
  hotel.starsMatch = starsMatch;
}

function compareDistance(hotel, input) {
  var distanceDiff = Math.abs(hotel.cityDist - input);
  var distanceMatch = 100 - (distanceDiff * 10);
  hotel.distanceMatch = distanceMatch;
}

function comparePrice(hotel, input) {
  var priceDiff = Math.abs(hotel.pricePerNight - input);
  var priceMatch = 100 - (priceDiff * 0.5);
  hotel.priceMatch = priceMatch;
}

function compareWifi(hotel, input) {
  if(hotel.includedWifi === input){
    var wifiMatch = 100
    hotel.wifiMatch = wifiMatch;
  }
  else{
    hotel.wifiMatch = 0;
  }
}

function comparePool(hotel, input) {
  if(hotel.includedPool === input){
    var poolMatch = 100
    hotel.poolMatch = poolMatch;
  }
  else{
    hotel.poolMatch = 0;
  }
}

function calcTotalMatch(hotel){
  var percentageMatch = (hotel.starsMatch + hotel.distanceMatch + hotel.priceMatch + hotel.wifiMatch + hotel.poolMatch) / 5;
  hotel.percentageMatch = percentageMatch;
}

function outputHotels(){
  var sortedHotels = hotels.sort(function (a, b) {
    return b.percentageMatch - a.percentageMatch;
  });
  for (var i = 0; i < sortedHotels.length; i++)
 {
      hotelListItem =
        "<div class='hotel_result_div'>" +
            "<h1>" + sortedHotels[i].name + " - " + sortedHotels[i].percentageMatch + "%" + "</h1>" +
            "<img class='hotel_image' src='" + sortedHotels[i].image + "'>" +
            "<p class='star_rating_p'>" + getStarRating(sortedHotels[i]) + "</p>" +
            "<p>" + "<b>" + sortedHotels[i].cityDist + getCityDist(sortedHotels[i]) + "</b>" + " from the city centre" + "</p>" +
            "<p>" + "<b>" + "£" + sortedHotels[i].pricePerNight + "</b>" + " per night" + "</p>" +
            "<p>" + "WiFi access " + "<b>" + getIncludedWifi(sortedHotels[i]) + "</b>" + "</p>" +
            "<p>" + "This hotel " + "<b>" + getIncludedPool(sortedHotels[i]) + "</b>" + "</p>" + "<br>" +
            "<hr>" +
        "</div>";
      document.getElementById("hotelResults").innerHTML += hotelListItem;
 }
}

function getStarRating(hotel) {
  if (hotel.starRtng == 1) {
    return "★";
  } else if (hotel.starRtng == 2) {
    return "★★";
  } else if (hotel.starRtng == 3) {
    return "★★★";
  } else if (hotel.starRtng == 4) {
    return "★★★★";
  } else if (hotel.starRtng == 5) {
    return "★★★★★";
  } else {
    return "Star rating not defined";
  }
}

function getCityDist(hotel) {
  if (hotel.cityDist == 1) {
    return " mile";
  } else {
    return " miles";
  }
}

function getIncludedWifi(hotel){
  if (hotel.includedWifi == true) {
    return " is included";
  } else {
    return " is not included";
  }
}

function getIncludedPool(hotel){
  if (hotel.includedPool == true) {
    return " has a pool";
  } else {
    return " does not have a pool";
  }
}
