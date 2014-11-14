Helper = {
  get_random_int: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}

TaskGenerator = {
  _repository: null,

  accepted_labors_backend: ['php', 'ruby', 'phyton', 'c++', 'c#', 'java', 'erlang', 'nodejs'],
  accepted_labors_frontend: ['html', 'javascript', 'css'],
  accepted_labors_other: ['seo', 'design', 'smm', 'direct'],

  set_repository: function(repository) {
    this._repository = repository;
  },

  generate: function() {
    var task = Task.new();
    task.set_labor(this.build_labors());
    return task;
  },

  build_labors: function() {
    var techs = [];
    techs.push(this.accepted_labors_backend[Helper.get_random_int(0, 7)]);
    techs = techs.concat(this.accepted_labors_frontend);
    if (Helper.get_random_int(0, 10) < 3) {
      techs.push(this.accepted_labors_other[Helper.get_random_int(0, 3)]);
    }
    return _.reduce(techs, function(res, tech) {
      res[tech] = Helper.get_random_int(20, 100);
      return res;
    }, {});
  },

  tick: function() {
    if (Helper.get_random_int(0, 15) == 1) {
      this._repository.add(this.generate());
    }
  }
};

TaskRepository = {
  _tasks: [],

  add: function(val) {
    this._tasks.push(val)
  }
}

TaskGenerator.set_repository(TaskRepository);

Observer.add('common_timer', { perform: function() { Timer.tick() } });
Observer.add('task_generator', { perform: function() { TaskGenerator.tick() } });
setInterval(function() { Observer.notify() }, 1000);