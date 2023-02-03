import { StateProps } from '../../types/interfaces/StateProps';

export const getSignUpSelector = (state: StateProps) => state.signUpReducer;
export const getSignInSelector = (state: StateProps) => state.signInReducer;
