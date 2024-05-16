/* global QUnit */
QUnit.config.autostart = false;

sap.ui.getCore().attachInit(function () {
	"use strict";

	sap.ui.require([
		"lab2dev/splitappmanipulation/test/unit/AllTests"
	], function () {
		QUnit.start();
	});
});
