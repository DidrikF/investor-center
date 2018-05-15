<template>
    <div>
        <input v-model="name"/>
        <HotTable :root="root" :settings="bsSettings" :data="getSpreadSheetById(spreadSheetId)" ref="bsRef"></HotTable> <!-- bsSettings is destructured in the HotTable component. -->
    </div>

</template>

<script>

    import HotTable from '../../../vue_plugins/handsontable-component/HotTable.vue'

    import { mapGetters, mapActions, mapMutations } from 'vuex'

    export default {
        data() {
            return {
                name: "",
                spreadSheetId: 42,

                root: 'Bs__container',
                /* These setttings are fairly contained to the specific handsontable */
                bsSettings: {
                    licenseKey: "trial",
                    allowInsertRow: false,
                    allowRemoveRow: false,
                    autoColumnSize: false,
                    autoRowSize: false, 
                    bindRowsWithHeaders: true, 
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
                },
            }
        },
        computed: {
            ...mapGetters({
                getSpreadSheetById: "charts/getSpreadSheetById"
            })
        },
        methods: {
            ...mapMutations({
                updateCells: "charts/updateCells", //payload = { spreadSheetId: 42, cellChanges: [[]...]
                cleanUpAfterCut: "charts/cleanUpAfterCut",
                copyCellIds: "charts/copyCellIds",
            }),
        },
        created () { 
            //this.bsSettings.data = this.balanceSheets 
            //bsSettings is passed down as a prop to the HotTable, but no events are emitted on changes inside the component.
            this.bsSettings.beforeCut = (data, coords) => {
                //express that data was cut

                coords.type = "cut"
            }

            this.bsSettings.beforeCopy = (data, coords) => { //Fired before values are copied into clipboard.
                //express that data was copied
                coords.type = "copy"
            }

            //then it gets into the clipboard as a string.


            this.bsSettings.afterCopy = (data, coords) => { //Fired after data are pasted into table. ???

            }

            this.bsSettings.afterCut = (data, coords) => { //Fired after data are cutted out from the table.
                //Create new ids for cells that got cut
                //clear the values of the things that got cut

                this.cleanUpAfterCut({
                    data: data,
                    coords: coords
                });

                //return data

            }

            this.bsSettings.beforePaste = (data, coords) => {

            }

            //afterChange hook is called before afterPaste.

            this.bsSettings.afterPaste = (data, coords) => { //I dont get the cells I paste into :(
                //if cut: copy id //let afterChange write in the new values.
                //if copy: just write in the values //done by after change

                if (coords && coords.type === "cut") {
                    console.log("it was a cut operation")
                    this.copyCellIds({
                        spreadSheetId: this.spreadSheetId,
                        data: data,
                        coords: coords
                    });
                }
                

            }

            this.bsSettings.afterChange = (changes) => {
                //not cut/copy, but manual changes. just about modifying values.
                
                //changes hold the indexes I need in .afterPaste()
                this.updateCells({  //does not exist! 
                    spreadSheetId: this.spreadSheetId,
                    cellChanges: changes
                });
            }

            //beforeUndo, afterUndo, beforeRedo, afterRedo.

            

            /*i cannot know when I paste something if it was first copied/cut or came from excel
            
            1) mark data when copy/cut
            2) after paste when it was cut
                1) remove it from the clipboard, so that you cannot paste multiple times 
            3) update the store
                1) Copy is simply modifying values
                2) cut requires to remove data (done in handsontable) 
                3) cut need to copy over both value and id and the cells that got cut need to get new ids.
            */

            //this.$refs.bsRef.table.render()
        },
        mounted () {
            //Is there no way to get at the table earlier?
            //this.$refs.bsRef.table

        },
        components: {
            HotTable
        },
        sockets: {
            config: {
                namespace: 'analysis'
            },
            updateBalanceSheetData(){
                this.HotTable.render()
            }
        }
    }

    /*
     addToData() {
        updateSettings({
                data: Handsontable.helper.translateRowsToColumns(data) //investigate!
            })
            this.hotSettings.data.push([69, 53])
        },
    updateHotSettings() {   // Rerenders! it works.
        this.bsSettings.rowHeaders = !this.bsSettings.rowHeaders
    }


     mounted () {
        this.$options.table = new Handsontable(this.$el, this.bsSettings);
        this.bsSettings.data = this.balanceSheets
        this.$options.table.updateSettings(this.bsSettings) //this works, but I suspect it is inefficient.
        // To improve this, I would have to understand better how Handsontable deals with updating configuration properties.
    },

    */
              
</script>