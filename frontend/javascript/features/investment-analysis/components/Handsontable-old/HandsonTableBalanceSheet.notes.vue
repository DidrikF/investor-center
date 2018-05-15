<template>
    <div>
        <HotTable :root="root" :settings="bsSettings"></HotTable>
    </div>

</template>

<script>

    //import Handsontable from 'handsontable-pro'
    import HotTable from 'vue-handsontable-official'

    /*  Is this a good place to register custom functions etc with Handsontable? 
        If so you should maybe extract it to a seperate file
    
    function negativeValueRenderer(instance, td, row, col, prop, value, cellProperties) {
        Handsontable.renderers.TextRenderer.apply(this, arguments);

        // if row contains negative number
        if (parseInt(value, 10) < 0) {
            // add class "negative"
            td.className = 'make-me-red';
        }

        if (!value || value === '') {
            td.style.background = '#EEE';
        } else {
            if (value === 'Nissan') {
                td.style.fontStyle = 'italic';
            }
            td.style.background = '';
        }
    }

    //You can also define the function directly on the configuration option
    Handsontable.renderers.registerRenderer('my.renderer', function(instance, TD, row, col, prop, value, cellProperties) {
      TD.innerHTML = value;
    });
    */

    function balanceSheetToData(balanceSheets) {
        let data = []

        return data
    }

    function dataToBalanceSheet(data) {
        let balanceSheets = []

        return balanceSheets
    }


    export default {
        data() {
            return {
                root: 'Bs__container', //id of container
                bsSettings: {
                    licenseKey: "trial",  //needed for commercial use of Handsontable
                    /*
                        Remember cascading config: constructor, column, cell, and "all" options can be defined on all of these levels
                    */
                    //className: "", //class name for the container element
                    data: null,
                    /*
                        Initial data source that will be bound to the data grid by reference (editing data grid alters the data source).
                    */
                    //startCols: 1,
                    /*
                    columns: [  //I think you can overwrite any constructor option on the column 
                                //Using this option sets a fixed number of columns (options startCols, minCols, maxCols will be ignored).
                        {
                            //type: '', //combination of: validator, editor, rederer
                            renderer: "autocomplete",
                            allowHtml: true,
                            source: ['<b>foo</b>', '<b>bar</b>'],
                            readOnly: true,
                            validator: function(value, callback) { // validation rules 
                            },
                        },
                        {
                            type: 'numeric',
                            numericFormat: {
                                pattern: '0,0.00 $',
                                culture: 'en-US'
                            },
                            validator: /^[0-9]$/ // regular expression
                            

                        },
                        {
                            title: "Date", //defines column header name
                            type: 'date',
                            dateFormat: 'MM/DD/YYYY', //Default: 'DD/MM/YYYY'
                            defaultData: '2015-02-02',
                        },
                        {
                          editor: 'select',
                          selectOptions: ['A', 'B', 'C'],
                        }
                    ],
                    */
                    /*
                    columns: function(index) { //Looks exacly like what i need :)
                        return {
                            type: index > 0 ? 'numeric' : 'text',
                            readOnly: index < 1
                        }
                    }
                    */
                    ////width: 500, //(or function returning a number) - no % allowed
                    ////height: 900, //(or function returning a number)
                    ////viewportColumnRenderingOffset: 3, //prerender extra columns, tweek for performance
                    ////viewportRowRenderingOffset: 0, //prerender extra rows
                    allowInsertRow: false,
                    allowRemoveRow: false,
                    autoColumnSize: false, //can increase performance, disables the autoColumnSize plugin
                    autoRowSize: false, //which is the default, what about including html in the table...
                    bindRowsWithHeaders: true, //Needed if i decide to use the column header for displaying the date
                    /*
                    cell: [ //you can also define cell options with the "CELLS" property which takes a function
                        //{row: 0, col: 0, readOnly: false},
                    ], //ANY CONSTRUCTOR OR COLUMN OPTION MAY BE OVERWRITTEN FOR AN INDIVIDUAL CELL!
                    */
                    //cells: function(row, col, prop){},
                    //stretchH: "all", //("last" or "none") - to strech columns to fit the defined width
                    //colWidths: [45, 100, 160, 60, 80, 80, 80],
                    //rowHeights: [50, 40, 100],
                    //manualColumnResize: true,
                    //manualRowResize: true
                    //manualColumnMove: true,
                    //manualRowMove: false
                    //fixedColumnsLeft: 2,  //What does this do?
                    //fixedRowsTop: 2,      //What does this do?
                    /*collapsibleColumns: [ //Clicking the "collapse/expand" button collapses (or expands) all "child" headers except the first one. DONT KNOW HOW THIS WORKS YET
                        {row: -4, col: 1, collapsible: true},
                    ],*/

                    copyPaste: true,
                    undo: true,     //FYI not all changes are undo-able at this time
                    colHeaders: true, //or array of header values
                    rowHeaders: true,  //can also be an array, NO A VIABLE OPTION
                    //rowHeaderWidth: 100, 
                    //rowHeights: 20, //(or array, function, string) - CAUSE OFFSET WITH ROW HEADER
                    //rowHeaderHights: 20,
                    //columnHeaderHeight: 20, //(or array)
                    //colWidths: 70,  //Accepts: number, string, array, function(index){}
                    currentRowClassName: "Bs--current-row",
                    currentColClassName: "Bs--current-col",
                    currentHeaderClassName: "Bs--current-head",
                    commentedCellClassName: "Bs--commented-cell",
                    invalidCellClassName: "Bs--invalid-cell",
                    noWordWrapClassName: "htNoWrap", //which is the default, dont understand what for yet
                    placeholderCellClassName: "Bs--placeholder",
                    readOnlyCellClassName: "Bs--readOnly",
                    tableClassName: "Bs", //Class name for all tables inside container element. You can have multiple???
                    ////customBorders: [], //(or true) - Add custom borders to selected cells/areas
                    //align numbers to the right? you can do this with the drop down menu...
                    //columnSummary: {}, //Docs referring to a demo, need to se this to know how to use 
                    //columnSorting: {}, //No example with custom sorter function... dont know if possible
                    comments: true, //(or [{row: 1, col: 1, comment: {value: "Test comment"}}]) - See demo
                    contextMenu: true, //Can also add custom options, may be all needed to create more statements etc.
                    //correctFormat: true, //automatically format cell data, may be used on dates and money amounts
                    //dataSchema: {}, //Defines the structure of a new row when data source is an array of objects.
                    //dropdownMenu: true, //(or array or object) - add configurable dropdown to column headers
                    //fixedColumnsLeft: 1, //fix the row "headers" ???
                    //formulas: true, //think this is the experimental plugin being enabled
                    //fragmentSelection: true, //think this would allow to select part of data in cell without opening the editor
                    //headerTooltips: {}, //rows property defines tooltips that should be added to rows
                    //hiddenColumns: {}, //allow hiding of certain columns
                    //hiddinRows: {}, //allow hidinf of certain columns
                    //manualColumnFreeze: true, //enable manualColumnFreeze plugin

                    //I want the possibility to move rows and columns arround, but I also need a way to save this config
                    manualColumnResize: true, //May be an option I need to save for the user
                        //manualColumnMove: true,
                        //manualRowResize: true, //
                        //manualRowMove: true,

                    //maxCols: 200, //may be useful to limit how the component is used and ensure performance
                    //maxRows: 100, //may be useful to limit how the component is used and ensure performance
                    //minCols: 1, 
                    //minRows: 15,
                    //minSpareRows: 1,
                    //minSpareCols: 0,
                    //mergeCells: [], //dont see usage now, but maybe I see it needed later
                    //observeChanges: true, //I WANT TO WAY DATA BINDING, think this is useful but dont understand yet
                    //observeDOMVisibility: true, //When set to true, the table is re-rendered when it is detected that it was made visible in DOM. May not be needed
                    //persistentState: true, //save table state in localstorage (the config saved here, might be what I need to persist to the database!), this enables 3 hooks which has default behaviour, but you can add/change stuff also 
                    //placeholder: "", cell content of empty cells... "0.0$" for example
                    //preventOverflow: 'horizontal', //(or false) prevents the table to overlap outside the parent element
                    //search: true, //Style descreet
                    tabMoves: {row: 1, col: 0},

                    //trimming:
                    //trimDropdown: false, //(true is default) - scale to fit the content
                    //trimRows: true, //(or array) - Plugin allowing hiding of certain rows.
                    //trimWhitespace: true, //false is a bad idea, think about doing maths with strings...
                    //wordWrap: true, //(true is default) - wrap the word when colWidth is set and content overflows
                    
                    //isEmptyCol: function(), //override the isEmptyCol() method, prob not needed
                    //isEmptyRow: function(), //override the isEmptyRow() method, prob not needed

                    /*
                    plugins: //Is not an option! 
                    // You basically have constructor/col/cel options to enable/disable/provide options to the plugins
                        autoColumnSize
                        collapsibleCulumns
                        columnSorting    //Sort by date, if arranged them i a wierd manner
                        columnSummary   // make pre-defined calculations on cell values and display results
                        comments        // Knowledge center and analysis related comments
                        exportFile      //export csv/object, if people want to take their data somewhere else
                        headerTooltips  //work with the knowledge center...
                        hideColumns
                        hideRows        //Especially this, only key data visible
                        trimRows        //seems like the same as above... need to investigate
                        //manually freeze, move and resize: rows and columns
                        nestedHeaders   //useful for grouping finaicial statemetns as per date/year/company etc.
                        observeChanges  //may help to create the two way data binding I want IMPORTANT!
                        //Experimental:
                        formulas
                        nestedRows      //Group rows, may be usefull, but can see that it will look good
                    
                    //Hooks - There is a shit ton of them...
                    
                    //How to:
                        create new column (undo, redo)
                        delete column (undo, redo)
                    
                        create/delete row, your own header
                    
                    //WTF is:
                        - disableVisualSelection
                        - filter, filteringCaseSensitive, sortByRelevance, sortIndicator (also for dropdowns), source (also for dropdown), strict and autocompletion functionality
                            - visibleRows: 15, //(default is 10) //number of choices for the autocompleat/dropdown visiblie without scrolling

                    */
                },
                balanceSheets: [
                    ["", "May 31, 2010", "December 30, 2010"],
                    ["Cash and equivalents", 3079.1, 3079.1],
                    ["Short-term investments", 3079.1, 3079.1],
                    ["Accounts receivables", 3079.1, 3079.1],
                    ["Inventories", 3079.1, 3079.1],
                    ["Deferred income taxes", 3079.1, 3079.1],
                    ["Prepaid expenses and other current assets", 3079.1, 3079.1],
                    ["Total current assets", 3079.1, 3079.1],
                    ["Property plant and equipment", 3079.1, 3079.1],
                    ["Identifiable intangible assets", 3079.1, 3079.1],
                    ["Goodwill", 3079.1, 3079.1],
                    ["Deferred income taxes and other assets", 3079.1, 3079.1],
                    ["Total assets", 3079.1, 3079.1],
                    ["Current portion of long term debt", 3079.1, 3079.1],
                    ["Notes payable", 3079.1, 3079.1],
                    ["Accounts payable", 3079.1, 3079.1],
                    ["Accrued liabilities", 3079.1, 3079.1],
                    ["Income taxes payable", 3079.1, 3079.1],
                    ["Total current liabilities", 3079.1, 3079.1],
                    ["Long term debt", 3079.1, 3079.1],
                    ["Deferred income taxea and other liabilities", 3079.1, 3079.1],
                    ["Commitments and contingencies", 3079.1, 3079.1],
                    ["Redeemable preferred stock", 3079.1, 3079.1],
                    ["Class A convertible", 3079.1, 3079.1],
                    ["Class B", 3079.1, 3079.1],
                    ["Capital in excess of stated value", 3079.1, 3079.1],
                    ["Accumulated other comprehensive income", 3079.1, 3079.1],
                    ["Retained earnings", 3079.1, 3079.1],
                    ["Total shareholder equity", 3079.1, 3079.1],
                    ["Total liabilities and shareholders´ equity", 3079.1, 3079.1],
                ]
            }
        },
        components: {
            HotTable
        },
        methods: {
            addToData() {
                updateSettings({
                    data: Handsontable.helper.translateRowsToColumns(data) //investigate!
                })
                this.hotSettings.data.push([69, 53])
            },
            updateHotSettings() {   /* Rerenders! it works. */
                this.hotSettings.rowHeaders = !this.hotSettings.rowHeaders
            }
        },
        created() {
            this.hotSettings.data = this.balanceSheets
        },
        sockets: {
            config: {
                namespace: 'analysis'
            },
            updateBalanceSheetData(){

                HotTable.render()
            }
        }
    }

/*

Handsontable funcionality:
1) Prepopulate data into rows as you write.
2) Paginating your data (only rows i guess/think)
3) Search for something in the table and make it easy to locate things
*/


              
</script>