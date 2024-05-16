sap.ui.define([
    "lab2dev/splitappmanipulation/controller/BaseController",
    "lab2dev/splitappmanipulation/utils/factories",
    "sap/ui/model/json/JSONModel",
    "sap/base/util/deepClone"
],
    function (Controller, factories, JSONModel, deepClone) {
        "use strict";

        return Controller.extend("lab2dev.splitappmanipulation.controller.Summarize", {
            factories: factories,
            defaultInitListVisibility: false,
            onInit: function () {
                this.oRouter = this.getOwnerComponent().getRouter();

                this.setTransShipmentModel()
            },
            setTransShipmentModel: async function(){
                const oData = await this.models.getFreightOrders()
                const oDataModified = this._addEnvironmentVariables(oData)
                
                const oModel = new JSONModel(oDataModified)

                this.setModel(oModel, "summarizeOrders")
            },
            _addEnvironmentVariables: function(oData){
                const { results } = oData
                const resultsClone = deepClone(results)

                const oFormattedData = resultsClone.map(( freightOrder) => {
                    freightOrder.isVisible = this.defaultInitListVisibility
                    freightOrder["To_Ovs"] = freightOrder["To_Ovs"].map((salesOrder) => {
                        salesOrder.isVisible = this.defaultInitListVisibility
                        return salesOrder
                    })

                    return freightOrder
                })

                return oFormattedData
            },
            handleVisibleList: function(oEvent){
                const oModel = this.getModel("summarizeOrders")

                const oSource = oEvent.getSource()
                const oContext = oSource.getBindingContext("summarizeOrders")
                const bCurrentVisibleState = oContext.getProperty("isVisible")
                const sPath = oContext.getPath()

                oModel.setProperty(`${sPath}/isVisible`, !bCurrentVisibleState)
            }
        });
});
