sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
],
    /**
     * @param {typeof sap.ui.core.mvc.Controller} Controller
     */
    function (Controller, JSONModel) {
        "use strict";

        return Controller.extend("revolucao.controller.Main", {
            onInit: function () {
                // Declaração de variáveis
                var ImageList = {
                    Images: [
                        {
                            title: "Google",
                            url: "https://www.google.com"
                        }, 
                        {
                            title: "Uol",
                            url: "http://www.uol.com.br" 
                        }, 
                        {
                            title: "G1",
                            url: "http://www.g1.com.br" 
                        }, 
                        {
                            title: "Terra",
                            url: "https://www.terra.com.br/" 
                        }
                    ]
                };

                // atribuição da variável ao modelo
                var ImageModel = new JSONModel(ImageList);

                // atribuição do modelo à tela
                this.getView().setModel(ImageModel, "ModeloImagem");
            },

            onPressBuscar: function () {
                //alert("Começou a revolução do SAP Fiori!!");
                var oInputBusca = this.byId("inpBusca");
                var sQuery      = oInputBusca.getValue();
                

                $.ajax({
                    //cabeçalho
                    url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/ImageSearchAPI",
                    method: "GET",
                    async: true,
                    crossDomain: true,
                    jsonCallback: "getJSON",
                    contentType: "application/json",
                    headers: {
                        "X-RapidAPI-Key": "f27e589d85msh27f7979c0042542p1eea83jsnc96f1512fb49",
		                "X-RapidAPI-Host": "contextualwebsearch-websearch-v1.p.rapidapi.com"
                    },

                    //corpo
                    data: {
                        "q": sQuery,
                        "pageNumber": 1,
                        "pageSize": 30,
                        "autoCorrect": true,
                        "safeSearch": true 
                    },

                    //retorno sucesso
                    success: function(data, textStatus){
                        var oImageModel = this.getView().getModel("ModeloImagem");
                        var oDadosImage = oImageModel.getData();

                        oDadosImage = {
                            Images: []
                        };

                        oImageModel.setData(oDadosImage);

                        var listaResultados = data.value;
                        var newItem;

                        debugger;

                        for(var i=0; i<listaResultados.length; i++){
                            newItem = listaResultados[i];
                            oDadosImage.Images.push(newItem);
                        }

                        oImageModel.refresh();


                    }.bind(this),

                    //retorno erro
                    error: function(){

                    }.bind(this)
                
                });//fim $.ajax({
            }
        });
    });
