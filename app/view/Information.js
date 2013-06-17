/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */

/**
 * Displays a list of informational links
 */

Ext.define('SmartIp.view.Information', {
    extend: 'Ext.List',
    xtype: 'information',
    id: 'informationList',

    config: {
        ui: 'round',
        store: 'Information',
        title: 'Informationen',
        cls: 'x-information',

        //limit: 5,

        disableSelection: true,
  
        itemTpl: [
           '<span>{title}</span>'
         ].join('')
    }
});