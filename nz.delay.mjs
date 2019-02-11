/*
 * NZDelay是延时类,用于链式延时执行函数.
 * 示例:
 * (new NZDelay).do(1000).do(resolve=>resolve())
 */
const debug = false

class NZDelay {
  constructor () {
    this.list = []
  }

  _next () {
    if (this.list.length) {
      debug && console.log('debug: next')
      this.list[0]()
    }
  }

  do (value) {
    if (typeof (value) === 'number') {
      this.list.push(() => {
        let endTime = +new Date() + value, loopFn = () => {
          if (+new Date() >= endTime) {
            debug && console.log('debug: time out')
            this.list.shift()
            this._next()
            return
          }
          window.requestAnimationFrame(loopFn)
        }
        window.requestAnimationFrame(loopFn)
      })
    } else {
      this.list.push(() => {
        new Promise((resolve, reject) => {
          value(resolve, reject)
        }).then(() => {
          this.list.shift()
          this._next()
        }).catch((err) => {
          debug && console.log('debug: delay reject')
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
  NZDelay,
  Delay: {
    do (value) {
      return (new NZDelay()).do(value)
    },
  }
}

// 8000