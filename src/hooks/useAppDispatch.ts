import { useDispatch } from 'react-redux'
import type { AppDispatch } from '@/stores/index'

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export default useAppDispatch
