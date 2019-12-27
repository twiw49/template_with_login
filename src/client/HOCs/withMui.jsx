import React from 'react';

import JssProvider from 'react-jss/lib/JssProvider';
import { create, SheetsRegistry } from 'jss';
import { MuiThemeProvider, createMuiTheme, jssPreset } from '@material-ui/core/styles';

const withMui = WrappedComponent => {
  const sheetMui = new SheetsRegistry();

  const jss = create(jssPreset());
  jss.options.insertionPoint = 'jss-insertion-point';

  const createGenerateClassName = () => {
    let counter = 0;
    return rule => `jss--${rule.key}-${counter++}`;
  };

  const AppWithMui = props => (
    <JssProvider jss={jss} registry={sheetMui} generateClassName={createGenerateClassName()}>
      <MuiThemeProvider
        theme={createMuiTheme({
          typography: {
            useNextVariants: true,
            fontFamily: ['"NanumSquare"']
          }
        })}
        sheetsManager={new Map()}
      >
        <WrappedComponent {...props} />
      </MuiThemeProvider>
    </JssProvider>
  );

  return {
    AppWithMui,
    sheetMui
  };
};

export default withMui;
