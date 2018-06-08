export default {
    namespace: 'router',
    state: {
        // ...routerReducer(),
        router: null
    },
    reducers: {
        apply(state, { payload }) {
            console.log("payload",payload)
            return Object.assign({},state,payload)
        },
    },
    effects: {
        *router(state,router) {
            // yield createAction('apply')();
            // Storage.set('router', 1);
        }
    }
}
