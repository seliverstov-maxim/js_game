TaskGenerator.set_repository(TaskRepository);

Observer.add('common_timer', { perform: function() { Timer.tick() } });
Observer.add('task_generator', {
  perform: function() {
    TaskGenerator.tick();
    UpdateCurrentTasksPlugin(TaskRepository);
  }
});

setInterval(function() { Observer.notify() }, 1000);

UpdateCurrentTasksPlugin = function(task_repository) {
  var content = '<ul>';
  list = _.map(task_repository.tasks(), function(task) {
    var text = _.map(task.labor(), function(v, k){ return k + ': ' + v + ' hours'}).join(', ');
    return '<li>' + text + '</li>'
  });
  content += list.join('');
  content += '</ul>';
  $('.current_tasks').html(content);
}

UpdadateCandidateCard = function(worker) {
  var skills = worker.skills();

  var list_content = _.map(skills, function(skill_val, skill_name){
    return '<li>' + skill_name + ': ' + skill_val + '</li>'
  }).join('');

  $('.head_hanting .worker_card').html('<ul>' + list_content + '</ul>');
}

$(function() {
  $('button').click(function(e){
    type = $(e.currentTarget).data().workerType;
    var worker = WorkerGenerator.createWorker(type);
    UpdadateCandidateCard(worker);
  })
});
