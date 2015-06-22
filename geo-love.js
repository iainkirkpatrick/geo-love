allGeoData = new Mongo.Collection("allGeoData");

if (Meteor.isClient) {
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  };

  Template.main.events({
    'click #removeFeatures': function() {
      Meteor.call('removeAllFeatures');
      console.log('all features removed');
    },
    'click #createPoint': function() {
      // var latlng = [getRandomArbitrary(-43.60, -43.45), getRandomArbitrary(172.40, 172.75)];
      var lonlat = [getRandomArbitrary(172.40, 172.75), getRandomArbitrary(-43.60, -43.45)];
      // console.log(latlng);

      //build and pass a dummy geojson object with the latlngs through
      var geojson = {
        "type": "Feature",
        "geometry": {
          "type": "Point",
          "coordinates": lonlat
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
      var lonlats = [];
      i = 0;
      while (i < 2) {
        var lonlat = [getRandomArbitrary(172.40, 172.75),getRandomArbitrary(-43.60, -43.45)];
        lonlats.push(lonlat);
        i++;
      }

      //build and pass a dummy geojson object with the lonlats through
      var geojson = {
        "type": "Feature",
        "geometry": {
          "type": "LineString",
          "coordinates": lonlats
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
      var lonlats = [];
      i = 0;
      while (i < 4) {
        var lonlat = [getRandomArbitrary(172.40, 172.75), getRandomArbitrary(-43.60, -43.45)];
        lonlats.push(lonlat);
        i++;
      }

      //build and pass a dummy geojson object with the lonlats through
      //note for a correct geojson poly, the last point must be same as first
      //but agafonkin suggests leaflet poly's SHOULDN'T do this... resolve somehow
      lonlats.push(lonlats[0]);

      var geojson = {
        "type": "Feature",
        "geometry": {
          "type": "Polygon",
          "coordinates": [ lonlats ]
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
    var map = L.mapbox.map('map', 'envintage.i9eofp14').setView([-41.28787, 174.77772], 6);

    var featureGroup = L.featureGroup().addTo(map);

    var drawControl = new L.Control.Draw({
      draw: {
        circle: false
      },
      edit: {
        featureGroup: featureGroup
      }
    }).addTo(map);

    map.on('draw:created', function(e) {
      // shouldn't need to actually add to featureGroup here, can just add to meteor collection
      var geojson = e.layer.toGeoJSON();
      allGeoData.insert(geojson);
      console.log(e.layerType + ' created!')
    });

    map.on('draw:edited', function (e) {
      var layers = e.layers;
      layers.eachLayer(function (layer) {
        //find the respective collection item, update it
        allGeoData.update({
          _id: layer._id,
        },
        layer.toGeoJSON());
      });
    });

    map.on('draw:deleted', function (e) {
      var layers = e.layers;
      layers.eachLayer(function (layer) {
        allGeoData.remove({
          _id: layer._id,
        });
      });
    });

    Tracker.autorun(function(){
      //efficiency gains to be made if i can only update diffs etc
      featureGroup.clearLayers();

      allGeoData.find().forEach(function(data){
        var feature = L.GeoJSON.geometryToLayer(data);
        //add auto-generated meteor collection ID to leaflet layer
        feature._id = data._id;
        featureGroup.addLayer(feature);
      });
    });
  });
}

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
    console.log("Server is running...")

    return Meteor.methods({
      //.remove on a collection can only be run server-side due to security
      removeAllFeatures: function(){
        return allGeoData.remove({});
      }
    })
  });
}
