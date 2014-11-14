
Test = {
  assertion_count: 0,
  errors_count: 0,

  assert_eq: function(val1, val2) {
    this.assertion_count++;
    if (_.isEqual(val1, val2)) {
      console.log('.')
    } else {
      this.errors_count++;
      console.log('f')
    }
  },

  run: function() {
    task = Task.new('Create simple page');
    task.set_labor({php: 9, javascript: 7});

    worker = Worker.new('Tom');
    worker.set_skills({php: 3, javascript: 5});

    process = WorkProcess.new();
    process.add_worker(worker);
    process.add_task(task);

    process.start();
    this.assert_eq(worker.is_busy(), true);
    this.assert_eq(process.is_finished(), false);

    for (var i = 0; i < 3; i++) {
      process.tick();
    }

    this.assert_eq(worker.is_busy(), false)
    this.assert_eq(process.is_finished(), true)
    this.assert_eq(process.workers(), [])

    var res = "Common test \n";
    res += "Total assertions: " + this.assertion_count + ", failed assertions: " + this.errors_count;
    return res;
  }
}