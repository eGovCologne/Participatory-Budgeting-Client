/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */


Ext.define('SmartIp.view.marker.Show', {
    extend: 'Ext.Container',
    xtype: 'marker-show',

    config: {
        baseCls: 'x-show-marker',
        layout: 'vbox',

        items: [
            {
                id: 'contentMarker',
                xtype: 'panel',
                flex: 1,
                scrollable: true,
                tpl: [
                '<div class="top">',
                    '<div class="maslist" style="display:border: 0px solid black; background: #f2f2f2 url(resources/images/default.png) center center; <tpl if="imageThumb">  background: #f2f2f2 url({imageThumb})</tpl> 0% 50%"></div>',
                    '<div class="meta">{title} <span>{user}</span> <tpl if="common"><span style="color:red"><strong>Nicht verorteter Vorschlag</strong></span></tpl></div>',
                    '<div class="report">',
                    '<p>{description}</p> <div class="mas_detail x-list-normal"><div class="x-list-header">Ort</div><p><tpl if="street">{street}<br/></tpl></p><div class="x-list-header">Thema</div><p>{categoryTitle}</p>',

                    //'<tpl if="status"><div class="x-list-header">Status</div><span style="color:#{statusHex}"><p><strong>{statusTitle}</strong></p></span></tpl>',
                    '<tpl if="resultCounts"><div class="x-list-header">Stimmen</div><p>{resultCounts}</p></tpl>',
                    '<tpl if="imageLarge"><div class="x-list-header">Foto</div><img style="width:100%" src="{imageLarge}" /></tpl>',
                    '</div>',    
                '</div>'
            
                ].join(''),
            },
            {
                xtype: 'map',
                id: 'markerMap',
                flex: 2,
                docked: 'bottom',
                height: '100px',
                mapOptions: {
                    zoomControl: false,
                    panControl: false,
                    rotateControl: false,
                    streetViewControl: false,
                    mapTypeControl: false,
                    zoom: 17
                }
            }
        ],

        record: null
    },

    updateRecord: function(newRecord) {
        if (newRecord) {
            this.down('#contentMarker').setData(newRecord.data);

            this.down('map').setMapCenter({
                latitude: newRecord.data.lat,
                longitude: newRecord.data.lon
            });
        }
    }
});
