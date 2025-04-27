import { shallowEqual } from 'react-redux'

const useAppShallowEqual = (objA: any, objB: any) => {
  const isEqual = shallowEqual(objA, objB)
  console.log(`对象比较结果: ${isEqual}`)
  return isEqual
}

export default useAppShallowEqual
