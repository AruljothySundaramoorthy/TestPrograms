function range(start, end, index) {
    console.log(start, end, index)
  var ans = [];
  for (let i = start; i <= end; i++) {
    ans.push(i);
  }
  return ans;
}

range(2,4)