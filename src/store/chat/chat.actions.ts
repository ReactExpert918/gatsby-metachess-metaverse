import { createAction } from '../generators';

export enum ACTION_TYPE {
  'TOGGLE_SIDE_CHAT' = 'CHAT_TOGGLE_SIDE_CHAT',
  
}

export const chatActions = {
  toggleSideChat: createAction<boolean>(ACTION_TYPE.TOGGLE_SIDE_CHAT),
};
