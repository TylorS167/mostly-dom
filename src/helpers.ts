export const VOID = void 0;

export function isString (x: any): x is string {
  return typeof x === 'string';
}

export function isNumber (x: any): x is number {
  return typeof x === 'number';
}

export function isPrimitive (x: any): x is (string | number) {
  return isString(x) || isNumber(x);
}
