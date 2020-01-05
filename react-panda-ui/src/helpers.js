export function createDictionaryFrom(collection, key = 'id') {
  return collection.reduce((dictionary, element) => {
    return {
      ...dictionary,
      [element[key]]: element,
    }
  }, {});
};