/**
 * SmartIP App
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */
Ext.define('SmartIp.controller.Form', {
    extend: 'Ext.app.Controller',

    config: {

        refs: {
            input: 'inputForm',
        },
        control: {
            '#takePhoto': {
                tap: 'onTakePhoto'
            },
            '#locateButton': {
                tap: function () {
                    // Get Map and pass it to localization function initialize()
                    // console.log(Ext.getCmp('locateMeMap').getMap());
                    map = Ext.getCmp('locateMeMap').getMap();
                    initialize(map);
                }
            },

            '#markerCommon': {
                check: function () {
                    //console.log("checked common");
                    Ext.getCmp('locationFields').hide({
                        type: 'slide',
                        direction: 'up'
                    });
                    inputForm.elements[0].value = SmartIp.util.Config.getIniLat();
                    inputForm.elements[1].value = SmartIp.util.Config.getIniLng();
                    inputForm.elements["field_address[und][0][value]"].value = 'Gülichplatz 1-3, 50667 Köln, Deutschland';

                },
                uncheck: function () {
                    Ext.getCmp('locationFields').show({
                        type: 'slide',
                        direction: 'down'
                    });
                    //inputForm.elements["field_geo[und][0][address][field]"].value = null;
                }
            },
            '#submitForm': {
                tap: 'onFormSub'
            }
        }
    },

    init: function () {
        this.control({
            'map': {
                maprender: 'onMapRender'
            }

        })
    },

    // Executing request to post proposal
    onFormSub: function () {

        params = Ext.getCmp('inputForm').getValues();
        params["field_category[und]"] = params.field_category;

        if (inputForm.elements["field_common_form"].checked == true) {
            // transform service params if content is not located
            params["field_common[und]"] = 1;

            params["field_geo[und][0][lat]"] = SmartIp.util.Config.getIniLat();
            params["field_geo[und][0][lng]"] = SmartIp.util.Config.getIniLng();

        } else {
            if (sessionStorage.getItem('address.lat') != SmartIp.util.Config.getIniLat()) {

                params["field_geo[und][0][lat]"] = sessionStorage.getItem('address.lat');
                params["field_geo[und][0][lng]"] = sessionStorage.getItem('address.lng');
                inputForm.elements[0].value = sessionStorage.getItem('address.lat');
                inputForm.elements[1].value = sessionStorage.getItem('address.lng');

            } else {

                params["field_geo[und][0][lat]"] = SmartIp.util.Config.getIniLat();
                params["field_geo[und][0][lng]"] = SmartIp.util.Config.getIniLng();
                inputForm.elements[0].value = SmartIp.util.Config.getIniLat();
                inputForm.elements[1].value = SmartIp.util.Config.getIniLng();
                params["field_common[und]"] = 1
            }
        }

        setButton('submitForm', true);

        Ext.Ajax.request({
            url: SmartIp.util.Config.getBaseurl() + '/rest/node.json',
            method: 'POST',
            headers: {
                'Cookie': localStorage.getItem('session_name') + '=' + localStorage.getItem('sessid'),
                'X-CSRF-Token': localStorage.getItem('token')
            },

            params: params,
            success: function (response, opts) {
                var response = Ext.decode(response.responseText);

                //Iterate through Drupal response Code
                Ext.iterate(response, function (item, message) {
                    // console.log(message);
                });
                msg('Erfolg!', 'Vorschlag mit der Nummer #' + response.nid + ' wurde gespeichert');
                setButton('submitForm', false);

                // empty form to avoid double postings
                inputForm.elements["field_image[und][0][fid]"].value = null;
                inputForm.elements["title"].value = null;
                inputForm.elements["body[und][0][value]"].value = null

                Ext.getStore('Markers').load({
                    page: 0
                });

            },
            failure: function (response, opts) {
                // console.log(response);
                // console.log(response.status);
                if (response.status == 401) {
                    Ext.Msg.alert('Achtung', 'Sie müssen sich zuerst einloggen');
                }
                if (response.status == 406) {
                    var errors = Ext.decode(response.responseText);
                    // console.log(errors);
                    Ext.iterate(errors.form_errors, function (error, message) {
                        Ext.Msg.alert('Sorry', message);
                    });
                }
                setButton('submitForm', false);

            }
        })

    },
    onMapRender: function (comp, map) {
        // Only localize if Form Map is loaded

        if (comp.id == "locateMe") {

            // setTimeout(function () {
            //     initialize(map);
            //     map.panTo(map.center);
            // }, 1000);

        } else {

            setTimeout(function () {
                var marker = new google.maps.Marker({
                    //position: map.center,
                    title: 'Sie sind hier',
                    map: map
                });
            }, 2000);
            map.panTo(map.center);
        }
    },
    onLocateMe: function () {
        //map = locateMeMap.getMap();
        //console.log(map);
        //initialize(map);
    },
    onTakePhoto: function () {

        if (!localStorage.getItem('session_name'))  {
            msg("Achtung", "Für das Einstellen von Fotos müssen sich sich erst registrieren, bzw. einloggen.");
            //Ext.getCmp('startScreen').animateTo('right','slide');
            //Ext.getCmp('viewport').setActiveItem('startScreen');
            return;
        }

        // base64-encoded string

        function onPhotoDataSuccess(imageData) {

            // Show Loading Modal
            Ext.Viewport.setMasked({
                xtype: 'loadmask',
                message: 'Upload'
            });

            randomNumber = Math.floor((Math.random() * 9999999999));
            Ext.Ajax.request({
                url: SmartIp.util.Config.getBaseurl() + '/rest/' + 'file.json',
                method: 'POST',
                headers: {
                    'X-CSRF-Token': localStorage.getItem('token')
                },

                params: {
                    "file": imageData,
                    "filename": "mobile_00" + randomNumber + ".jpg"
                },
                success: function (response) {
                    // get response
                    // console.log(response);
                    var options = Ext.decode(response.responseText);
                    // Open311 needs a media_url
                    getMediaUrl(options.fid);

                    // clear form after upload indicator
                    msg('', 'Das Foto wurde hochgeladen');
                    Ext.Viewport.setMasked(false);

                },
                failure: function (response) {
                    console.log(response);
                    console.log("fail");
                    msg('Achtung', 'Dieser Upload hat nicht funktioniert');
                    Ext.Viewport.setMasked(false);

                }
            });
        };

        function getMediaUrl(fid) {
            Ext.Ajax.request({
                url: SmartIp.util.Config.getBaseurl() + '/rest/' + 'file/' + fid + '.json',
                method: 'GET',
                headers: {
                    Cookie: localStorage.getItem('session_name') + '=' + localStorage.getItem('sessid')
                },
                success: function (xhr, params) {
                    // get response
                    var options = Ext.decode(xhr.responseText);
                    // requesteditorview.elements['media_url'].value = options.uri_full;
                    inputForm.elements['field_image[und][0][fid]'].value = options.fid;
                },
                failure: function (xhr, params) {
                    // console.log("fail");
                }
            });
        }

        // Problems receiving success callback (Error 500?)
        // http://drupal.org/node/1429086

        // During Development, if you want to develop against file-resource:      
        onPhotoDataSuccess("iVBORw0KGgoAAAANSUhEUgAAAAwAAAAMCAYAAABWdVznAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAARxJREFUeNpiZICBvt0KDIyM9QwMjAFAngBU9AMDw/8NDP//NzIUuT4ACTCChbu2GwAV7wdyBRiwgv8fgJocGco8LzAytG1WAIqcB2qAK94WoAemvTZcQtID1MTAYMjC8OdPPbJiqCSE/vMHWVQAKF4P1PA7AKiBAbuG3+jiASwMf/+ATd8WZQUX1xXjhTgtzBQu5rXsGNgWFri1//4hmcSAKQZVx8hQPPc9UjBCTI53gJi68AB6cH1gAurcANaNjEF+AGF0caBaJoa/fxuBnvsA9iAMwzX8RsYfQGohwZMx0QCoYD+605CdAgxJR4YZ+ReYwdwzO14wGLquBHpSgOHfXwUgzQH28L9/Hxj+/V8BNCySYVbhDZBSgAADAAtXkLEY0VGUAAAAAElFTkSuQmCC");

        var camReady = navigator.camera || undefined;
        if (camReady && localStorage.getItem('session_name')) {

            navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
                quality: 40,
                destinationType: Camera.DestinationType.DATA_URL
            });

            function onFail(message) {
                console.log('Failed because: ' + message);
            }
        } else {
            // console.log("No cam ready");
        }
    }

});