import {
  TypedUseSelectorHook,
  useDispatch as rdxUseDispatch,
  useSelector as rdxUseSelector
} from 'react-redux';
import type { RootState, AppDispatch } from './store';

export const useDispatch = () => rdxUseDispatch<AppDispatch>();
export const useSelector: TypedUseSelectorHook<RootState> = rdxUseSelector;