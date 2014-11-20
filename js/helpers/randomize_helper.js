RandomizeHelper = {
  get_random_int: function(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  },

  get_random_item: function(arr) {
    var count = arr.length;
    return arr[RandomizeHelper.get_random_int(0, count - 1)];
  }
}