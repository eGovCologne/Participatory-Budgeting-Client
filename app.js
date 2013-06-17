/**
 * SmartIP App
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */
// Chainable
Ext.Loader.setPath({
    'Ext': 'sdk/src',
    'SmartIp': 'app'
});

Ext.require([
    'SmartIp.util.Config'
]);

// Defining the xtype homeButton

Ext.define('homeButton', {
    extend: 'Ext.Button',
    alias: 'widget.homeButton',
    config: {
        iconMask: 'true',
        iconCls: 'home',
        align: 'left',
        hidden: false
    }
});

Ext.define('homeMarkerButton', {
    extend: 'Ext.Button',
    alias: 'widget.homeMarkerButton',
    config: {
        iconMask: 'true',
        iconCls: 'home',
        align: 'left',
        hidden: false
    }
});

Ext.define('homeInfoButton', {
    extend: 'Ext.Button',
    alias: 'widget.homeInfoButton',
    config: {
        iconMask: 'true',
        iconCls: 'home',
        align: 'left',
        hidden: false
    }
});

// Function to show alert-messages
var msg = function msg(title, message) {
    Ext.Msg.alert(title, message);
}
var markersArray = [];

function setFields() {
    inputForm = (document.forms['inputForm']) ? document.forms['inputForm'] : null;
    if (!inputForm) return false;
    inputForm.elements["field_address[und][0][value]"].value = sessionStorage.getItem('address.string');
}

function initialize(map) {

    var geoReady = navigator.geolocation || undefined;
    if (geoReady) {
        var onSuccess = function (position) {
            clearOverlays();
            // console.log(position.coords);
            var myLocation = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
            addAddressToMap(position.coords.latitude, position.coords.longitude);
            addMarker(myLocation);
            markersArray.push(marker);

            // geolocation success, pan small map to marker

            map.panTo(myLocation);
            map.setZoom(14);

            function addMarker(location) {
                marker = new google.maps.Marker({
                    position: location,
                    map: map
                });
                markersArray.push(marker);
            }

            // Removes the overlays from the map, but keeps them in the array

            function clearOverlays() {
                if (markersArray) {
                    for (i in markersArray) {
                        markersArray[i].setMap(null);
                    }
                }
                markersArray.length = 0;

            }

        };

        function onError(error) {

        }
        navigator.geolocation.getCurrentPosition(onSuccess, onError);
    }

}

function addAddressToMap(lat, lng) {

    position = new google.maps.LatLng(lat, lng);
    sessionStorage.setItem('address.lat', lat);
    sessionStorage.setItem('address.lng', lng);
    geocoder = new google.maps.Geocoder();
    geocoder.geocode({
        'latLng': position
    }, function (results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (results[0]) {

                lat = results[0].geometry.location.lat;
                lng = results[0].geometry.location.lng;
                sessionStorage.setItem('address.string', results[0].formatted_address);

                setFields();

            } else {
                alert("Sie konnten nicht lokalisiert werden");
            }
        } else {
            alert("Sie konnten nicht lokalisiert werden: " + status);
        }
    });
};

Ext.application({
    name: 'SmartIp',
    models: ['Marker', 'Information'],
    views: ['Main'],
    stores: ['Menu', 'Markers'],
    controllers: ['Start', 'Map', 'Markers', 'Form', 'Login', 'Register'],
    icon: {
        57: 'resources/icons/Icon.png',
        72: 'resources/icons/Icon~ipad.png',
        114: 'resources/icons/Icon@2x.png',
        144: 'resources/icons/Icon~ipad@2x.png'
    },

    phoneStartupScreen: 'resources/loading/Homescreen.jpg',
    tabletStartupScreen: 'resources/loading/Homescreen~ipad.jpg',

    launch: function () {
        Ext.Ajax.request({
            url: SmartIp.util.Config.getBaseurl() + '/services/' + 'session/token',
            method: 'GET',
            success: function (response, opts) {
                Ext.iterate(response, function (item, credential) {
                    if (item == 'responseText') {
                        localStorage.setItem('token', credential);
                        console.log(localStorage.getItem('token'));
                    }
                });
            }
        });
        // Destroy the #appLoadingIndicator element
        Ext.fly('appLoadingIndicator').destroy();
        Ext.getStore('Markers').load({
            page: 0
        });

        // Initialize the main view
        Ext.Viewport.add(Ext.create('SmartIp.view.Main'));

        sessionStorage.setItem('address.lat', SmartIp.util.Config.getIniLat());
        sessionStorage.setItem('address.lng', SmartIp.util.Config.getIniLng());
    },

    onUpdated: function () {
        Ext.Msg.confirm(
            "App Update",
            "App has been updated. Reload?",
            function () {
                window.location.reload();
            }
        );
    }
});


function setButton(btn, status) {
    // console.log(btn);
    if (status) {
        Ext.getCmp(btn).addCls('x-button-pressed');
        Ext.getCmp(btn).setText('saving ...');
    } else {
        Ext.getCmp(btn).setText('Save');
        Ext.getCmp(btn).removeCls('x-button-pressed');
    }
}