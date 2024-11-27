import L from 'leaflet';

/**
 * Adds a WMS tile layer to a Leaflet map.
 *
 * @param {L.Map} map - The Leaflet map instance to which the WMS layer will be added.
 * @param {string} url - The URL of the WMS service.
 * @param {Object} [options] - Optional parameters for the WMS layer.
 * @param {string} [options.layers] - The layers to request from the WMS service.
 * @param {string} [options.format='image/png'] - The format of the image requested from the WMS service.
 * @param {boolean} [options.transparent=true] - Whether the WMS layer is transparent.
 * @param {Object} [options.params] - Additional parameters to include in the WMS request.
 */
const addTimeDimensionLayer = (map, url, options = {}) => {
  const defaultOptions = {
    layers: '',
    format: 'image/png',
    transparent: true,
    ...options.params,
};

console.log(options.timeIntervalStart)
  var timeDimensionControlOptions;
        var timeDimension = new L.TimeDimension({
         timeInterval: options.timeIntervalStart+'/'+options.timeIntervalEnd,
           period: options.period,
         });
         map.timeDimension = timeDimension; 
       
         timeDimensionControlOptions = {
         timeDimension: timeDimension,
         position:      'bottomleft',
         autoPlay:      false,
         minSpeed:      1,
         speedStep:     1,
         maxSpeed:      15,
         timeSliderDragUpdate: true
         };
         var timeDimensionControl = new L.Control.TimeDimension(timeDimensionControlOptions);
       
         map.addControl(timeDimensionControl);
         
         //Adding Layer
         var wmsLayer_Hs = L.tileLayer.wms(url, {
          layers: defaultOptions.layers,
          format: defaultOptions.format,
          transparent: defaultOptions.transparent,
          ...options,
      });
       var layer = new L.timeDimension.layer.wms(wmsLayer_Hs, {
         updateTimeDimension: true,
         name: "Wave Height",
         units: "m",
         enableNewMarkers: true,
       }).addTo(map);
       
    // Set default options
    /*const defaultOptions = {
        layers: '',
        format: 'image/png',
        transparent: true,
        ...options.params,
    };

    // Create the WMS tile layer
    const wmsLayer = L.tileLayer.wms(url, {
        layers: defaultOptions.layers,
        format: defaultOptions.format,
        transparent: defaultOptions.transparent,
        ...options,
    });
    */

    // Add the layer to the map
    layer.addTo(map);

    //reload broken tiles
    const RETRY_LIMIT = 3; // Maximum number of retry attempts
    const RETRY_DELAY = 3000; 

    const handleTileError = (event) => {
      console.log('Force reloading tiles.')
      const tile = event.tile;
      const currentSrc = tile.src;
      retryTile(tile, currentSrc, 1); // Start retrying with the first attempt
    };

    const retryTile = (tile, src, attempt) => {
      if (attempt <= RETRY_LIMIT) {
        setTimeout(() => {
          tile.src = ''; // Clear the src to trigger a retry
          tile.src = src; // Set the src again to reload the tile
          retryTile(tile, src, attempt + 1); // Schedule the next retry attempt
        }, RETRY_DELAY);
      }
    };

    layer.on('tileerror', handleTileError);
    
    return layer; // Return the layer instance if needed
};

export default addTimeDimensionLayer;