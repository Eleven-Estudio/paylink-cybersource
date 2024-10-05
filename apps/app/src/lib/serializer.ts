export const serializedError = (error: Error) =>
  JSON.stringify(error, Object.getOwnPropertyNames(error));

export const deserializedError = (error: string) =>
  Object.assign(new Error(), JSON.parse(error));
