/**
 * Check if object is empty.
 *
 * @param body - Object
 * @returns boolean
 */
export const isEmptyObject = (body: object): body is object => {
  if (!body) return false;

  const bodyKeys = Object.keys(body);

  return bodyKeys.length === 0;
};
