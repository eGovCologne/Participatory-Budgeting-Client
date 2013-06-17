/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */

Ext.define('SmartIp.model.Information', {
    extend: 'Ext.data.Model',

    config: {
        //hasMany: 'Comment',
        //mapping: http://www.sencha.com/forum/archive/index.php/t-39245.html
        
        fields: [{
            name: 'Nid',
            type: 'string',
            mapping: 'node.nid'
        }, {
            name: 'title',
            type: 'string',
            mapping: 'node.title'
        }, {
            name: 'Body', 
            mapping: 'node.Body'
        }],
    }
});