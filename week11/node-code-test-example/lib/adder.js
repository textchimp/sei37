
module.exports = {

  // adder: function(a, b){
  // },

  checker(first, second, sum){
    return first+second === sum;
  },

  add(a, b){
    const sum = a + b;
    this.checker(a, b, sum);
    return sum;
  }

};
