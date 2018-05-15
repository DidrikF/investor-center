import Handsontable from 'handsontable';

export default class SettingsMapper {
  constructor() {
    this.registeredHooks = Handsontable.hooks.getRegistered();
    //Returns an array of registered hooks. I think both Handsontable internal hooks and custom hooks used by plugins. You can register a custom hook with the register() method.
  }

  /**
   * Prepare the `on`-property to be used in the Handsontable configuration.
   *
   * @param {String} property The name of the property, starting with `on`.
   * @returns {String} The proper property name, with the `on` part trimmed.
   */
  prepareProp(property) {
    return this.trimHookPrefix(property);
  }

  /**
   * Prepare the settings object containing the `on`-properties to be used in the Handsontable configuration.
   *
   * @param {Object} settings An object containing the properties, including the `on`-prefixed hook names.
   * @param {Object} additionalSettings An additional object containing the properties, including the `on`-prefixed hook names.
   * @returns {Object} An object containing the properties, with the `on`-prefixes trimmed.
   */
  prepare(settings, additionalSettings) { //settings = vueInstance.settings (if any), additionalSettings = vueInstance._props (if there were vueInstance.settings)
    const newSettings = {}; //creating a new object

    for (const key in settings) {
      if (settings.hasOwnProperty(key) && settings[key] !== void 0) {
        newSettings[this.prepareProp(key)] = settings[key]; //remove "on" prefix from hooks if there were any (and the hook exists)
      }
    }

    for (const key in additionalSettings) {
      if (additionalSettings.hasOwnProperty(key) && additionalSettings[key] !== void 0) { //if the key exists on additionalSettings and it is not null
        newSettings[this.prepareProp(key)] = additionalSettings[key]; //override vueInstnace.settings or add more settings from vueInstnace._props
        //in the conifguration object handsontable looks for properties prefixed with "on" to attach them as handlers to Handsontable hooks.
      }
    }

    return newSettings; //return settings to be passed to the handsontable constructor function.
  }

  /**
   * Add the `on` prefix to the provided hook name.
   *
   * @param {String} prop Handsontable plugin hook name.
   * @returns {String}
   */
  addHookPrefix(prop) {
    if (this.registeredHooks.indexOf(prop) > -1) { //if the hook exists return the hook name prefixed by "on".
      return 'on' + prop.charAt(0).toUpperCase() + prop.slice(1, prop.length);
    }

    return prop; //if not a registered hook, return it without "on" prefixed.
  }

  /**
   * Trim the `on` hook prefix.
   *
   * @param {String} prop Settings property.
   * @returns {String} Handsontable-compatible, prefix-less property name.
   */
  trimHookPrefix(prop) {
    if (prop.indexOf('on') === 0) {
      let hookName = prop.charAt(2).toLowerCase() + prop.slice(3, prop.length); //hook name minus the "on"
      if (this.registeredHooks.indexOf(hookName) > -1) { //if the hook exists
        return hookName; //return the modified hook name
      }
    }

    // returns the string anyway, when we're sure all the hooks are registered, might be changed
    return prop; //return the unmodified prop if it was not a hook prefixed with "on"
  }
}