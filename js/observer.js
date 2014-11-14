Observer = {
  _listeners: {},

  add: function(key, listener) {
    this._listeners[key] = listener;
  },

  remove: function(key) {
    delete this._listeners[key];
  },

  notify: function(params) {
    _.each(this._listeners, function(e){
      e.perform(params)
    });
  }
};