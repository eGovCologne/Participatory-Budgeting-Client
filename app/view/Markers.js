/**
 * SmartIP App
 * @author      Holger Kreis / Mark-a-Spot
 * @copyright   (c) 2013 Cologne City Council
 * @license     GNU General Public License (GPL) Version 2
 */
/**
 * Displays a list of markers
 */
Ext.define('Fix.Ext.plugin.PullRefresh', {
    override: 'Ext.plugin.PullRefresh',
    /**
     * @private
     * Attempts to load the newest posts via the attached List's Store's Proxy
     */
    fetchLatest: function () {
        var store = this.getList().getStore(),
            proxy = store.getProxy(),
            operation;

        operation = Ext.create('Ext.data.Operation', {
            page: 0,
            start: 0,
            model: store.getModel(),
            limit: store.getPageSize(),
            action: 'read',
            filters: store.getRemoteFilter() ? store.getFilters() : []
        });

        proxy.read(operation, this.onLatestFetched, this);
    }
});

Ext.define('SmartIp.view.Markers', {
    extend: 'Ext.List',
    xtype: 'markers',
    id: 'markerList',

    config: {
        store: 'Markers',
        title: 'Proposals',
        cls: 'x-markers',

        disableSelection: true,
        plugins: [{
            xclass: 'Ext.plugin.ListPaging',
            autoPaging: true
        }, {
            xclass: 'Ext.plugin.PullRefresh'
        }],

        itemTpl: [
            '<div class="maslist" style="display:border: 0px solid black; background: #f2f2f2 url(resources/images/default.png) center center; <tpl if="imageThumb">  background: #f2f2f2 url({imageThumb})</tpl> 0% 50%"></div>',
            '{title}',
            '<span>{user}, {created} Uhr</span><span class="has-badge x-badge">{resultCounts}</span>'
        ].join('')
    }
});