if (Meteor.isClient) {
  //funcs
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  };

  //leaflet code

  // Provide your access token
  //L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';
  // Create a map in the div #map
  //L.mapbox.map('map', 'envintage.tm2-basemap');

  //var myLayer = L.geoJson().addTo(map);

  Template.main.onRendered(function(){
    L.mapbox.accessToken = 'pk.eyJ1IjoiZW52aW50YWdlIiwiYSI6Inh6U0p2bkEifQ.p6VrrwOc_w0Ij-iTj7Zz8A';
    var map = L.mapbox.map('map', 'envintage.i9eofp14');
  });

  Template.main.events({
    'click #removeFeatures': function() {
      console.log('future func to removeAllFeatures');
      // Meteor.call('removeAllFeatures');
    },
    'click #createPoint': function() {
      //-43.45 to -43.60
      //172.40 to 172.75
      // function getRandomArbitrary(min, max) {
      //   return Math.random() * (max - min) + min;
      // };

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

      myLayer.addData(geojson);
      //Meteor.call('geojsonhint', geojson);
    },
    'click #createLine': function() {
      //-43.45 to -43.60
      //172.40 to 172.75
      // function getRandomArbitrary(min, max) {
      //   return Math.random() * (max - min) + min;
      // };

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
      Meteor.call('geojsonhint', geojson);
    },
    'click #createPolygon': function() {
      //-43.45 to -43.60
      //172.40 to 172.75
      // function getRandomArbitrary(min, max) {
      //   return Math.random() * (max - min) + min;
      // };

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
      Meteor.call('geojsonhint', geojson);
    }
  });
};

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
