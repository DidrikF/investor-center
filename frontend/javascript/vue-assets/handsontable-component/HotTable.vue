<template>
  <div :id="root"></div> <!-- the root property passed from the parent. -->
</template>

<script>
  import Handsontable from 'handsontable';
  import SettingsMapper from './settingsMapper';
  import {
    hotInit,
    hotDestroy,
    propFactory,
    propWatchFactory,
    updateHotSettings,
    updateBulkHotSettings
  } from './helpers';
import { interfaceDeclaration } from 'babel-types';

/*

1) Props down ensuure data binding from the parent to the child
2) Events up ensure data flow from the child to the parent (that must be the intent of the watchers)
3) What props are going to be passed is unsure.
4) We need to create the table after the component-dom has been created.
5) Destroy the table when we destroy the component. The actual tairdown is done by Handsontable internally.

Watchers are made for all props (handsontable settings and hooks) that call handsontable.updateSettings() method with a whole new settings object, or just what was changed. You only change props from the top and down. There are no events emitted when the table itself changes any of the setttings (data are also settings).


PROBLEMS:
How can I make it so that changing the table also changes state in the parent component, which again may need to pass these changes down to a chart etc ?

Even better: I should have the table data living in a shared store and be able to affect many seperate components.
How do I rebuild this so that settings/data come from the store rather than props?
How do I make changes be persisted in the store?
  Needs to hanle:
    Adding new columns and rows.
    Changing both data and header values.
    I may want to change the data from multiple soruces, so I need to have watchers ready to initiate updates of the table.
    Custom calculations? (show cell column/row id on hover to aid with formula typig) DEFFER

The store is the source of truth and handsontable is the way to mutate it!

*/



  export default {
    name: 'HotTable',
    data() {
      return {
      
      }
    },
    props: propFactory(), //Generate an object containing all the available Handsontable properties and plugin hooks (with the `on`-prefixes added). Noe the component is ready to accept any props we pass down as handsontable settings.
    watch: propWatchFactory(updateHotSettings, updateBulkHotSettings), //Generate and object containing all the available Handsontable properties and hooks tied to the Handsontable updating function.
    methods: {
      preRender (ht, cellMeta) {
        var nrRows = ht.countRows()
        var nrCols = ht.countCols()
        for (var row = 0; row < nrRows; row++) {
          for (var col = 0; col < nrCols; col++) {
            var meta = cellMeta[row][col]
            if(!meta) {
              continue
            }
            var palet = {}
            if (meta.colorPalet) {
              palet = this.colorPalet[meta.colorPalet]
            }
            switch (meta.type) {
              case 'main header': 
                ht.setCellMeta(row, col, 'className', 'mainHeader') 
                break
              case 'section header':
                ht.setCellMeta(row, col, 'className', 'sectionHeader') 
                this.addClassToCell (ht, row, col, palet.dark)
                break
              case '1stIndent'  :
                ht.setCellMeta(row, col, 'className', 'firstIndentedHeader')
                break
              case '2ndIndent':
                ht.setCellMeta(row, col, 'className', 'secondIndentedHeader')
                break
              case 'baseline':
                ht.setCellMeta(row, col, 'className', 'baseLineSection')
                if (meta.headerColumn) {
                  this.addClassToCell (ht, row, col, palet.dark)
                }
                break
            } 
            if (meta.headerColumn) {
              //addClassToCell (ht, row, col, palet.light)
              this.addClassToCell (ht, row, col, 'headerColumn')
            }
          }
        }
      },
      addClassToCell (ht, row, column, c) {
        var cellMeta = ht.getCellMeta(row, column);
        var oldClass = cellMeta.className
        ht.setCellMeta(row, column, 'className', oldClass + ' ' + c);
      },

    },
    created () {
     
    },
    mounted: function() { 
      hotInit(this);
      this.preRender(this.table, this.cellMeta);
      this.table.render()
      return
    }, //Initialize Handsontable. By gathering settings and creating the table and save it on vueInstnance.settings , once the component is mounted.
    
    beforeDestroy: function() { 
      return hotDestroy(this); 
    }, //destroy the contained table before destroying the containing vue instance/component.

    //this.table -> to access the handsontable!

  };

/* NOTES FOR MODIFICATIONS:
Props can be as is I think

watchers shoud still cause updates when props change.

During hotInit I need to add hooks that trigger when data in a cell changes and run mutations based on that

  - Watchers and hooks updating the store needs a way to reference the data, so that updates are applied correctly
  - Changes that is done to ordering etc. in the table needs to be represented in the stored data as well.
  - If I want users to change their financial statements, the structures of blancesheets in the store needs to be highly mutable.

  I NEED TO INVENT THIS DATA STRUCTURE TO MAKE IT ALL WORK! ALL DEPENDS ON THIS!

Destroying the table should maybe trigger some last saves to the store? maybe not needed though?
  Depends on what chance it is for changes to be made and vue failing before updates comitted to the store.

      

*/

</script>

<style>
  @import "~handsontable/dist/handsontable.full.css";
</style>
