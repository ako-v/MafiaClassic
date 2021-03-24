import 'react-native-gesture-handler';
import React, {Suspense, useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
//Context
import StateContext from './app/StateContext';
import DispatchContext from './app/DispatchContext';

//Components and utils
import cache from './app/utils/cache';
import BaseNavigation from './app/navigation/BaseNavigation';
import useRoleManager from './app/utils/useRoleManager';
import './app/services/i18n';
import Fallback from './app/components/Fallback';

export default function App(props) {
  const {i18n} = useTranslation();
  const {state, dispatch} = useRoleManager();
  const [cachedRoles, setCachedRoles] = useState('');

  const getCache = async () => {
    setCachedRoles(await cache.get());
  };

  useEffect(() => {
    getCache();
    if (i18n.language === 'fa' && !I18nManager.isRTL) {
      I18nManager.forceRTL(true);
    }
    if (i18n.language !== 'fa' && I18nManager.isRTL) {
      I18nManager.forceRTL(false);
    }
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
        <Suspense>
          <BaseNavigation />
        </Suspense>
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
