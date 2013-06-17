/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */


/**
 *  Map Logic goes here
 * 
 */


Ext.define('SmartIp.controller.Map', {
    extend: 'Ext.app.Controller',
    config: {
        control: {
            map: {
                maprender: 'onMapRender',
                bounds_changed: 'boundsChanged'  
            },            
            '#locateButtonMap': {
                tap: function () {
                    // Get Map and pass it to localization function initialize()
                    //console.log(Ext.getCmp('contentMap').getMap());
                    map = Ext.getCmp('contentMap').getMap();
                    initialize(map);
                }
            }
        }
    }, 

    onMapRender: function(comp, map){

        // Adding listeners to receive new markers from server
        // Only get markers from json if content map is shown
        var markersArray = [];

        if(comp.id == "contentMap") {
            google.maps.event.addListener(map, 'click', getMarkers);
            google.maps.event.addListener(map, 'zoom_changed', getMarkers);
            google.maps.event.addListener(map, 'dragend', getMarkers);
            // google.maps.event.addListener(map, 'center_changed', getMarkers);
        }

        function clearOverlays() {
          if (markersArray) {
            for (i in markersArray) {
              markersArray[i].setMap(null);
            }
          }
        }
        function getMarkers() {
            var params = {};
            params.field_geo_lat_1 = map.getBounds().getNorthEast().lat();
            params.field_geo_lat = map.getBounds().getSouthWest().lat();
            params.field_geo_lng_1 = map.getBounds().getNorthEast().lng();
            params.field_geo_lng = map.getBounds().getSouthWest().lng();

            setTimeout(function() {
                Ext.Ajax.request({
                    url: SmartIp.util.Config.getBaseurl() + '/proposals/app/map',
                    method: 'GET',
                    params: params,
                    success: function (response, opts) {
                        clearOverlays();
                        
                        var response = Ext.decode(response.responseText);
                        //console.log(response);

                        for (var i = 0, ln = response.nodes.length; i < ln; i++) {
                            
                            var markerStoreItem = response.nodes[i];
                           
                            if (markerStoreItem.node.positionLat != SmartIp.util.Config.getIniLat()) {
                                 addMarker(markerStoreItem);
                            }                            
                        }                  
                     
                    },
                    failure: function (response, opts) {
                        var response = Ext.decode(response.responseText);
                        // Iterate through Drupal 
                       
                        Ext.iterate(response.form_errors, function (error, message) {
                            msg('Fehler', message);
                        });
                    }
                });
            }, 500);
        };




        addMarker = function (markerStoreItem) {

            var icon = 'http://chart.apis.google.com/chart?cht=mm&chs=32x32&chco=ffffff,' + markerStoreItem.node.categoryHex + ',000000&ext=.png';

            var image = new google.maps.MarkerImage(icon,
            // This marker is 20 pixels wide by 32 pixels tall.
            new google.maps.Size(32, 32),
            // The origin for this image is 0,0.
            new google.maps.Point(0, 0),
            // The anchor for this image is the base of the flagpole at 0,32.
            new google.maps.Point(23, 33));
            markerStoreItem.node.address = markerStoreItem.node.address ? markerStoreItem.node.address : "";
            markerStoreItem.node.categoryTitle = markerStoreItem.node.categoryTitle ? markerStoreItem.node.categoryTitle : "";
            markerStoreItem.node.description = markerStoreItem.node.description ? markerStoreItem.node.description : "";
            var markerContent = '<div class="mapInfo"><h3>'+ markerStoreItem.node.title + '</h3><div class="maslist"><p><img src="'+ markerStoreItem.node.imageUrl +'" style="float:right"/>' + markerStoreItem.node.description  + '</p><p>' + markerStoreItem.node.address +  '</p><h6>Category</h6><p>' + markerStoreItem.node.categoryTitle + '</p></div>'
            var latLng = new google.maps.LatLng(markerStoreItem.node.positionLat, markerStoreItem.node.positionLng);
            var marker = new google.maps.Marker({
                map: map,
                position: latLng,
                icon: image,
                shadow: 'http://maps.gstatic.com/mapfiles/shadow50.png'
            });
            markersArray.push(marker);

            // markerInfoWindow = new google.maps.InfoWindow();

            google.maps.event.addListener(marker, "mousedown", function () {
                map.setZoom(16);
                map.panTo(latLng);

                if (!this.overlay) {
                    this.overlay = Ext.Viewport.add({
                        xtype: 'panel',
                        modal: true,
                        width: '60%',
                        height: '60%',
                        hideOnMaskTap: true,
                        centered: true,
                        styleHtmlContent: true,
                        html: markerContent,
                        items: [
                            {
                                docked: 'top',
                                xtype: 'toolbar',
                                title: markerStoreItem.node.title
                            }
                        ],
                        scrollable: true
                    });
                };
                this.overlay.show();
            });
        };
    }  
});



