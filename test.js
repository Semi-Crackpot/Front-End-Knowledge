let obj = {}
obj.name = 'zhangsan'
Object.defineProperty(obj, 'name', {
  value: 'zhangsan',
  writable: true,
  configurable: true,
  enumerable: true
})