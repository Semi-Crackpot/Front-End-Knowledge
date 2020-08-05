# sleep 函数

### 需求：先打印1，隔1秒后，打印2

### Promise
  ```js
  const sleep = time =>{
    return new Promise((resolve) => {
      console.log(1)
      setTimeout(resolve, time)
    })
  }
  sleep(1000).then(() => {
    console.log(2)
  })
  ```

### async 和 await
  ```js
  async function sleep(time, func) {
    console.log(1)
    await new Promise(resolve => setTimeout(resolve, time))
    return func()
  }
  sleep(1000, () => {
    console.log(2)
  })
  ```

### 
