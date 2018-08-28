var _ = require('lodash');

var TabConnectionManager = {};
var connectedTabs = {};

TabConnectionManager.addTab = function(tab, tabId){
	connectedTabs[tabId] = tab;
}

TabConnectionManager.getActiveTabs = function(){
	return connectedTabs;
};

TabConnectionManager.getTab = function(tabId){
    return connectedTabs[tabId];
}

TabConnectionManager.clearTabs = function(){	
	connectedTabs = {};
	return connectedTabs;
}

module.exports = TabConnectionManager;