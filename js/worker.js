Worker = {
  new: function() {
    return {
      _skills: {},
      _is_busy: false,

      set_skills: function(val) {
        this._skills = val
      },

      skills: function() {
        return this._skills;
      },

      is_busy: function() {
        return this._is_busy
      },

      is_free: function() {
        return !this._is_busy
      },

      busy: function() {
        this._is_busy = true
      },

      free: function() {
        this._is_busy = false
      }
    };
  }
};