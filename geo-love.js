allGeoData = new Mongo.Collection("allGeoData");

if (Meteor.isClient) {
  //client global vars (probably not a great idea, but testing atm)
  // var map;
  // var geoJsonLayer;

  //testing loading external JS libs
  //MapboxJS
  // $.getScript('https://api.tiles.mapbox.com/mapbox.js/v2.1.8/mapbox.js', function(data, textStatus, jqxhr) {
  //   console.log(data);
  //   console.log(textStatus);
  //   mapboxSetup();
  // });

  //funcs
  //probably not ideal for future to have all mapbox-related js code in funcs that run onload of mapbox.js...
  //possibly better to chuck this into Template.myTemplate.onRendered() ?
  //as this func is meant for DOM manipulation that persists across re-renderings, and only occurs once on init
  // function mapboxSetup() {
  //   L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';
  //   map = L.mapbox.map('map', 'envintage.i9eofp14').setView([-41.28787, 174.77772], 6);

  //   //.featureLayer.setGeoJSON(allGeoData.findOne());

  //   // geojsonLayer = L.geoJson.addTo(map);
  //   // data = allGeoData.find().fetch(); //array
  //   // //console.log(data.length);
  //   // for (var i = 0; i < data.length; i++) {
  //   //   console.log(data[i]);
  //   //   L.mapbox.featureLayer(data[i]).addTo(map);
  //   // }

  // };

  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  };

  Template.main.events({
    'click #removeFeatures': function() {
      Meteor.call('removeAllFeatures');
      console.log('all features removed');
    },
    'click #createPoint': function() {
      var latlng = [getRandomArbitrary(-43.60, -43.45), getRandomArbitrary(172.40, 172.75)];
      // console.log(latlng);

      //build and pass a dummy geojson object with the latlngs through
      var geojson = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": latlng
        },
        "properties": {
          "createdWhere": "clientscript"
          }
        };
      //Meteor.call('geojsonhint', geojson);
      allGeoData.insert(geojson);
      console.log('point created!')
    },
    'click #createLine': function() {
      var latlngs = [];
      i = 0;
      while (i < 2) {
        var latlng = [getRandomArbitrary(-43.60, -43.45), getRandomArbitrary(172.40, 172.75)];
        latlngs.push(latlng);
        i++;
      }

      //build and pass a dummy geojson object with the latlngs through
      var geojson = {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": latlngs
          },
        "properties": {
          "createdWhere": "clientscript"
          }
        };
      //Meteor.call('geojsonhint', geojson);
      allGeoData.insert(geojson);
      console.log('lineString created!')
    },
    'click #createPolygon': function() {
      var latlngs = [];
      i = 0;
      while (i < 4) {
        var latlng = [getRandomArbitrary(-43.60, -43.45), getRandomArbitrary(172.40, 172.75)];
        latlngs.push(latlng);
        i++;
      }

      //build and pass a dummy geojson object with the latlngs through
      //note for a correct geojson poly, the last point must be same as first
      //but agafonkin suggests leaflet poly's SHOULDN'T do this... resolve somehow
      latlngs.push(latlngs[0]);

      var geojson = {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [ latlngs ]
          },
        "properties": {
          "createdWhere": "clientscript"
          }
        };
      //Meteor.call('geojsonhint', geojson);
      allGeoData.insert(geojson);
      console.log('polygon created!')
    }
  });

  Template.map.onRendered(function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';
    map = L.mapbox.map('map', 'envintage.i9eofp14').setView([-41.28787, 174.77772], 6);
    // console.log(this); // could i use 'this' somehow for better code?
    // L.mapbox.featureLayer(function(){
    //   return allGeoData.find().fetch();
    // }).addTo(map);
  });

  Template.map.helpers({
    'data': function() {
      return allGeoData.find().fetch();
    }
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("Server is running...")

    return Meteor.methods({
      removeAllFeatures: function(){
        return allGeoData.remove({});
      }
    })

    //server collections
  });
}
