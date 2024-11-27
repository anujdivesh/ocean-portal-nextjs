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
const addWMSTileLayer = (map, url, options = {}) => {
    // Set default options
    const defaultOptions = {
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

    // Add the layer to the map
    wmsLayer.addTo(map);

    //reload broken tiles
    const RETRY_LIMIT = 3; // Maximum number of retry attempts
    const RETRY_DELAY = 3000; 

    const handleTileError = (event) => {
        const tile = event.tile;
        checkUrlExists(tile.src)
            .then(exists => {
                if (exists) {
                    retryTile(tile, tile.src, 1); // Start retrying
                }
            })
            .catch(err => {
                console.error('Error checking tile URL:');
            });
    };

    const checkUrlExists = (url) => {
        return new Promise((resolve) => {
            const xhr = new XMLHttpRequest();
            xhr.open('HEAD', url, true);
            xhr.onreadystatechange = () => {
                if (xhr.readyState === 4) {
                    resolve(xhr.status >= 200 && xhr.status < 300);
                }
            };
            xhr.send();
        });
    };

    const retryTile = (tile, src, attempt) => {
        if (attempt <= RETRY_LIMIT) {
            setTimeout(() => {
                tile.src = ''; // Clear src to trigger a reload
                tile.src = src; // Reset src to reload the tile
                retryTile(tile, src, attempt + 1); // Schedule next retry
            }, RETRY_DELAY);
        } 
    };

    wmsLayer.on('tileerror', handleTileError);

    return wmsLayer; // Return the layer instance
};

    /*
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

    wmsLayer.on('tileerror', handleTileError);
    
    return wmsLayer; // Return the layer instance if needed
};
*/

export default addWMSTileLayer;