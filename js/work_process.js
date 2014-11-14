WorkProcess = {
  new: function() {
    return {
      _workers: [],
      _task: null,
      _state: 'new',

      add_worker: function(worker) {
        if (worker.is_free()) {
          worker.busy();
          this._workers.push(worker);
        }
      },

      workers: function() {
        return this._workers;
      },

      add_task: function(task) {
        this._task = task;
      },

      is_finished: function() {
        return (this._state == 'finished')
      },

      start: function() {
        this._state = 'started';
      },

      tick: function() {
        if (this._state == 'started') {
          _.map(this._workers, function(worker){
            _.map(worker.skills(), function(val, key) {
              if (this._task.labor()[key] > 0) {
                this._task.perform(key, val)
              }
            }.bind(this))
          }.bind(this));

          this._update_state();
          this._update_workers();
        }
      },

      _update_state: function() {
        var res = _.reduce(this._task.labor(), function(sum, val, key){
          if (val > 0) {
            sum += 1
          };
          return sum;
        }, 0);

        if (res == 0) {
          this._state = 'finished';
        } else {Observer.add('common_timer', { perform: function() { Timer.tick() } });
          this._state = 'started';
        }
      },

      _update_workers: function() {
        var workers = _.map(this._workers, function(worker){
          var res = _.reduce(worker.skills(), function(sum, val, key){
            if (this._task.labor()[key] > 0) {
              sum += 1
            };
            return sum;
          }.bind(this), 0)
          if (res > 0) {
            return worker;
          } else {
            worker.free();
          }
        }.bind(this));
        this._workers = _.compact(workers);
      }
    };
  }
};