

//判断一个对象是否为空对象
export const isEmptyObject = (obj:ObjectType) => !obj || Object.keys(obj).length === 0;

// 获取区间随机数
export function getRandomInt(min:number, max:number) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// 随机算法
export function shuffle(arr: any[]) {
  const new_arr: any[] = arr.slice();
  for (let i = 0; i < new_arr.length; i++) {
    const j = getRandomInt(0, i);
    const t = new_arr[i];
    new_arr[i] = new_arr[j];
    new_arr[j] = t;
  }
  return new_arr;
}

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}