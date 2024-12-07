/**
 * Extended Map class
 *
 * A Map that allows for a missingFunction to be passed in.
 * If a key is not found in the map, the missingFunction will be called with the key as an argument.
 * The result of the missingFunction will be stored in the map and returned.
 */
export class MapPlus extends Map {
  constructor(missingFunction) {
    this.missingFunction = missingFunction;
  }

  get(key, createIfMissing = this.missingFunction) {
    let result = super.get(key);
    if (!result && createIfMissing) {
      result = createIfMissing(key);
      if (result && result.then) {
        const promise = result.then((value) => {
          super.set(key, value);
          return value;
        });
        super.set(key, promise);
      } else {
        super.set(key, result);
      }
    }

    return result;
  }
}
