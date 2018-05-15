import Handsontable from 'handsontable';
import SettingsMapper from './settingsMapper';

/**
 * Rewrite the settings object passed to the watchers to be a clean array/object prepared to use withing Handsontable config.
 *
 * @param {*} observerSettings Watcher object containing the changed data.
 * @returns {Object|Array}
 */

//!!!
 //DF:  The settings parameter is an object containing the new settings, declared the same way as in the initial settings object.

export function rewriteSettings(observerSettings) { //one new setting or a whole new settings obect.
  let settings = null;
  let type = {};

  if (Object.prototype.toString.call(observerSettings).indexOf('Array') > -1) { //[object Array]
    settings = [];
    type.array = true;

  } else if (typeof observerSettings === 'object') { 
    settings = {};
    type.object = true;
  }

  if (type.array || type.object) {
    for (const p in observerSettings) { //if it is an array or object, loop through the properties/elements and add them as properties on the new settings object.
      if (observerSettings.hasOwnProperty(p)) {
        settings[p] = observerSettings[p];
      }
    }

  } else {
    settings = observerSettings; //if its just a primitive
  }

  return settings; // return the settigns object/value (which could have been an array or and object or a primitive)
}

/**
 * Initialize Handsontable. By gathering settings and creating the table and save it on vueInstnance.settings 
 *
 * @param {Object} vueInstance The Vue component instance object.
 */
export function hotInit(vueInstance) {
  /* GATHER SETTINGS */
  const settingsMapper = new SettingsMapper();
  const unmappedSettings = [ //vueInstance.settings is nothing... Maybe intended as a way to set global settings for all tables
    vueInstance.settings ? vueInstance.settings : vueInstance._props, //unmappedSettings = [props]
  ];

  if (vueInstance.settings) { //if there were global settings also add the props from the component.
    unmappedSettings.push(vueInstance._props)
  }
  /* CREATE TABLE */
  vueInstance.table = new Handsontable(vueInstance.$el, settingsMapper.prepare(...unmappedSettings)); //creating a new handsontable instance and assignin it to the "table" prop on the vue instance/component.
  //add a table property to the vueInstance that hold the newly created handsontable.
}

/**
 * Destroy the Handsontable instance.
 *
 * @param {Object} vueInstance The Vue component instance object.
 */
export function hotDestroy(vueInstance) {
  vueInstance.table.destroy(); //call destroy on the handsontable instance.
}

/**
 * Generate an object containing all the available Handsontable properties and plugin hooks (with the `on`-prefixes added).

 * @returns {Object}
 */
export function propFactory() {
  const settingsMapper = new SettingsMapper();
  const currentSettings = Handsontable.helper.clone(Handsontable.DefaultSettings.prototype);
  const registeredHooks = Handsontable.hooks.getRegistered();

  for (let prop in currentSettings) {
    if (currentSettings.hasOwnProperty(prop)) {
      currentSettings[prop] = {};
    }
  }

  for (let i = 0; i < registeredHooks.length; i++) {
    currentSettings[settingsMapper.addHookPrefix(registeredHooks[i])] = {};
  }

  currentSettings.root = {
    'type': String,
    'default': 'hot-' + new Date().getTime()
  };

  currentSettings.settings = {
    'type': Object
  };

  /* Custom Extra Props to Financial Statement HotTable */
  currentSettings.cellMeta = {
    type: Array,
  };
  currentSettings.colorPalet = {
    type: Object,
  };
  currentSettings.root = {
    type: String,
  };
  
  //currentSettings is now an object with all the available properties and hooks (prefixed with "on" to distinguish them) as properties associated with empty object.
  return currentSettings; 
/*
 {
  onCreate: {},
  onDestroy: {},
  cols: {}, 
  settings: {}
 }
*/

}

/**
 * Generate and object containing all the available Handsontable properties and hooks tied to the Handsontable updating function.
 *
 * @param {Function} updateFunction Function used to update a single changed property.
 * @param {Function} bulkUpdateFunction Function used to update the whole `settings` object.
 * @returns {Object}
 */
export function propWatchFactory(updateFunction, bulkUpdateFunction) { //(updateHotSettings, updateBulkHotSettings)
  const props = propFactory(); //get an object with all handsontable settings and hooks set to {}

  //I NEED TO MAKE IT WATCH FOR CHANGES IN THE STORE (WE MIGHT COMMUNICATE WITH ANOTHER ANALYST)

  for (const prop in props) {
    if (props.hasOwnProperty(prop)) {
      if (prop === 'settings') { // handsontable.settings hold an object of used defined settings.
        props[prop] = { //prop['settings']
          handler: function(...args) { 
            return bulkUpdateFunction.call(this, prop, ...args); 
          }, //args -> newVal, oldVal
          
          //Update the Handsontable instance with a whole changed `settings` property.
          deep: true //To also detect nested value changes inside Objects, you need to pass in deep: true in the options argument. Note that you don’t need to do so to listen for Array mutations.
        };

      } else {
        props[prop] = { //props['data']
          handler: function(...args) { 
            return updateFunction.call(this, prop, ...args); 
          },
          deep: true
        };
      }
    }
  }

  return props; //props is an object of watchers 
  /*
    watchers: {
      settings: {
        handler: function () {},
        deep: true
      },
      data: {
        handler: function () {},
        deep: true
      }
    }
  */
}

// The `this` value in the functions below points to the Vue component instance. They're not meant to used anywhere but in the context of the component.

/**
 * Update the Handsontable instance with a single changed property.
 *
 * @param {String} updatedProperty Updated property name.
 * @param {Object} updatedValue Watcher-generated updated value object.
 * @param {Object} oldValue Watcher-generated old value object.
 */
export function updateHotSettings(updatedProperty, updatedValue, oldValue) {
  const newSettings = {};

  console.log("Updated property:")
  console.log(updatedProperty)
  console.log("Updated Value:")
  console.log(updatedValue)
  console.log("Old value:")
  console.log(oldValue)

  newSettings[updatedProperty] = rewriteSettings(updatedValue);
  this.table.updateSettings(newSettings); //the magic lies in the flexibility of the hansontable.updateSettings() method, which can take one or more properties and updates them in an efficient manner.
}

/**
 * Update the Handsontable instance with a whole changed `settings` property.
 *
 * @param {String} updatedProperty Updated property name.
 * @param {Object} updatedValue Watcher-generated updated value object.
 * @param {Object} oldValue Watcher-generated old value object.
 */
export function updateBulkHotSettings(updatedProperty, updatedValue, oldValue) {
  this.table.updateSettings(rewriteSettings(updatedValue));
}