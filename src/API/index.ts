import Send from "./interceptor";

const checkDot = (num: number, plusNum: number): number => {
  let newNum: string[] | number = num.toString().split("");
  const arr = [];

  for (let i = 0; i < newNum.length; i++) {
    if (newNum[i] === ".") {
      arr.push(i);
    }
  }

  if (arr.length >= 2) {
    newNum = newNum.slice(0, arr[1]);

    newNum = parseFloat(newNum.join("")) + plusNum;
  } else {
    newNum = parseFloat(newNum.join(""));
  }

  return newNum;
};

const loadAnsims = ({ lat, lng }: { lat: number; lng: number }) => {
  const minX = lng - 0.028;
  const minY = lat - 0.022;
  const maxX = checkDot(lng + 0.028, 0.028);
  const maxY = checkDot(lat + 0.022, 0.022);
  return Send({
    url: `/getAnsims?minX=${minX}&minY=${minY}&maxX=${maxX}&maxY=${maxY}`,
  });
};

export { loadAnsims };
