sap.ui.define([
    "lab2dev/splitappmanipulation/controller/BaseController",
    "lab2dev/splitappmanipulation/utils/factories",
    "sap/ui/model/json/JSONModel",
],
    function (Controller, factories, JSONModel) {
        "use strict";

        return Controller.extend("lab2dev.splitappmanipulation.controller.FreightOrdersDetails", {
            factories: factories,
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();

                this.oRouter.getRoute("FreightOrderDetail").attachPatternMatched(this._onRouteMatched, this)

            },
            _onRouteMatched: function (oEvent){
                const oView = this.getView()
                oView.setBusy(true);

                const { freightOrderId } = oEvent.getParameter("arguments")

                this.selectedFreightOrder = freightOrderId

                this.setTransShipmentModel(freightOrderId)
                
                oView.setBusy(false);
            },
            setTransShipmentModel: async function(freightOrderId){
                const oData = await this.models.getUniqueFreightOrder(freightOrderId)
                const oModel = new JSONModel(oData)

                this.setModel(oModel, "selectedFreightOrder")
            },
            navToSaleOrderDetails: function(oEvent){
                const oRow = oEvent.getParameter("row")
                const oContext = oRow.getBindingContext("selectedFreightOrder")

                const sSaleOrder = oContext.getProperty("OrdemVenda")
                this.navTo("SaleOrderDetail", {
                    saleOrderId: sSaleOrder,
                    freightOrderId:  this.selectedFreightOrder
                })
            }
        });
});
 