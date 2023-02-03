import { StateProps } from '../../types/interfaces/StateProps';

export const getProfileSelector = (state: StateProps) => state.profileReducer;
export const getEditProfileSelector = (state: StateProps) =>
  state.editUserReducer;
