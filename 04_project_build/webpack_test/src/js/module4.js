import {add} from './module3';

function sum(...args) {
  return args.reduce((prev, curr) => prev + curr);
}

console.log(add(1, 6));

export default sum;
