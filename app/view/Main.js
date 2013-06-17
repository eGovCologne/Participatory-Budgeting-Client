/**
 * SmartIP App 
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */


Ext.define('SmartIp.view.Main', {
    extend: 'Ext.Container',
    requires: [
        'SmartIp.view.Start',
    ],
    
    // Define "viewport" for calling getCmp('viewport') later

    id: 'viewport',

    config: {
        layout: {
            type: 'card',
            animation: {
                duration: 300,
                easing: 'ease-in-out',
                type: 'slide',
                direction: 'left'
            }
        },
        fullscreen: true,

        items: [
            { xclass: 'SmartIp.view.Start' },
        ]
    }
});