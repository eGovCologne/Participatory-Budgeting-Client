/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot (Mark-a-Spot)
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */
Ext.define('SmartIp.view.input.Form', {
    extend: 'Ext.form.Panel',
    requires: [
        'Ext.MessageBox',
    ],
    id: 'inputForm',

    config: {
        items: [{
            id: 'markerFormToolbar',
            docked: 'top',
            xtype: 'toolbar',
            items: [{
                xtype: 'homeButton',
            }, {
                id:'locateButton',
                xtype: 'button',
                iconMask: true,
                iconCls: 'locate3',
            },{
                // ui: 'action',
                id: 'takePhoto',
                iconCls: 'photo1',
                iconMask: true,
                align: 'left'
            }, {
                flex: 1,
                xtype: 'component'
            }, {

                // Save User Action
                text: 'Save',
                xtype: 'button',
                id: 'submitForm',
                ui: 'confirm'
            }]
        }, {
            xtype: 'map',
            id: 'locateMeMap',
            useCurrentLocation: false,
            docked: 'top',
            height: '100px',
            mapOptions: {
                center : new google.maps.LatLng("50.94", "6.98"), 
                zoomControl: false,
                panControl: false,
                rotateControl: false,
                streetViewControl: false,
                mapTypeControl: false,
                zoom: 12
            }
        }, {

            // need to change that later, if name and id-attributes are useable again         
            xtype: 'textfield',
            id: 'geo-lat',
            name: 'field_geo[und][0][lat]',
            value: ''
        }, {

            // need to change that later, if name and id-attributes are useable again
            xtype: 'textfield',
            id: 'geo-lng',
            name: 'field_geo[und][0][lng]',
            value: ''
        }, {
            // need to change that later, if name and id-attributes are useable again
            xtype: 'textfield',
            id: 'fid',
            name: 'field_image[und][0][fid]',
            value: '1'
        }, {
            xtype: 'hiddenfield',
            name: 'type',
            value: 'proposal'
        }, {
            xtype: 'hiddenfield',
            name: 'language',
            value: 'und'
        }, { 
            xtype: 'fieldset',
            title: 'My Proposal',
            instructions: 'Please add a title',
            defaults: {
                //labelAlign: 'right',
                labelWidth: '30%'
            },
            items: [{
                xtype: 'textfield',
                name: 'title',
                required: true,
                id: 'markerSubject',
                label: 'Title',
                autoCapitalize: true,
                maxLength: 128,
                minLength: 2,
                //useClearIcon: true
            }, {
                xtype: 'textareafield',
                name: 'body[und][0][value]',
                preventScrollbars: false,
                overflow: 'auto',
                multiline: true,
                id: 'markerDescription',
                label: 'Text',
                //useClearIcon: true
            }],
        }, {
            xtype: 'fieldset',
            title: 'Category',
            defaults: {
                xtype: 'radiofield',
                labelWidth: '50%'

            },
            // items should be requested from category store in future versions
            items: [{
                name: 'field_category',
                label: 'Category A',
                checked: true,
                value: '1'
            }, {
                name: 'field_category',
                label: 'Category B',
                value: '2'
            }, {
                name: 'field_category',
                label: 'Category C',
                value: '3'
            }, {
                name: 'field_category',
                label: 'Category D',
                value: '4'
            }]

        }, {
            xtype: 'fieldset',
            title: 'Common proposal?',
            defaults: {
                //labelAlign: 'right',
                labelWidth: '50%'
            },
            items: [{
                xtype: 'checkboxfield',
                name: 'field_common_form',
                id: 'markerCommon',
                label: 'Non located'
            }],
        },{
            xtype: 'fieldset',
            id: 'locationFields',
            title: 'Address',
            defaults: {
                //labelAlign: 'right',
                labelWidth: '30%'
            },
            items: [{
                xtype: 'textfield',
                name: 'field_address[und][0][value]',
                id: 'markerStreet',
                value: SmartIp.util.Config.getAddress(),
                label: 'Street',
                disabled: true,
                useClearIcon: false
            }]
        }],

    },
    initialize: function() {
        if (Ext.os.is.iOS || Ext.os.is.Android ) {
        } else {
            // Ext.getCmp('takePhoto').disable();
            
            msg('','Camera Support is currently only provided via phonegap')
        }
    }
});