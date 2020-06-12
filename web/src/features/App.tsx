import React from 'react';
import store from '../common/store'
import { Provider } from 'react-redux'
// import { renderRoutes } from 'react-router-config'
// import { HashRouter, Redirect } from 'react-router-dom'
import renderRouteConfig from '../common/router'
import routesInitialConfig from '../common/router/routeConfig'

console.log(renderRouteConfig(routesInitialConfig, '/'))
const App = () => {
  return (
    <Provider store={store}>
      {renderRouteConfig(routesInitialConfig, '/')}
    </Provider>
  );
}

export default App;
