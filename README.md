#README

home of what is currently title geo-love: a demo for reactive geo-data editing

aka drawing of points, lines and polygons on a map and seeing them update on another connected browser window in (near) real-time


#NOTES

- need to have GEOJSON in the database, but probably should have proper leaflet Layers displaying on the map (otherwise it looks difficult to manage leaflet.draw layers). in which case i need to convert all the database GEOJSON to layers when the reactive method is invalidated. using a forEach on the meteor collection provides other benefits too (custom styling etc). use toGeoJSON method (inherited from layergroup) and geometryToLayer (from L.geoJson) for conversion.