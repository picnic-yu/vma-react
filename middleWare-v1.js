let dispatch = {type: 'event', playload: {x:10, y: 20}}

let middleware1= function(dispatch) {
    dispatch.playload.x += 10;
    dispatch.type = '+';
    console.log('x+y:' + ' x:' + dispatch.playload.x + ' y:' + dispatch.playload.y + ' type:' + dispatch.type);
    return dispatch;
}
let middleware2 =  function(dispatch) {
    dispatch.playload.x -= 10;
    dispatch.type = '-';
    console.log('x-y:' + ' x:' + dispatch.playload.x + ' y:' + dispatch.playload.y + ' type:' + dispatch.type);
    return dispatch;
}
let middleware3 =  function(dispatch) {
    dispatch.playload.x *= 10;
    dispatch.type = '*';
    console.log('x*y:' + ' x:' + dispatch.playload.x + ' y:' + dispatch.playload.y + ' type:' + dispatch.type);
    return dispatch;
}
let middleware4 = function(dispatch) {
    dispatch.playload.x /= 10;
    dispatch.type = '/';
    console.log('x/y:' + ' x:' + dispatch.playload.x + ' y:' + dispatch.playload.y + ' type:' + dispatch.type);
    return dispatch;
}

let funcs = [middleware1, middleware2, middleware3, middleware4];

//funcs.reduce((a,b) => () => a(b()))();
//funcs.reduce((a,b) => (...arg) => b(a(...arg)))(dispatch);
//模拟 https://github.com/reactjs/redux/blob/master/src/compose.js
function compose(...funcs) {
  if (funcs.length === 0) {
    return arg => arg
  }

  if (funcs.length === 1) {
    return funcs[0]
  }

  return funcs.reduce((a, b) => (...args) => a(b(...args)))
}

compose(middleware1, middleware2, middleware3, middleware4)(dispatch);
