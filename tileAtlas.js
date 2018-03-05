(function(name,data){
 if(typeof onTileMapLoaded === 'undefined') {
  if(typeof TileMaps === 'undefined') TileMaps = {};
  TileMaps[name] = data;
 } else {
  onTileMapLoaded(name,data);
 }
 if(typeof module === 'object' && module && module.exports) {
  module.exports = data;
 }})("tileAtlas",
{ "height":10,
 "infinite":false,
 "layers":[
        {
         "data":[21, 21, 34, 23, 23, 35, 21, 21, 21, 21, 21, 21, 22, 21, 21, 22, 21, 21, 21, 21, 21, 34, 26, 23, 23, 32, 23, 23, 35, 21, 21, 22, 31, 21, 31, 22, 21, 21, 22, 21, 21, 36, 27, 23, 23, 33, 23, 23, 25, 21, 21, 21, 22, 21, 21, 22, 21, 21, 22, 21, 21, 34, 26, 35, 21, 22, 21, 21, 22, 31, 21, 22, 21, 36, 27, 26, 27, 23, 26, 35, 21, 22, 21, 21, 22, 31, 22, 21, 31, 22, 21, 36, 23, 23, 37, 21, 36, 23, 23, 37],
         "height":10,
         "name":"Tile Layer 1",
         "opacity":1,
         "type":"tilelayer",
         "visible":true,
         "width":10,
         "x":0,
         "y":0
        }],
 "nextobjectid":1,
 "orientation":"orthogonal",
 "renderorder":"right-down",
 "tiledversion":"1.1.2",
 "tileheight":64,
 "tilesets":[
        {
         "firstgid":1,
         "source":"..\/canvasGame\/terrainTiles_default.tsx"
        }],
 "tilewidth":64,
 "type":"map",
 "version":1,
 "width":10
});