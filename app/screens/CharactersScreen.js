import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import CharacterList from '../components/CharacterList';

import Screen from '../components/Screen';

export default function CharactersScreen({party}) {
  return (
    <Screen>
      <CharacterList party={party} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  container: {},
  list: {},
});
