import * as React from 'react';
import DrawerNavigator from './Source/Navigation/DrawerNavigator';
import GlobalStateProvider from './Source/Context/GlobalStateProvider';

export default function App() {
  return (
    <GlobalStateProvider>
    <DrawerNavigator />
    </GlobalStateProvider>
  );
}