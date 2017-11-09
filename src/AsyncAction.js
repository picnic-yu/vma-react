function createAsynAction() {
    return function (api) {
        return function (next) {
            return function (action) {
                if (typeof action.type === 'function') {
                    return action.type(api.dispatch, api.getState);
                }

                return next(action);
            };
        };
    };
}

const asyncAction = createAsynAction();

export default asyncAction;
