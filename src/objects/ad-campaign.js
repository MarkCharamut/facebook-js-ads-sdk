(function(root, factory) {
  'use strict';
  var dependencies = [
    './core/crud-object',
    './mixins/object-validation',
    './mixins/archivable'
  ];
  if (typeof define === 'function' && define.amd) define(dependencies, factory);
  else if (typeof exports === 'object') module.exports = factory.apply(factory, dependencies.map(function(d) { return require(d); }));
  else root.FacebookAdsApi.define('Objects.AdCampaign', dependencies, factory);
}(this, function(CrudObject, ObjectValidation, Archivable) {
  'use strict';

  var endpoint = 'adcampaign_groups';
  var fields = [
    'id',
    'account_id',
    'objective',
    'name',
    'campaign_group_status',
    'buying_type'
  ];

  /**
   * Group of Ad Sets
   * @see {@link} https://developers.facebook.com/docs/reference/ads-api/adcampaign
   * @param {FacebookAdsApi}  api
   * @param {mixed}           [initData]
   * @param {int}             [accountId]
   * @extends CrudObject
   * @class
   */
  function AdCampaign(api, initData, accountId) {
    var _this = new CrudObject(api, endpoint, fields, initData, accountId);
    ObjectValidation.call(_this);
    Archivable.call(_this, 'campaign_group_status');

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdSets = function(fields, params) {
      return _this.getManyByConnection(api.AdSet, fields, params);
    };

    /**
     * @param  {array}    fields
     * @param  {object}   params
     * @return {promise}
     */
    _this.getAdGroups = function(fields, params) {
      return _this.getManyByConnection(api.AdGroup, fields, params);
    };

    return _this;
  }

  AdCampaign.getEndpoint = function() { return endpoint; };
  AdCampaign.getFields = function() { return fields; };

  return AdCampaign;
}));
