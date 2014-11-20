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
    var some_backend_tech = RandomizeHelper.get_random_item(this.accepted_labors_backend);
    var techs = [].concat(this.accepted_labors_frontend);

    techs.push(some_backend_tech);

    if (RandomizeHelper.get_random_int(0, 10) < 3) {
      techs.push(RandomizeHelper.get_random_item(this.accepted_labors_other));
    }
    return this.techs_with_random_labors(techs)
  },

  techs_with_random_labors: function(techs) {
    return _.reduce(techs, function(res, tech) {
      res[tech] = RandomizeHelper.get_random_int(20, 100);
      return res;
    }, {});
  },

  tick: function() {
    // if (RandomizeHelper.get_random_int(0, 15) == 15) {
      this._repository.add(this.generate());
    // }
  }
};