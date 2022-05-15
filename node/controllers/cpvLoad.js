'use strict';
var Excel = require('exceljs');

function cpvLoad(CPVs) {

  var filename = "excel//cpv.xlsx";

  var workbook = new Excel.Workbook();
  try {
    workbook.xlsx.readFile(filename)
      .then(function(workbook) {
        var worksheet = workbook.getWorksheet();
        worksheet.eachRow({
          includeEmpty: true
        }, function(row, rowNumber) {
          if (rowNumber != 1 && row._cells[0] != null && row._cells[1] != null) {
            CPVs.create({
              cpv: row._cells[0]._value.model.value,
              identificador: row._cells[1]._value.model.value
            });
          }
        });
      });

  } catch (e) {
    console.log(e);
  }

}

module.exports = cpvLoad;
