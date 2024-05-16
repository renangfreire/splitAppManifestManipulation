sap.ui.define([
    "sap/m/Column",
    "sap/m/Text"
], 
    function (Column, Text) {
        "use strict";

    return {
        createTableColumns: function(sTableId, oContext){
            const sTableIdFormatted = sTableId.split('-').at(-2)
            
            const oTable = this.byId(sTableIdFormatted)
            const oData = oContext.getProperty("")
            const oDataKeys = Object.keys(oData)

            oDataKeys.forEach((sKey) => {
                if(sKey.includes("Un")) return

                const oColumn = new Column({
                    header: new Text({
                        text: `{i18n>${sKey}}`
                    })
                })
            
                oTable.addColumn(oColumn)
            })
        },
        populateTable: function(oContext){
            debugger
        }
    };
});