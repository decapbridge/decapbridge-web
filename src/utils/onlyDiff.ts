/* eslint-disable no-prototype-builtins */
type Obj = Record<string, unknown>;

const onlyDiff = (objA: Obj, objB: Obj) => {
  const result: Obj = {};
  for (const key in objB) {
    if (objB.hasOwnProperty(key)) {
      if (!objA.hasOwnProperty(key) || objA[key] !== objB[key]) {
        result[key] = objB[key];
      }
    }
  }
  return result;
};

export default onlyDiff;
