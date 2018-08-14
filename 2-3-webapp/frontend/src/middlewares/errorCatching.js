export default function errorCatchingMiddleware() {
  return next => action => {

    // If not a promise, continue on
    if (!(action.payload && action.payload.promise)) {
      return next(action);
    }

    /*
     * Include a property in `meta` to handle error globaly
		 * meta.globalError = true
     * The error middleware serves to dispatch the initial pending promise to the promise middleware, but adds a `catch`.
     */
    if (action.meta.globalError) {
      // Dispatch initial pending promise, but catch any errors
      return next(action).catch(error => {
        // console.log(error);
        return error;
      });
    }

    return next(action);
  };
}