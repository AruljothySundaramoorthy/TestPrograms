var arr1 = [{ key: 1, val: 2 }, {key:2,val:2}, {key:3,val:3}, {key:4,val:3}],
  arr2 = [2, 4],
  res = arr1.filter((item) => arr2.includes(item.key));
console.log(res);
