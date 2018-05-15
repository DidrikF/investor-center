<template>
  <div class="FS">
	  <h1>hottable</h1>
	  <HotTable :root="root" :settings="settings" :cellMeta="cellMeta" :data="sheetData" :colorPalet="colorPalet" ref="financial-statement"></HotTable><!--getSpreadSheetByID(spreadSheetID) -->
  </div>
</template>

<script>

// import HotTable from '../../../vue-assets/handsontable-component/HotTable.vue'
import HotTable from '../../../vue-assets/handsontable-component/HotTable.vue';// 'vue-handsontable-official'

import { mapGetters, mapActions, mapMutations } from 'vuex';

export default {
	data() {
		return {
			root: 'id-of-root-element',

			context: {
				type: 'Balance Sheet',
				header: '',
			},

			settings: {
				licenseKey: "trial",
				allowInsertRow: false,
				allowRemoveRow: false,
				autoColumnSize: true,
				autoRowSize: true, 
				// bindRowsWithHeaders: true, 
				copyPaste: true,
				undo: true,
				colHeaders: true,
				rowHeaders: true,  
				currentRowClassName: "Bs--current-row",
				currentColClassName: "Bs--current-col",
				currentHeaderClassName: "Bs--current-head",
				commentedCellClassName: "Bs--commented-cell",
				invalidCellClassName: "Bs--invalid-cell",
				noWordWrapClassName: "htNoWrap",
				placeholderCellClassName: "Bs--placeholder",
				readOnlyCellClassName: "Bs--readOnly",
				tableClassName: "Bs",
				comments: true, 
				contextMenu: true, 
				manualColumnResize: true,
				tabMoves: {row: 1, col: 0},
				afterSelection: (row,col) => {
					if (col !== 0) {
						return
					}
					const header = this.sheetData[row][col];
					this.context.header = header
					this.$emit('contextUpdate', this.context)
				}
			},
			sheetData: [
				["", "2014", "2015", "2016"],
				["> Current assets", 10, 11, 12],
				["Cash and cash equivalents", 20, 11, 14],
				["Short-term marketable securities", 30, 15, 12],
				["Accounts receivable", 30, 15, 12],
				["Inventories", 30, 15, 12],
				["Vendor non-trade receivables", 30, 15, 12],
				["Other current assets", 30, 15, 12],
				["-Total current assets", 30, 15, 12],
				["> Current liabilities", 30, 15, 12],
				["Deferred revenue", 30, 15, 12],
				["Accrued expenses", 30, 15, 12],
				["Commercial paper", 30, 15, 12],
				["Current portion of long-term debt", 30, 15, 12],
				["-Total current liabilities", 30, 15, 12],
			],
			cellMeta: [
				[{type: 'main header', headerColumn: true}, {type: 'main header'}, {type: 'main header'}, {type: 'main header'}],
				[{type: 'section header', colorPalet: 'blue', headerColumn: true}, {type: 'section header', colorPalet: 'blue'}, {type: 'section header', colorPalet: 'blue'}, {type: 'section header', colorPalet: 'blue'}],
				[{type: '1stIndent', colorPalet: 'blue', headerColumn: true}, {}, {}, {}],
				[{type: '2ndIndent', colorPalet: 'blue', headerColumn: true}, {}, {}, {}],
				[{colorPalet: 'blue', headerColumn: true}, {}, {}, {}],
				[{colorPalet: 'blue', headerColumn: true}, {}, {}, {}],
				[{colorPalet: 'blue', headerColumn: true}, {}, {}, {}],
				[{colorPalet: 'blue', headerColumn: true}, {}, {}, {}],
				[{type: 'baseline', colorPalet: 'blue', headerColumn: true}, {type: 'baseline', colorPalet: 'blue'}, {type: 'baseline', colorPalet: 'blue'}, {type: 'baseline', colorPalet: 'blue'}],
				[{type: 'section header', colorPalet: 'green', headerColumn: true}, {type: 'section header', colorPalet: 'green'}, {type: 'section header', colorPalet: 'green'}, {type: 'section header', colorPalet: 'green'}],
				[{colorPalet: 'green', headerColumn: true}, {}, {}, {}],
				[{colorPalet: 'green', headerColumn: true}, {}, {}, {}],
				[{colorPalet: 'green', headerColumn: true}, {}, {}, {}],
				[{colorPalet: 'green', headerColumn: true}, {}, {}, {}],
				[{type: 'baseline', colorPalet: 'green', headerColumn: true}, {type: 'baseline', colorPalet: 'green'}, {type: 'baseline', colorPalet: 'green'}, {type: 'baseline', colorPalet: 'green'}],
			], 
			colorPalet: {
				blue: {light: 'sectionLightBlue', dark: 'sectionDarkBlue'},
				green: {light: 'sectionLightGreen', dark: 'sectionDarkGreen'}
			},
		}
	},
	props: ['id'],
	components: {
		HotTable,
	}
}


