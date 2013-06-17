/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */

Ext.define('SmartIp.model.Marker', {
    extend: 'Ext.data.Model',

    config: {

        //hasMany: 'Comment',
        //mapping: http://www.sencha.com/forum/archive/index.php/t-39245.html
        
        fields: [{
            name: 'id',
            type: 'string',
            mapping: 'node.nid'
        }, {
            name: 'title',
            type: 'string',
            mapping: 'node.title'
        }, {
            name: 'description', 
            mapping: 'node.description'
        }, {
            name: 'created', 
            type: 'string', 
            //dateFormat: 'Y-m-d H:i:s', 
            mapping: 'node.created'
        }, {
            name: 'common',
            type: 'int',
            mapping: 'node.common'
        }, {
            name: 'lat',
            type: 'string',
            mapping: 'node.positionLat'
        }, {
            name: 'lon',
            type: 'string',
            mapping: 'node.positionLng'
        }, {
            name: 'street',
            type: 'string',
            mapping: 'node.address'
        }, {
            name: 'zip',
            type: 'string',
            mapping: 'node.zip'
        }, {
            name: 'city',
            type: 'string',
            mapping: 'node.city'
        }, {
            name: 'user',
            type: 'string',
            mapping: 'node.userNickname'
        }, {
            name: 'imageThumb',
            type: 'string',
            mapping: 'node.imageThumb'
        },{
            name: 'imageLarge',
            type: 'string',
            mapping: 'node.imageLarge'
        }, {
            name: 'categoryTitle',
            type: 'string',
            mapping: 'node.categoryTitle'
        }, {
            name: 'categoryHex',
            type: 'string',
            mapping: 'node.categoryHex'
        }, {
            name: 'statusTitle',
            type: 'string',
            mapping: 'node.statusTitle'
        }, {
            name: 'statusHex',
            type: 'string',
            mapping: 'node.statusHex'
        }, {
            name: 'votesCount',
            type: 'string',
            mapping: 'node.votesCount'
        }, {
            name: 'resultCounts',
            type: 'string',
            mapping: 'node.resultCounts'
        }],
    }
});