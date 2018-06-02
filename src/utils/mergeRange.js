export default function mergeRange([...ranges]) {
  ranges.sort((fir, sec) => {
    if (fir[0] === sec[0]) return fir[1] < sec[1] ? -1 : 1;
    return fir[0] < sec[0] ? -1 : 1;
  });

  const merged = [];
  let curStart = -1;
  let curEnd = -1;

  ranges.forEach(([start, end]) => {
    if (curEnd <= start) {
      if (curEnd !== -1) merged.push([curStart, curEnd]);

      curStart = start;
      curEnd = end;
    } else {
      curEnd = Math.max(end, curEnd);
    }
  });

  if (curEnd !== -1) merged.push([curStart, curEnd]);

  return merged;
}
