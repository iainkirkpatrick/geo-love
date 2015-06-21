#README

home of what is currently title geo-love: a demo for reactive geo-data editing

aka drawing of points, lines and polygons on a map and seeing them update on another connected browser window in (near) real-time

#PROGRESS

- leaflet draw plugin implemented, drawing layers to the common Mapbox FeatureLayer.
- but better (and better challenge) to convert all client-side layers to Leaflet layers, and store all server-side data as GEOJSON.

#NOTES

- need to have GEOJSON in the database, but probably should have proper leaflet Layers displaying on the map (otherwise it looks difficult to manage leaflet.draw layers). in which case i need to convert all the database GEOJSON to layers when the reactive method is invalidated. using a forEach on the meteor collection provides other benefits too (custom styling etc). use toGeoJSON method (inherited from layergroup) and geometryToLayer (from L.geoJson) for conversion.
- drawing circles with leaflet Draw disabled for now, as circles aren't part of the GEOJSON spec... might be able to figure out a nice solution later.
