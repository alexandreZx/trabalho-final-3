import {
  createEntityAdapter,
  createReducer,
  createAction,
  EntityState,
  AnyAction,
} from '@reduxjs/toolkit';
import { PersistPartial } from 'redux-persist/es/persistReducer';
import { Recado } from '../../types/Recados';



const recadosAdapter = createEntityAdapter<Recado>();

export interface RecadosState extends EntityState<Recado> {}

export const recadosInitialState = recadosAdapter.getInitialState();

export const addRecado = createAction<Recado>('recados/add');
export const updateRecado = createAction<Recado>('recados/update');
export const removeRecado = createAction<string>('recados/remove');

const recadosReducer = createReducer(
  recadosInitialState,
  (builder) => {
    builder.addCase(addRecado, (state, action) => {
      recadosAdapter.addOne(state, action.payload);
    });
    builder.addCase(updateRecado, (state, action) => {
      recadosAdapter.updateOne(state, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
    builder.addCase(removeRecado, (state, action) => {
      recadosAdapter.removeOne(state, action.payload);
    });
  }
); export default recadosReducer

export const {
  selectAll: selectAllRecados,
  selectById: selectRecadoById,
} = recadosAdapter.getSelectors((state: RootState) => state.recados);

export interface RootState {
  recados: RecadosState;
}

interface RootStatePersist extends RootState, PersistPartial {}

export const persistedReducer = createReducer<RootStatePersist>(
  { recados: recadosInitialState } as RootStatePersist,
  (builder) => {
    builder.addCase(addRecado, (state, action) => {
      recadosAdapter.addOne(state.recados, action.payload);
    });
    builder.addCase(updateRecado, (state, action) => {
      recadosAdapter.updateOne(state.recados, {
        id: action.payload.id,
        changes: action.payload,
      });
    });
    builder.addCase(removeRecado, (state, action) => {
      recadosAdapter.removeOne(state.recados, action.payload);
    });
  }
);



