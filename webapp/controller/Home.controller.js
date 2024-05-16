sap.ui.define([
    "lab2dev/splitappmanipulation/controller/BaseController",
    "lab2dev/splitappmanipulation/utils/factories",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, factories, JSONModel) {
        "use strict";

        return Controller.extend("lab2dev/splitappmanipulation.controller.Home", {
            factories: factories,
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();

                this.setTransShipmentModel()
            },
            setTransShipmentModel: async function(){
                const oData = await this.models.getMockData()
                const oModel = new JSONModel(oData)

                this.setModel(oModel)
            }
        });
});