/*

Things to put into HotTable:

function createSection(ht, cellMeta, colorPalet, r) {
  var val = document.getElementById('didrikInput').value
  var row = parseInt(val)
  if (isNaN(row)) {
	console.log("Input not an integer")
	return
  }
  var firstBaseline = row
  var headerColumns  = [] //can be many columns that are headers
  var sectionSize = 3
  var nrCols = ht.countCols()
  var nrRows = ht.countRows()
  for (var i = row; i < nrRows; i++) {
	var meta = cellMeta[i][0]
	if (meta && meta.type === 'baseline') {
	  firstBaseline = i+1
	}
  }
  //which column is header -> inherit from above, if none -> first column is header
  for (var col = 0; col < nrCols; col++) {
	var meta = cellMeta[firstBaseline-1][col]
	if (meta && meta.headerColumn) {
	  headerColumns.push(col)
	}
  }
  if (!headerColumns.length) headerColumn.push(0)
  
  //create new rows
  addCleanRows(ht, cellMeta, firstBaseline, sectionSize)
  
  var firstRowInSection = firstBaseline
  var lastRowInSection = firstBaseline + sectionSize - 1
  //create new cellMeta objects
  for (var row = firstRowInSection; row <= lastRowInSection; row++) {
	for (var col = 0; col < nrCols; col++) {
	  //var meta = cellMeta[row][col]
	  console.log("before: ", cellMeta[row][col])
	  if (row === firstRowInSection) {
		cellMeta[row][col] ? cellMeta[row][col].type = 'section header' : cellMeta[row][col] = {type: 'section header'}
		cellMeta[row][col].colorPalet = colorPalet
	  }
	  if (headerColumns.includes(col)) {
		cellMeta[row][col] ? cellMeta[row][col].headerColumn = true : cellMeta[row][col] = {headerColumn: true}
		cellMeta[row][col].colorPalet = colorPalet
	  }
	  if (row === lastRowInSection) {
		console.log('baseline row', row)
		cellMeta[row][col] ? cellMeta[row][col].type = 'baseline' : cellMeta[row][col] = {type: 'baseline'}
		cellMeta[row][col].colorPalet = colorPalet
	  }
	  console.log("after: ", cellMeta[row][col])
	}
  }
  console.log(cellMeta)
  preRender(ht, cellMeta)
  ht.render()
}

document.getElementById('createSection').addEventListener('click', function () {
  createSection(hot, cellMeta, 'blue')
})

function addCleanRows (ht, metaCells, startRow, nr) {
  for (var i = 0; i < nr; i++) {
	ht.alter('insert_row', startRow+i) 
	metaCells.splice(startRow+i, 0, [])
  }
  
  var nrCols = ht.countCols()
  var lastRow = startRow + nr
  for (var row = startRow; row < lastRow; row++) {
	for (var i = 0; i < nrCols; i++) {
	  metaCells[row].push(null)
	}
  }
 
  console.log('added rows', cellMeta)
  //[null, null, null, null]
}

function addRow(ht, cellMeta, r) {
  var val = document.getElementById('didrikInput').value
  var row = parseInt(val)
  if (isNaN(row)) {
	console.log("Input not an integer")
	return
  }
  ht.alter('insert_row', row)
  cellMeta.splice(row, 0, [])
  var nrCols = ht.countCols()
  for (var col = 0; col < nrCols; col++) {
	var aboveMeta = cellMeta[row-1][col]
	if (aboveMeta && aboveMeta.headerColumn) {
	  cellMeta[row][col] = {headerColumn: true}
	  continue
	}
	cellMeta[row][col] = null
  }
  console.log('added row', cellMeta)
  preRender(ht, cellMeta)
  ht.render()
}

document.getElementById('addRow').addEventListener('click', function () {
  addRow(hot, cellMeta)
})

function addColumn(ht, cellMeta, col) {
  var val = document.getElementById('didrikInput').value
  var row = parseInt(val)
  if (isNaN(row)) {
	console.log("Input not an integer")
	return
  }
  //inherits from the left
  ht.alter('insert_col', col)
  var nrRows = ht.countRows()
  var nrCols = ht.countCols()
  var insignificantRowNr = 0
  var columnToCopyFrom = -1
  for (var col = 0; col < nrCols; col++) {
	var meta = cellMeta[insignificantRowNr][col]
	if (meta && !meta.headerColumn) {
	  columnToCopyFrom = col
	}
  }  
  for (var row = 0; row < nrRows; row++) {
	var metaToCopyFrom = (columnToCopyFrom > -1) ? cellMeta[row][columnToCopyFrom] : null
	if (metaToCopyFrom !== null) {
	  cellMeta[row].splice(col, 0, JSON.parse(JSON.stringify(metaToCopyFrom)))
	} else {
	  cellMeta[row].splice(col, 0, null)
	}
  }
  console.log(cellMeta)
  preRender(ht, cellMeta)
  ht.render()
}
document.getElementById('addColumn').addEventListener('click', function () {
  addColumn(hot, cellMeta)
})

function makeIntoBaseline(ht, row) {
  
}
function createNewHeaderCol(ht, col) {
  
}

//Table Logic
function justify(ht, arg) {
  
}
function setDenomination(ht, denomination) {
  
} 
function setCurrency (ht, currencySymbol) {
  
}
//tab in header column indents/styles

//Utility Functions
function getHeaderColumns(meta) {
  var row = meta[0]
  var headerColumns = []
  row.forEach(function (meta, index) {
	if (meta.type === 'header') {
	  headerColumns.push(index)
	}
  })
  return headerColumns
}

function loadMeta (ht, meta) {
  meta.forEach(function (elm) {
	switch(eml.type) {
	  case 'header': {
		ht.setCellMeta(elm.row, elm.col, 'className', 'baseLineSection')
		break;
	  }
	}
  })
}

function findCellMeta(meta, row, col) {
  meta.forEach(function (elm) {
	if (elm.row === row && elm.col === col) {
	  return elm
	}
  })
  return undefined
}

function addClassToCell (ht, row, column, c) {
  var cellMeta = ht.getCellMeta(row, column);
  var oldClass = cellMeta.className
  ht.setCellMeta(row, column, 'className', oldClass + ' ' + c);
};
*/

