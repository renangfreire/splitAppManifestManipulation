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
        getMockData: async function(){
            const oModel = new JSONModel();
            const sURI = sap.ui.require.toUrl("ssa/transshipmentreport/model/mockdata.json")
            await oModel.loadData(sURI)

           return oModel.getData()
        }
    };
});