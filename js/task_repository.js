TaskRepository = {
  _tasks: [],

  add: function(val) {
    this._tasks.push(val)
    if (this._tasks.length > 10) {
      this._tasks = this._tasks.slice(1)
    }
  },

  tasks: function() {
    return this._tasks;
  }
}