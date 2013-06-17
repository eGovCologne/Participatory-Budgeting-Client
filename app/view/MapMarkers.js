/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */

/**
 * Displays a map of markers
 */


 Ext.define('SmartIp.view.MapMarkers', {
    extend: 'Ext.Map',
    xtype: 'mapMarkers',

    config: {
        useCurrentLocation: false,
        mapOptions : {
            center : new google.maps.LatLng(SmartIp.util.Config.getIniLat(), SmartIp.util.Config.getIniLng()),  //nearby San Fran
            zoom : 12,
            mapTypeId : google.maps.MapTypeId.ROADMAP,
            navigationControlOptions: {
            }
        },
    },
    items  : [{
        xtype   : 'map',
    }]
}); 
