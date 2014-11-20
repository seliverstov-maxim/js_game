var WorkerGenerator = {
  accepted_labors: {
    backend: ['php', 'ruby', 'phyton', 'c++', 'c#', 'java', 'erlang', 'nodejs'],
    frontend: ['html', 'javascript', 'css'],
    other: ['seo', 'design', 'smm', 'direct']
  },

  createBackendWorker: function() {
    return this.createWorker('backend');
  },

  createFrontendWorker: function() {
    return this.createWorker('frontend');
  },

  createOtherWorker: function() {
    return this.createWorker('other');
  },

  createWorker: function(type) {
    var worker = Worker.new();

    worker.set_skills(this.getSkills(this.accepted_labors[type]));
    return worker;
  },

  getSkills: function(accepted_labors) {
    var skills = {};

    for (var i = 0; i < 3; i++) {
      skill_name = RandomizeHelper.get_random_item(accepted_labors)
      skill_value = RandomizeHelper.get_random_int(20, 100);
      skills[skill_name] = (skills[skill_name] + skill_value) || skill_value;
    }
    return skills;
  }
}