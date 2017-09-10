了解redux middleware的工作原理

在命令行启动node middleWare-v2.js

得到以下输出
```sh

middleware demo
begin call compose
middleware4-----------------------------
middleware4.next:function
next:function (action) {
  console.log('dispatch-----------------------------');
  console.log('dispatch.action:' + JSON.stringify(action));
  console.log('call reducer to change root state & call all listen:mapStateToProps to notify props change');
  return action;
}
middleware3-----------------------------
middleware3.next:function
next:function (action) {
    console.log('call middleware4.action=>' + 'typeof action: ' + typeof action + ' action:' + JSON.stringify(action));
    console.log('middleware4 begin')
    next(action)
    console.log('middleware4   end')
  }
middleware2-----------------------------
middleware2.next:function
next:function (action) {
    console.log('call middleware3.action=>' + 'typeof action: ' + typeof action + ' action:' + JSON.stringify(action));
    console.log('middleware3 begin')
    next(action)
    console.log('middleware3   end')
  }
middleware1-----------------------------
middleware1.next:function
next:function (action) {
    console.log('call middleware2.action=>' + 'typeof action: ' + typeof action + ' action:' + JSON.stringify(action));
    console.log('middleware2 begin')
    next(action)
    console.log('middleware2   end')
  }
end   call compose
begin call invoke
call middleware1.action=>typeof action: object action:{"type":"event","playload":{"x":10,"y":20}}
middleware1 begin
call middleware2.action=>typeof action: object action:{"type":"event","playload":{"x":10,"y":20}}
middleware2 begin
call middleware3.action=>typeof action: object action:{"type":"event","playload":{"x":10,"y":20}}
middleware3 begin
call middleware4.action=>typeof action: object action:{"type":"event","playload":{"x":10,"y":20}}
middleware4 begin
dispatch-----------------------------
dispatch.action:{"type":"event","playload":{"x":10,"y":20}}
call reducer to change root state & call all listen:mapStateToProps to notify props change
middleware4   end
middleware3   end
middleware2   end
middlewar1    end
end   call invoke
```

关键点
curried function 柯里化函数
```sh
let middleWare = (x+y) => x + y;

let middleWare = x => y => x + y;

```

Array的reduce方法
```js

let invoke = [middleWare1, middleWare2, middleWare3, middleWare4].reduce((a, b) => (...args) => a(b(...args)));

invoke = middleWare1(middleWare2(middleWare3(middleWare4(...args))));

let next1 = middleWare2(middleWare3(middleWare4(...args)));
invoke = middleWare1(next1);

let next2 = middleWare3(middleWare4(...args));
invoke = middleWare1(middleWare2(next2));

let next3 = middleWare4(...args);
invoke = middleWare1(middleWare2(middleWare3(next3)));

let next4 = ...args;
invoke = middleWare1(middleWare2(middleWare3(middleWare4(nex4))));

let nex4 = ...args = dispatch = function(action) {
    return action;
}

invoke = middleWare1(middleWare2(middleWare3(middleWare4(dispatch(action)))));
```

```js
// the middleware signature is ({ getState, dispatch }) => next => action
// http://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&code_lz=KYDwDg9gTgLgBAE2AMwIYFcA29noHYDGMAlhHnKmGJgJ4CyxCCmwA7qlMABQB0fAto2ZsOwAM4BKOAG8AUHDicY6KOS4FOqGMADKMaMCkBeAHxwunBOgLAoAGjhhOmCKiQI9W4A-B4AFqiEtsZmcgoKBGRi8NEGcEZwGsBeegYWwFY29o7Oru6e2j7-gVkS8uEs8AjEYmBaBH7xcLGcPNW19X7lCpWJAcTkCQDaALqy3YlR8IJMLOycAIIACgCSTWHhCgDmwDAFwABczfqtO3swXnYTCu11MA1HvHwcW5LxZredTzwvkhMAvhMGqgBk0ZsJ5uIePxKFxwXNRO84PCRJw4UIEYtVhIyptPvdGglIvxIGJuHweMCBhIuC1gG0ancGmUJkoVOQNpsKXSrpsbozOgDyoD_kA&debug=false&circleciRepo=&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=6.26.0

//http://babeljs.io/repl/#?babili=false&browsers=&build=&builtIns=false&code_lz=GYVwdgxgLglg9mABAGzgczQUwE4AoDeiWUAylAIZSaIC-AlIvgFCKLaZQjZJiYAeURAF4AfInLR4SUYxatEEBAGc4yTADpUaXAHIA7jGTJEAExhKADpQgALHQBpxkhHSZzWAeg-IAwuSOIUDbUvAKm5lZQtogAthw2cCaIMEhB1DEwJiZqeuTsCjbkKeruKBxsHFxgAGr-INRCiKFQuBKwLm7yCsqqGlq6ShRU4sBU2OGW1naOxGSUmLh0rqVeiAAqNuaIBgHIMADWmMgAnogARtRpTu1IMFBKR8CO4GpKSive5LGZ2Zi5-aBsGlxikCkUkLZyGAsEk7iUuuxONwKkianVMHIaEwaEA&debug=false&circleciRepo=&evaluate=true&lineWrap=false&presets=es2015%2Creact%2Cstage-2&prettier=false&targets=&version=6.26.0

//applyMiddleWare(...middleWare)   是为了让middleware获取getState,dispatch

```
