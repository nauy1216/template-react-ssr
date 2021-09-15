import React from "react";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import routes from "../routes";
import { Provider } from "react-redux";
import { getServerStore } from "../store";

// 为了避免干扰， 每一次请求都是新的store
export function createSSRRender(props) {
  let { req, context } = props;
  // 获取服务端的 store
  let store = getServerStore(req);

  return {
    routes,
    store,
    renderApp() {
      return (
        <Provider store={store}>
          <StaticRouter context={context} location={req.path}>
            {renderRoutes(routes)}
          </StaticRouter>
        </Provider>
      );
    },
  };
}