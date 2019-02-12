/*
 * NZDelay是延时类,用于链式延时执行函数.
 * 示例:
 * (new NZDelay).do(1000).do(resolve=>resolve())
 */
const setTimeOut = (fn, time) => {
  let endTime = +new Date() + time,
    loopFn = () => {
      if (+new Date() >= endTime) {
        return fn()
      }
      window.requestAnimationFrame(loopFn)
    }
  window.requestAnimationFrame(loopFn)
}

class NZDelay {
  constructor () {
    this.list = []
  }

  _next () {
    if (this.list.length) {
      this.list[0]()
    }
  }

  do (value) {
    if (typeof (value) === 'number') {
      this.list.push(() => {
        setTimeOut(() => {
          this.list.shift()
          this._next()
        }, value)
      })
    } else {
      this.list.push(() => {
        new Promise((resolve, reject) => {
          value(resolve, reject)
        }).then(() => {
          this.list.shift()
          this._next()
        }).catch((err) => {
          throw err
        })
      })
    }
    if (this.list.length <= 1) {
      this._next()
    }
    return this
  }
}

export default {
  setTimeOut,
  NZDelay,
  Delay: {
    do (value) {
      return (new NZDelay()).do(value)
    },
  }
}
