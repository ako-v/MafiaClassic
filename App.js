import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';

//Context
import StateContext from './app/StateContext';
import DispatchContext from './app/DispatchContext';

//Components and utils
import cache from './app/utils/cache';
import BaseNavigation from './app/navigation/BaseNavigation';
import useRoleManager from './app/utils/useRoleManager';

export default function App(props) {
  const {state, dispatch} = useRoleManager();
  const [cachedRoles, setCachedRoles] = useState('');

  const getCache = async () => {
    setCachedRoles(await cache.get());
  };

  useEffect(() => {
    getCache();
  }, []);

  useEffect(() => {
    if (cachedRoles != '') {
      dispatch({type: 'initialize', roles: cachedRoles});
    }
  }, [cachedRoles]);

  useEffect(() => {
    cache.store(state.roles); //Store changes to asyncStorage
  }, [state.roles]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        <BaseNavigation />
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
