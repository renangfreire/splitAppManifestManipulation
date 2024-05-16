sap.ui.define(
    [
        "sap/m/HBox",
    ], 
    function (
        HBox,
    ) {
        "use strict";

        const componentPatterns = {
            standard: {
                width: "fit-content",

                display: "flex",
                gap: ".5rem",
                "align-items": "center",
            
                padding: "0.3rem .5rem",
                "border-radius": ".5rem",
            },
            status: {
                pending: {
                    "background-color": "#fff494",
                    color: "#665c00"
                },
                pending: {
                    "background-color": "#ae4000",
                    color: "#ffdf72"
                },
                linked: {
                    "background-color": "#236c39",
                    color: "#bde986"
                },
                error: {
                    "background-color": "#890506",
                    color: "#ff8cb2"
                },
                sent: {
                    "background-color": "#0054cc",
                    color: "#a6e0ff"
                },
                finished: {
                    "background-color": "#45617c",
                    color: "#d5dadd"
                },
                deleted: {
                    "background-color": "#b40569",
                    color: "#fecbda"
                }
            }
        }

        function createCssClasses(selector, cssInline) {
            const styleSheets = [...document.styleSheets]
            
            const cssCustom = styleSheets.find(styles => {
                return styles.href?.includes("css/style.css")
            })

            cssCustom.insertRule(`${selector}{${cssInline}}`)
        }

        function initCssBadge(){
            const { standard, status } = componentPatterns

            createCssClasses(".customBadge", convertToInlineCSS(standard))

            Object.entries(status).forEach(([selectorKey, oCss]) => {
                const cssSelector = `.customBadge.${selectorKey},.customBadge.${selectorKey} > span`

                createCssClasses(cssSelector, convertToInlineCSS(oCss))
            })
        }

        function convertToInlineCSS(oProperties) {
            return Object.entries(oProperties).reduce((acc ,[cssKey, cssValue]) => {
                return acc += `${cssKey}:${cssValue};`
            }, "")
        }

        initCssBadge()

        const Badge = HBox.extend("ssa.tmfreightordercontrol.util.Badge", {
            metadata: {
                properties: {
                    badgeColor: {
                        type: "string",
                    },
                    badgeText: {
                        type: "string",
                    },
                    badgeIcon: {
                        type: "sap.ui.core.URI"
                    }
                }
            },

            renderer: function(oRm,oControl){
                const items = []

                oRm.write("<div");                

                oRm.addClass(`customBadge`)

                if(oControl.getBadgeColor()){
                    oRm.addClass(`${oControl.getBadgeColor()?.toLowerCase()}`)
                }
                
                oRm.writeClasses(oControl)

                oRm.writeControlData(oControl);
                oRm.write(">");

                const badgeIcon = oControl.getBadgeIcon()
                if(badgeIcon){
                    const oIcon = new sap.ui.core.Icon({
                        src: badgeIcon,
                        size: ".8rem"
                    })

                    items.push(oIcon)
                }

                const badgeText = oControl.getBadgeText()
                if(badgeText){
                    const oText = new sap.m.Text({
                        text: badgeText
                    })

                    items.push(oText)
                }
     

                items.forEach((item) => {
                    oRm.renderControl(item);
                });
     
                oRm.write("</div>")
            },
        
        })

        return Badge
});

