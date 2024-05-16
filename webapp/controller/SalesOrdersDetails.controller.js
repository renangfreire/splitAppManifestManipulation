sap.ui.define([
    "lab2dev/splitappmanipulation/controller/BaseController",
    "lab2dev/splitappmanipulation/utils/factories",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, factories, JSONModel) {
        "use strict";

        return Controller.extend("lab2dev.splitappmanipulation.controller.SalesOrdersDetails", {
            factories: factories,
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();

                this.oRouter.getRoute("SaleOrderDetail").attachPatternMatched(this._onRouteMatched, this)

            },
            _onRouteMatched: function (oEvent){
                const oView = this.getView()
                oView.setBusy(true);

                const { freightOrderId, saleOrderId } = oEvent.getParameter("arguments")

                this.setTransShipmentModel({freightOrderId, saleOrderId})
                
                oView.setBusy(false);
            },
            setTransShipmentModel: async function(oSearchObject){
                const oData = await this.models.getUniqueSaleOrder(oSearchObject)
                const oModel = new JSONModel(oData)

                this.setModel(oModel, "selectedSaleOrder")
            },
            navToSaleOrderDetails: function(oEvent){
                const oSource = oEvent.getSource()
                const oContext = oSource.getBindingContext()

                const sFreightOrderId = oContext.getProperty("OfNumber")
                this.navTo("FreightOrderDetail", {freightOrderId: sFreightOrderId})
            }
        });
});
 