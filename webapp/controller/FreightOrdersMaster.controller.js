sap.ui.define([
    "lab2dev/splitappmanipulation/controller/BaseController",
    "lab2dev/splitappmanipulation/utils/factories",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, factories, JSONModel) {
        "use strict";

        return Controller.extend("lab2dev.splitappmanipulation.controller.FreightOrdersMaster", {
            factories: factories,
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();

                this.setTransShipmentModel()
            },
            setTransShipmentModel: async function(){
                const oData = await this.models.getFreightOrders()
                const oModel = new JSONModel(oData)

                this.setModel(oModel)
            },
            navToOrderDetails: function(oEvent){
                const oSource = oEvent.getSource()
                const oContext = oSource.getBindingContext()

                const sFreightOrderId = oContext.getProperty("OfNumber")
                this.navTo("FreightOrderDetail", {freightOrderId: sFreightOrderId})
            }
        });
});
 