</script>

<style lang="sass">
.FS
	display: inline-block
.handsontable
	display: inline-block
.Bs__contaner
	overflow: hidden //to make it scrollable
  	// font-size: 12px
  	font-family: "Roboto"
	display: inline-block

.Bs--current-row
  
.Bs--current-col

.Bs--current-head
	background-color: #DFEDFE !important

.Bs--commented-cell

.Bs--invalid-cell

.Bs--placeholder

.Bs--readOnly

.handsontable
	font-family: "Roboto"

.handsontable td, .handsontable th
	height: 15px !important
/* All table data */
.ht_master tr td
	// border-top-width: 0
	// border-left-width: 0
	// border-right: 1px solid #ccc
	// border-bottom: 1px solid #ccc
	empty-cells: show
	// line-height: 14px
	font-size: 12px
	// height: 14px !important
	padding: 0px !important
	// background-color: #fff
	// vertical-align: top
	// overflow: hidden
	// outline-width: 0
	// white-space: pre-line
	// background-clip: padding-box

  
/* All headers */
.handsontable th 


/* Row headers */
.ht_clone_left th, .th_master tbody th
	background-color: white 
	// font-size: 12px
	color: #4399FA
  
.ht_clone_left tr:first-child th, 
	border-radius: 10px 0 0 0 
.ht_clone_left tr:last-child th
	border-radius: 0 0 0 10px

tbody tr
	// height: 30px !important
	
.ht_master tbody tr th
	border: none !important

.wtHolder
	// height: 400px

/* Row headers */
/* Bottom */
  

//table thead tr th -> style: border: none;
  
.ht_clone_top_left_corner th  /*top left corner cell*/
	border-color: white !important
	background-color: white

/* Column headers */
/* Top */
.ht_clone_top th 
	background-color: white //#DFEDFE //#EFF3F8
	// font-size: 12px
	color: #4399FA
	// font-family: "Roboto"
.ht_clone_top th:nth-child(2)
	border-radius: 10px 0 0 0
.ht_clone_top th:last-child
	border-radius: 0 10px 0 0
.ht_master th
	border-color: white !important
	background-color: white

/* DATA CELLS */

/* Specific row () */
//.ht_master tr:nth-child(1) > td 
  //background-color: #33799F


/* Every even row */
.ht_master tr:nth-of-type(even) > td 
	background-color: #ECECEC
  
  

//ht_clone_top_left_corner -> top left corner only
//ht_clone_left -> row headers only
//ht_clone_top -> column header only
//ht_master -> all headers and data
.mainHeader
	background-color: #33799F !important //may not need

.sectionHeader
  //fat black border bottom
  border-bottom: 2px solid black !important
  //section color as background
  

.sectionLightBlue
	background-color: #D9EAFE !important
.sectionLightGreen
	background-color: #F3FFF5 !important
.sectionDarkBlue
	background-color: #C4DCFE !important
.sectionDarkGreen
	background-color: #E2F6D9 !important
  
.baseLineSection
	//fat colored border bottom
	border-bottom: 3px solid black !important
	//a little fat, colored and dashed border top
	border-top: 2px solid #67A3B3 !important
	//section color as background
  
.headerColumn
	//fat black boreder right
	border-right: 2px solid black !important

  
  //NOT WORKING WELL, AFFECTS COLUMNS TO THE RIGHT
.firstIndentedHeader
	padding-left: 2em !important //screws with auto adjusting width
	font-size: 14px
.secondIndentedHeader
	padding-left: 3em !important
	font-size: 14px

</style>
