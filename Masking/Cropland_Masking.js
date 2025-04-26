//Cropland Masking

// Step 1: Load your shapefile from Assets
var mehsana = ee.FeatureCollection("projects/ee-apoorvacse2/assets/mehsana_shapefile");
// Add the shapefile to the map
Map.centerObject(mehsana, 10);
Map.addLayer(mehsana, {color: 'blue'}, 'Mehsana District');
// Load MODIS Land Cover Data (MCD12Q1) for cropland masking
var landCover = ee.ImageCollection('MODIS/006/MCD12Q1')
                  .filterDate('2020-01-01', '2020-12-31')
                  .first()
                  .select('LC_Type1');
// Define a cropland mask (value 12 for cropland in MCD12Q1 dataset)
var croplandMask = landCover.eq(12);
// Mask cropland areas within Ahmedabad district
var croplandInMehsana = croplandMask.updateMask(croplandMask)
                                      .clip(mehsana);
// Add the cropland layer to the map
Map.addLayer(croplandInMehsana, {palette: ['green'], opacity: 0.7}, 'Cropland');
// Add a legend for clarity (optional)
print('Mehsana District with Cropland Areas Masked');



//Extracting coordinates of cropland region
//Load the Ahmedabad district shapefile
var mehsana = ee.FeatureCollection("projects/ee-apoorvacse2/assets/mehsana_shapefile");
// Load MODIS Land Cover Data (MCD12Q1) for cropland masking
var landCover = ee.ImageCollection('MODIS/006/MCD12Q1')
                  .filterDate('2020-01-01', '2020-12-31')
                  .first()
                  .select('LC_Type1');
// Define a cropland mask (value 12 for cropland in MCD12Q1 dataset)
var croplandMask = landCover.eq(12);
// Mask cropland areas within Ahmedabad district
var croplandInMehsana = croplandMask.updateMask(croplandMask)
                                      .clip(mehsana);
// Convert the cropland mask to a feature collection
var croplandVector = croplandInMehsana.reduceToVectors({
  geometryType: 'polygon',
  reducer: ee.Reducer.countEvery(),
  scale: 30, // Adjust scale based on your desired resolution
  maxPixels: 1e8,
  geometry: mehsana.geometry() // Define the geometry explicitly
});
// Print and display the coordinates
croplandVector = croplandVector.map(function(feature) {
  return feature.set({coordinates: feature.geometry().coordinates()});
});
// Fetch coordinates of the polygons
print('Coordinates of Cropland Regions:', croplandVector);
// Add layers to the map for visualization
Map.centerObject(mehsana, 10);
Map.addLayer(mehsana, {palette: ['blue'],opacity: 0.4}, 'Mehsana District');
Map.addLayer(croplandInMehsana, {palette: ['green'], opacity: 0.7}, 'Cropland Mask');
Map.addLayer(croplandVector, {color: 'red'}, 'Cropland Polygons');



// Saving cropland coordinates
// Load the Ahmedabad district shapefile
var mehsana = ee.FeatureCollection("projects/ee-apoorvacse2/assets/mehsana_shapefile");
// Load MODIS Land Cover Data (MCD12Q1) for cropland masking
var landCover = ee.ImageCollection('MODIS/006/MCD12Q1')
                  .filterDate('2020-01-01', '2020-12-31')
                  .first()
                  .select('LC_Type1');
// Define a cropland mask (value 12 for cropland in MCD12Q1 dataset)
var croplandMask = landCover.eq(12);
// Mask cropland areas within Ahmedabad district
var croplandInMehsana = croplandMask.updateMask(croplandMask)
                                      .clip(mehsana);
// Convert the cropland mask to a feature collection
var croplandVector = croplandInMehsana.reduceToVectors({
  geometryType: 'polygon',
  reducer: ee.Reducer.countEvery(),
  scale: 30, // Adjust scale based on your desired resolution
  maxPixels: 1e8,
  geometry: mehsana.geometry() // Define the geometry explicitly
});
// Print and display the coordinates
croplandVector = croplandVector.map(function(feature) {
  return feature.set({coordinates: feature.geometry().coordinates()});
});
print('Coordinates of Cropland Regions:', croplandVector);
// Add layers to the map for visualization
Map.centerObject(mehsana, 10);
Map.addLayer(mehsana, {palette: ['blue'], opacity: 0.4}, 'Mehsana District');
Map.addLayer(croplandInMehsana, {palette: ['green'], opacity: 0.7}, 'Cropland Mask');
Map.addLayer(croplandVector, {color: 'red'}, 'Cropland Polygons');
// Export the coordinates of the cropland regions as a GeoJSON file to GEE assets
Export.table.toAsset({
  collection: croplandVector,
  description: 'cropland_coordinates_mehsana',
  assetId: 'projects/ee-apoorvacse2/assets/cropland_coordinates_mehsana'
});


// Saving cropland shapefile
// Load the Ahmedabad district shapefile
var mehsana = ee.FeatureCollection("projects/ee-apoorvacse2/assets/mehsana_shapefile");
// Load MODIS Land Cover Data (MCD12Q1) for cropland masking
var landCover = ee.ImageCollection('MODIS/006/MCD12Q1')
                  .filterDate('2020-01-01', '2020-12-31')
                  .first()
                  .select('LC_Type1');
// Define a cropland mask (value 12 for cropland in MCD12Q1 dataset)
var croplandMask = landCover.eq(12);
// Mask cropland areas within Ahmedabad district
var croplandInMehsana = croplandMask.updateMask(croplandMask)
                                      .clip(mehsana);
// Convert the cropland mask to a feature collection (polygon)
var croplandVector = croplandInMehsana.reduceToVectors({
  geometryType: 'polygon',
  reducer: ee.Reducer.countEvery(),
  scale: 30, // Adjust scale based on your desired resolution
  maxPixels: 1e8,
  geometry: mehsana.geometry() // Define the geometry explicitly
});

// Export the cropland polygons as a shapefile to GEE assets
Export.table.toAsset({
  collection: croplandVector,
  description: 'cropland_shapefile_mehsana',
  assetId: 'projects/ee-apoorvacse2/assets/cropland_shapefile_mehsana'
});
