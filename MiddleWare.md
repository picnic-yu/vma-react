了解redux middleware的工作原理

在命令行启动node，输入以下代码

```js
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
funcs.reduce((a,b) => (...arg) => b(a(...arg)))(dispatch);
```

得到以下输出
```sh

> funcs.reduce((a,b) => (...arg) => b(a(...arg)))(dispatch);
x+y: x:20 y:20 type:+
x-y: x:10 y:20 type:-
x*y: x:100 y:20 type:*
x/y: x:10 y:20 type:/
{ type: '/', playload: { x: 10, y: 20 } }
> 
> 
> funcs.reduce((a,b) => (...arg) => a(b(...arg)))(dispatch);
x/y: x:1 y:20 type:/
x*y: x:10 y:20 type:*
x-y: x:0 y:20 type:-
x+y: x:10 y:20 type:+
{ type: '+', playload: { x: 10, y: 20 } }
```
