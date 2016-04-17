/**
 * Abstract Object (may or may not have explicitly be a node of the Graph)
 * Manages object data fields and provides matching properties
 */
export default class AbstractObject {

  /**
   * @param {array} fields
   * @param {object} data Initial data
   */
  constructor (fields, data = {}) {
    this._data = {}
    this._fields = Object.keys(fields)
    this._defineProperties()
    if (data) this.setData(data)
  }

  /**
   * Define data getter and setter for every field
   */
  _defineProperties () {
    this._fields.forEach((field) => {
      Object.defineProperty(this, field, {
        get: () => this._data[field],
        set: (value) => { console.log(value); this._data[field] = value },
        enumerable: true
      })
    })
  }

  /**
   * Set data field
   * @param {string} field
   * @param {mixed} value
   * @return this
   */
  set (field, value) {
    if (this._fields.indexOf(field) < 0) {
      throw Error(field + ' is not one of this object\'s fields')
    }
    this._data[field] = value
    return this
  }

  /**
   * Set multiple data fields
   * @param {object} data
   * @return this
   */
  setData (data) {
    Object.keys(data).forEach((key) => {
      this.set(key, data[key])
    })
    return this
  }

  /**
   * Export object data
   * @return {object}
   */
  exportData () {
    return this._data
  }
}
