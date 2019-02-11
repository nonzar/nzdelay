## 使用

### do(ms)
需要等待的`毫秒`数.

**parameters**:
- **`ms`**: `[number]` 等待毫秒后

```javascript
NZDelay.do(1000);
```
---

### do(callback)
把函数加入队列

**parameters**:
- **`callback`**: `[function]` 需要执行的函数.

```javascript
NZDelay.do(function(){
    console.log("1");
});
```

---