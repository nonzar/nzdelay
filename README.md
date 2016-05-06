##简介
一个链式延迟执行函数类,利用`requestAnimationFrame`判断`data`实现.

##使用

###.w(ms)
需要等待的`毫秒`数.

**parameters**:
- **`ms`**: `[number]` 等待毫秒后

**example**:

```javascript
NZDelay.w(1000);
```
---

###.f(callback)
把函数加入队列

**parameters**:
- **`callback`**: `[function]` 需要执行的函数.

**example**:
```javascript
NZDelay.f(function(){
    console.log("1");
});
```

---
###延迟执行
配合`.w`和`.f`能延迟执行函数.

**example**:
```javascript
NZDelay.w(1000).f(function(){
    console.log(1);
}).w(1000).f(function(){
    console.log(2);
});
```
---

##支持

支持**`html5`**&**`css3`**的浏览器
