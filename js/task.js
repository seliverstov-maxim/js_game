Task = {
  new: function() {
    return {
      _labor: {},
      // {php: 150, javascript: 200, design: 150}

      set_labor: function(val) {
        this._labor = val;
      },

      labor: function() {
        return this._labor;
      },

      perform: function(key, val) {
        if(this._labor[key]) {
          this._labor[key] = this._labor[key] - val;
        }
      }
    }
  }
};