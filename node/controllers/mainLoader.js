'use strict';
var Excel = require('exceljs');


function mainLoader(Entidade, Contrato, ContratoEntidade, CPVs) {
  var filename = "excel//contratos_4.xlsx";

  // this sends back a JSON response which is a single string

  var workbook = new Excel.Workbook();
  workbook.xlsx.readFile(filename)
    .then(function(workbook) {
      var worksheet = workbook.getWorksheet();

      worksheet.eachRow({
        includeEmpty: true
      }, function(row, rowNumber) {
        if (rowNumber != 1) {
          loadContrato(row, Contrato, Entidade, ContratoEntidade, CPVs);
        }
      });
    });
}

function entidadeSplit(entidadeString) {
  var entidades = entidadeString.split(" | ");
  for (var i = 0; i < entidades.length; i++) {
    var entidadeAux = {
      nif: entidades[i].split("(")[1].replace(")", ""),
      nome: entidades[i].split("(")[0],
    };
    entidades[i] = entidadeAux;
  }
  return entidades;
}

function loadEntidade(entidadesString, idContrato, Entidade, ContratoEntidade) {

  var entidades = entidadeSplit(entidadesString);

  for (var i = 0; i < entidades.length; i++) {
    Entidade.findCreateFind({
      where: {
        nif: entidades[i].nif,
        nome: entidades[i].nome
      },
      attributes: ['id', ['nif', 'nome']]
    });

    ContratoEntidade.create({
      nif: entidades[i].nif,
      idContrato: idContrato
    });
  }
}

function loadContrato(row, Contrato, Entidade, ContratoEntidade, CPVs) {

  CPVs.findAll({
      where: {
        cpv: row._cells[4]._value.model.value
      }
    }).then(result => {

      var categoria = "";

      if(row._cells[1] == null && result[0] != null )
        categoria= result[0].dataValues.identificador;
      else
        categoria = row._cells[1]._value.model.value;

      Contrato.create({
        tipoContrato: row._cells[3]._value.model.value,
        tipoProcedimento: row._cells[2]._value.model.value,
        objectoContrato: row._cells[0]._value.model.value,
        adjudicante: row._cells[5]._value.model.value,
        adjudicatario: row._cells[6]._value.model.value,
        dataPublicacao: fixDate(row._cells[8]._value.model.value),
        dataCelebracaoContrato: fixDate(row._cells[9]._value.model.value),
        precoContratual: fixPrice(row._cells[7]),
        precoEfectivo: fixPrice(row._cells[15]),
        cpv: row._cells[4]._value.model.value,
        prazoExecucao: row._cells[10]._value.model.value,
        localExecucao: row._cells[11]._value.model.value,
        ficheiros: checkNull(row._cells[21]),
        categoria: categoria
      }).then((x) => {

        loadEntidade(row._cells[6]._value.model.value, x.dataValues.id, Entidade, ContratoEntidade);

      });

    })

  }


  function fixDate(date) {
    date = date.trim().split('-');
    return date[2] + "-" + date[1] + "-" + date[0];
  }

  function fixPrice(price) {
    if (price != null) {
      price = price._value.model.value.split(" ");
      var finalPrice = price[0].split('.').join('')
      finalPrice = finalPrice.replace(",", ".");
      return finalPrice;

    } else {
      return null;
    }
  }

  function checkNull(valor) {
    if (valor != null) {
      return valor._value.model.value;
    } else {
      return null;
    }
  }
  function replaceAll(str, find, replace) {
    return str.replace(new RegExp(find, 'g'), replace);
  }

  module.exports = mainLoader;
