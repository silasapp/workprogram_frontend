export const formatNumFromStr = (num: string) => {
  if (!num) return '';
  if (num.length < 4) return num;

  num = num.replace(/,/g, '');
  const digits = num.split('');

  for (let p = digits.length - 1; p >= 0; p -= 3) {
    digits.splice(p + 1, 0, ',');
  }

  let res = digits.join('');

  // console.log(
  //   'tes....',
  //   res[res.length - 1] === ',' ? res.substring(0, res.length - 1) : res
  // );
  return res[res.length - 1] === ',' ? res.substring(0, res.length - 1) : res;
};
