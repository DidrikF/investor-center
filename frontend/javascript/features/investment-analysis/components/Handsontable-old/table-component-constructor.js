import Vue from 'vue';
import { mapGetters, mapMutations, mapActions } from 'vuex';
import store from '../../../vuex';
import HotTable from '../../../vue_plugins/handsontable-component/HotTable.vue';

import { balanceSheetSettings } from './handsontable-settings';

export default function (options) {
    /*
    const constructor = Vue.extend({ 
        template: ` 
            <div> 
                <h1> Hello </h1>
            </div>
        `,
    });
     */
const constructor = { //DONT KNOW IF THIS WILL WORK
    name: "handsontable-wrapper",
    template: ` 
        <div :id="spreadSheetId"> 
            <input v-model="name"></input>
            <HotTable :root="root" :settings="settings" :data="getSpreadSheetById(spreadSheetId)"></HotTable>
        </div>
    `,
    data() {
        return {
            name: options.name,
            spreadSheetId: options.id, //when creating a new Handsontable spread sheet (financial statement) maybe this is passed in as a prop...
            //template: options.template,
            settings: options.settings,

            root: 'Bs__test',
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
    created() {
        console.log("from new created component!")
        console.log(this.$store)
        console.log(this.getSpreadSheetById(this.spreadSheetId))
        this.settings.beforeCut = (data, coords) => {
            //express that data was cut

            coords.type = "cut"
        }

        this.settings.beforeCopy = (data, coords) => { //Fired before values are copied into clipboard.
            //express that data was copied
            coords.type = "copy"
        }

        //then it gets into the clipboard as a string.


        this.settings.afterCopy = (data, coords) => { //Fired after data are pasted into table. ???

        }

        this.settings.afterCut = (data, coords) => { //Fired after data are cutted out from the table.
            //Create new ids for cells that got cut
            //clear the values of the things that got cut

            this.cleanUpAfterCut({
                data: data,
                coords: coords
            });

            //return data

        }

        this.settings.beforePaste = (data, coords) => {

        }

        //afterChange hook is called before afterPaste.

        this.settings.afterPaste = (data, coords) => { //I dont get the cells I paste into :(
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

        this.settings.afterChange = (changes) => {
            //not cut/copy, but manual changes. just about modifying values.
            
            //changes hold the indexes I need in .afterPaste()
            this.updateCells({  //does not exist! 
                spreadSheetId: this.spreadSheetId,
                cellChanges: changes
            });
        }
    },
    mounted() {
        
    },
    store: store, //does this work?, is there another way?
    components: {
        HotTable
    }
}
   

    return constructor;

}








