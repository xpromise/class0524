(() => {
  function sum(...args) {
    return args.reduce((prev, curr) => prev + curr);
  }
  console.log(sum(1, 2, 3, 4));
})();