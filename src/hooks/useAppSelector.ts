import { useSelector } from 'react-redux'
import { RootState } from '../stores/index'

export const useAppSelector = useSelector.withTypes<RootState>()

export default useAppSelector
