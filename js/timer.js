Timer = {
  _timestamp: Date.now(),

  get: function() {
    return this._timestamp;
  },

  set: function(val) {
    this._timestamp = val;
  },

  tick: function() {
    this._timestamp = this._timestamp + 1;
  }
};