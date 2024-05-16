sap.ui.define([
    "sap/ui/model/json/JSONModel",
    "sap/ui/Device"
], 
    function (JSONModel, Device) {
        "use strict";

    return {
        createDeviceModel: function () {
            var oModel = new JSONModel(Device);
            oModel.setDefaultBindingMode("OneWay");
            return oModel;
        },
        getFreightOrders: async function(){
            const oModel = new JSONModel();
            const sURI = sap.ui.require.toUrl("lab2dev/splitappmanipulation/model/mockdata.json")
            await oModel.loadData(sURI)

           return oModel.getData()
        },
        getUniqueFreightOrder: async function(sId){
            const oModel = new JSONModel();
            const sURI = sap.ui.require.toUrl("lab2dev/splitappmanipulation/model/mockdata.json")
            await oModel.loadData(sURI)

            const oData = oModel.getData()
            const oFreightOrder = oData.results.find(freightOrder => freightOrder.OfNumber === sId)

           return oFreightOrder
        },
        getUniqueSaleOrder: async function({freightOrderId, saleOrderId}){
            const oModel = new JSONModel();
            const sURI = sap.ui.require.toUrl("lab2dev/splitappmanipulation/model/mockdata.json")
            await oModel.loadData(sURI)

            const oData = oModel.getData()
            const oFreightOrder = oData.results.find(freightOrder => freightOrder.OfNumber === freightOrderId)

            const oSaleOrder = oFreightOrder.To_Ovs.find(saleOrder => saleOrder.OrdemVenda === saleOrderId)

           return oSaleOrder
        }
    };
});