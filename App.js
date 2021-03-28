import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import {useTranslation} from 'react-i18next';
import {I18nManager} from 'react-native';
import RNRestart from 'react-native-restart';
import RNBootSplash from 'react-native-bootsplash';
//Context
import StateContext from './app/StateContext';
import DispatchContext from './app/DispatchContext';

//Components and utils
import cache from './app/utils/cache';
import BaseNavigation from './app/navigation/BaseNavigation';
import useRoleManager from './app/utils/useRoleManager';
import './app/services/i18n';

export default function App(props) {
  const {i18n, ready} = useTranslation();
  const {state, dispatch} = useRoleManager();
  const [cachedRoles, setCachedRoles] = useState('');

  const getCache = async () => {
    setCachedRoles(await cache.get('roles'));
  };

  useEffect(() => {
    getCache();
  }, []);

  useEffect(() => {
    if (ready) {
      if (i18n.language === 'fa' && !I18nManager.isRTL) {
        I18nManager.forceRTL(true);
        RNRestart.Restart();
      }
      if (i18n.language !== 'fa' && I18nManager.isRTL) {
        I18nManager.forceRTL(false);
        RNRestart.Restart();
      }
    }
  }, [ready]);

  useEffect(() => {
    if (cachedRoles != '') {
      dispatch({type: 'initialize', roles: cachedRoles});
    }

    RNBootSplash.hide({fade: true});
  }, [cachedRoles]);

  useEffect(() => {
    cache.store('roles', state.roles); //Store changes to asyncStorage
  }, [state.roles]);

  return (
    <StateContext.Provider value={state}>
      <DispatchContext.Provider value={dispatch}>
        {ready && <BaseNavigation /> /*Force not render until i18n is ready, cannot use suspence because makes entire app suspended*/}
      </DispatchContext.Provider>
    </StateContext.Provider>
  );
}
