sap.ui.define([
    "ssa/transshipmentreport/controller/BaseController",
    "ssa/transshipmentreport/utils/factories",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, factories, JSONModel) {
        "use strict";

        return Controller.extend("ssa.transshipmentreport.controller.Home", {
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
