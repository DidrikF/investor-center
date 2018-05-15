export const balanceSheetSettings = {
  licenseKey: 'trial',
  allowInsertRow: false,
  allowRemoveRow: false,
  autoColumnSize: false,
  autoRowSize: false,
  bindRowsWithHeaders: true,
  copyPaste: true,
  undo: true,
  colHeaders: true,
  rowHeaders: true,
  /*
  currentRowClassName: "Bs--current-row",
  currentColClassName: "Bs--current-col",
  currentHeaderClassName: "Bs--current-head",
  commentedCellClassName: "Bs--commented-cell",
  invalidCellClassName: "Bs--invalid-cell",
  noWordWrapClassName: "htNoWrap",
  placeholderCellClassName: "Bs--placeholder",
  readOnlyCellClassName: "Bs--readOnly",
  tableClassName: "Bs",
  */
  comments: true,
  contextMenu: true,
  manualColumnResize: true,
  tabMoves: { row: 1, col: 0 },
  // bsSettings is passed down as a prop to the HotTable,
  // but no events are emitted on changes inside the component.
  /*
//IS THERE A WAY I CAN BIND "THIS" CORRECTLY?


  beforeCut: (data, coords) => {
      //express that data was cut
      coords.type = "cut"
  },
  beforeCopy: (data, coords) => { //Fired before values are copied into clipboard.
      //express that data was copied
      coords.type = "copy"
  },
  afterCopy: (data, coords) => { //Fired after data are pasted into table. ???

  },
  afterCut: (data, coords) => { //Fired after data are cutted out from the table.
      //Create new ids for cells that got cut
      //clear the values of the things that got cut

      this.cleanUpAfterCut({
          data: data,
          coords: coords
      });
  },
  beforePaste: (data, coords) => {

  },
  afterPaste: (data, coords) => {//afterChange hook is called before afterPaste.
    //I dont get the cells I paste into :(
      if (coords && coords.type === "cut") {
          console.log("it was a cut operation")
          this.copyCellIds({
              spreadSheetId: this.spreadSheetId,
              data: data,
              coords: coords
          });
      }
  },
  afterChange: (changes) => {
      // not cut/copy, but manual changes. just about modifying values
      // changes hold the indexes I need in .afterPaste()
      this.updateCells({  //does not exist!
          spreadSheetId: this.spreadSheetId,
          cellChanges: changes
      });
  }
  */
};

export const incomeStatementSettings = {

};
