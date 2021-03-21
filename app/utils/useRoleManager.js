import {useImmerReducer} from 'use-immer';

import defaultRoles from '../assets/roles.json';

export default function useRoleManager() {
  const initialState = {roles: null};

  const reducer = (draft, action) => {
    switch (action.type) {
      case 'initialize':
        if (action.roles) draft.roles = action.roles;
        else draft.roles = defaultRoles;
        return;
      case 'changeSelectionState':
        draft.roles[action.role.name].selected = !draft.roles[action.role.name].selected;
        return;
      case 'changeQuantity':
        draft.roles[action.role.name].quantity = action.quantity;
        return;
      case 'add':
        draft.roles = {...draft.roles, ...action.role};
        return;
      case 'remove':
        draft.roles = Object.filter(draft.roles, role => role.name != action.role.name);
    }
  };

  Object.filter = (obj, callback) => {
    return Object.keys(obj)
      .filter(key => callback(obj[key]))
      .reduce((res, key) => ((res[key] = obj[key]), res), {});
  };

  const [state, dispatch] = useImmerReducer(reducer, initialState);

  return {state, dispatch};
}
