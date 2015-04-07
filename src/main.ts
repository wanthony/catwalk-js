///<reference path="../typings/tsd.d.ts" />

/**
 * Usage:
 *
 * var Campaign = Catwalk.Model.create('campaign', {
 *   uid: {
 *     type: 'string'
 *   },
 *   name: {
 *     type: 'string',
 *     maxLength: 255
 *   }
 * });
 *
 * var fordCampaign = Campaign.$create({
 *   name: 'Ford1'
 * });
 **/

module Catwalk {

  interface IModelOptions extends Object {
    registerAdapter?(store : JSData.DS) : void;
  }

  export class Model {
    private _store : JSData.DS;
    private _model : Object;
    private _resource : any;
    private _errors : Object;

    constructor(store : JSData.DS, resource : any) {
      this._store = store;
      this._resource = resource;
      this._model = properties;
    }

    $create(properties : Object) {
      var promise = this._resource.DSCreate(properties);

      promise.catch((err) => {
        this._errors = err;
      });

      return promise;
    }

    static create(resourceName : string, schema : Object, options : IModelOptions = {}) {
      var store = new JSData.DS();

      if (typeof options.registerAdapter !== undefined) {
        options.registerAdapter(store);
      } else {
        store.registerAdapter('localstorage', new DSLocalStorageAdapter(), { default: true });
      }

      var resource = store.defineResource({
        name: resourceName,
        schema: schema
      });

      return new Model(store, resource);
    }

    get model() {
      return this._model;
    }

    get errors() {
      return this._errors;
    }
  }
}
