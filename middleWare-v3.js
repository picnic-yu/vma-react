console.log('middleware demo');
let action = {type: 'event', playload: {x:10, y: 20}};
let dispatch = function(action) {
  console.log('dispatch-----------------------------');
  console.log('dispatch.action:' + JSON.stringify(action));
  console.log('call reducer to change root state & call all listen:mapStateToProps to notify props change');
  return action;
}

let store = {
    dispatch: (action) => {
        console.log(action)
        return action
    },
    getState: () => {
        return {root: ''}
    }
};
let middleware1= function({getState, dispatch}) {
    return function(next) {
        console.log('middleware1-----------------------------');
        console.log('middleware1.next:' + typeof next);
        console.log('next:' +  next);
        return function(action) {
          console.log('call middleware1.action=>' + 'typeof action: ' + typeof action + ' action:' + JSON.stringify(action));
          console.log('middleware1 begin')
          next(action)
          console.log('middlewar1    end')
        }
      }      
}

let middleware2 =  function({getState, dispatch}) {
    return function(next) {
        console.log('middleware2-----------------------------');
        console.log('middleware2.next:' + typeof next);
        console.log('next:' +  next);
        return function(action) {
            console.log('call middleware2.action=>' + 'typeof action: ' + typeof action + ' action:' + JSON.stringify(action));
            console.log('middleware2 begin')
            next(action)
            console.log('middleware2   end')
        }
    }
}
let middleware3 =  function({getState, dispatch}) {
    return function(next) {
        console.log('middleware3-----------------------------');
        console.log('middleware3.next:' + typeof next);
        console.log('next:' +  next);
        return function(action) {
            console.log('call middleware3.action=>' + 'typeof action: ' + typeof action + ' action:' + JSON.stringify(action));
            console.log('middleware3 begin')
            next(action)
            console.log('middleware3   end')
        }
    }
}
let middleware4 = function({getState, dispatch}) {
    return function(next) {
        console.log('middleware4-----------------------------');
        console.log('middleware4.next:' + typeof next);
        console.log('next:' +  next);
        return function(action) {
            console.log('call middleware4.action=>' + 'typeof action: ' + typeof action + ' action:' + JSON.stringify(action));
            console.log('middleware4 begin')
            next(action)
            console.log('middleware4   end')
        }
    }
}

let funcs = [middleware1, middleware2, middleware3, middleware4];

//funcs.reduce((a,b) => () => a(b()))();
//funcs.reduce((a,b) => (...arg) => b(a(...arg)))(dispatch);
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

function applyMiddleware(...middlewares) {
    let dispatch = store.dispatch
    let chain = []

    const middlewareAPI = {
      getState: store.getState,
      dispatch: (action) => dispatch(action)
    }
    chain = middlewares.map(middleware => middleware(middlewareAPI))
    dispatch = compose(...chain)(store.dispatch)
    console.log('new dispatch begin------------------------------------')
    console.log(dispatch.toString());
    console.log('new dispatch   end------------------------------------')
    
    return {
        getState: store.getState,
        dispatch
      }
    }
let invoke = applyMiddleware(middleware1, middleware2, middleware3, middleware4);
invoke.dispatch(action);

/* 
console.log('begin call compose');
let invoke = compose(middleware1, middleware2, middleware3, middleware4)(dispatch);
console.log('end   call compose');

console.log('begin call invoke');
invoke(action);
console.log('end   call invoke');
 */