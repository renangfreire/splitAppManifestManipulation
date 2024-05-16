sap.ui.define([
    
], 
    function () {
        "use strict";

        return {
            formatWeight: function(sValue){
                return Number(sValue).toLocaleString();
            },
            formatObjectListStatus: function(sStatus){
                switch(sStatus){
                    case "LINKED": {
                        return "Success"
                    }
                    case "PENDING": {
                        return "Warning"
                    }
                }
            },
            formatDate: function(sDate){
                if(!sDate){
                    return
                }
                
                return new Date(Number(sDate)).toLocaleDateString();
            }
        }
});