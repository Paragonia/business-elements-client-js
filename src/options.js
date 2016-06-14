/**
 * @param {...Object} options to join.
 * @return Object with merged options.
 */
export function join(...options) {

  return options.reduce((l, r) => {
    return {
      ...l,
      ...r,
      headers: {
        ...l,
        ...r
      }
    };
  });
}
