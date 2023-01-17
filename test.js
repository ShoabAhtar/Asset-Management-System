let count = 0;
let thirdLargest = 0;
result = [[], []];
function multiply(arr1, arr2) {
  let item;
  for (i = 0; i < arr1.length; i++) {
    for (j = 0; j < arr2.length; j++) {
      result[i][j] = 0;
      for (k = 0; k < 2; k++) {
        result[i][j] = result[i][j] + arr1[i][k] * arr2[k][j];
        console.log(arr1[i][k], 'and ', arr2[k][j]);
      }
    }
  }
  // return result;
}
let arr1 = [
  [1, 2],
  [3, 4],
];
let arr2 = [
  [3, 4],
  [5, 6],
];
multiply(arr1, arr2);
console.log(result);
