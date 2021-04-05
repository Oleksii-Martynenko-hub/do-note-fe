import React from 'react';
import {
  BrowserRouter, Switch, Route, Redirect,
} from 'react-router-dom';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import { normalize } from 'styled-normalize';

import store, { history } from '@/store';
import { restoreAuthAsync } from '@/store/actions/restore-auth';

import ProtectedRouter from '@/components/common/ProtectedRouter';

import Login from './Login';
import Notes from './Notes';

export const theme = {
  palette: {
    primary: '#34495E',
    primaryActive: '#2C3E50',
    primaryInActive: '#95A5A6',
    body: '#ECF0F1',
    green: '#2B4F2D',
    red: '#6D3739',
    orange: '#E39E21',
  },
};

const GlobalStyle = createGlobalStyle`
  ${normalize};

  * {
    box-sizing: border-box;
    font-family: sans-serif;
    color: #333;
    font-size: 14px;

    &:disabled{
      -webkit-appearance: none;
      opacity:1;
    }
  }

  body {
    background-color: ${theme.palette.body};
  }

  input, textarea {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
  }
  
  input::-webkit-outer-spin-button,
  input::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }

  input[type=number] {
    -moz-appearance: textfield;
  }
`;

export enum Routes {
  ROOT = '/',
  LOGIN = '/login',
  NOTES = '/notes',
  DASHBOARD_OVERVIEW = '/dashboard/overview',
  DASHBOARD_SCHEDULER = '/dashboard/scheduler',
  DASHBOARD_SETTINGS = '/dashboard/settings',
  DASHBOARD_STATS = '/dashboard/stats',
  DASHBOARD_PERFORMANCE = '/dashboard/performance'
}

store.dispatch<any>(restoreAuthAsync());

const App: React.FC = () => (
  <BrowserRouter>
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <ThemeProvider theme={theme}>
          <GlobalStyle />

          <Switch>
            <Redirect from={Routes.ROOT} to={Routes.LOGIN} exact />
            <Route path={Routes.LOGIN} component={Login} exact />
            <ProtectedRouter path={Routes.NOTES} component={Notes} />
            <Redirect from="*" to={Routes.ROOT} exact />
          </Switch>
        </ThemeProvider>
      </ConnectedRouter>
    </Provider>
  </BrowserRouter>
);

export default App;
