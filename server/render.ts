// 根据不同的路由，显示对应的网页标题和描述
import { Helmet } from "react-helmet";
import { renderToString } from "react-dom/server";
import { matchRoutes } from "react-router-config";
import { createSSRRender } from "../src/server/index";
import path from "path";
import fs from "fs";

const htmlPath = path.resolve(process.cwd(), "public/client.html");
const helmet = Helmet.renderStatic();

export default function (req, res) {
  debugger
  if (req.path.indexOf('/client.html') === 0) {
    fs.readFile(htmlPath, (err, data) => {
      debugger
      if (err) {
        res.send(`<h1>Error:</h1>
        <p>${JSON.stringify(err)}</p>`)
      } else {
        let htmlTemple = data.toString('utf-8', 0, data.length)
        res.send(htmlTemple);
      }
    });
    return 
  }
  // cssArr  收集每一个组件引入的样式
  let context = { cssArr: [] };

  const SSRRender = createSSRRender({
    context,
    req,
  });

  // matchPath 是路由提供的工具方法，可以用来判断路径和路由对象是否匹配（不是简单的匹配：绝对相等）
  // 这样的也能匹配到
  // req.path   => /user/123456
  // route.path => /user/:id
  // matchRoutes 这个方法可以处理嵌套路由
  let matchedRoutes = matchRoutes(SSRRender.routes, req.path);

  let promises = [];
  // 当前匹配到的路由如果需要异步请求数据，那么就在这里请求数据
  matchedRoutes.forEach((item) => {
    if (item.route.loadData) {
      promises
        .push
        // new Promise(function (resolve) {
        //   // 防止一个接口的失败，影响页面的渲染
        //   // 不管调用接口是否失败，都让它成功
        //   return item.route.loadData(SSRRender.store).then(resolve, resolve);
        // })
        ();
    }
  });

  Promise.all(promises).then(function () {
    // 客户端用 HashRouter 或者 BrowserRouter
    // 而在服务端用 StaticRouter
    let html = renderToString(SSRRender.renderApp());

    // 渲染完成之后，再获取 css 样式
    let cssStr = context.cssArr.join("\n");

    if (context.action === "REPLACE") {
      // 重定向状态码是 302
      return res.redirect(302, context.url);
    } else if (context.notFound) {
      // notFound 为 true，那么访问的页面不存在，需要将状态码设置为 404
      // 如果不设置的话，状态码默认是 200
      res.statusCode = 404;
    }

    fs.readFile(htmlPath, (err, data) => {
      debugger
      if (err) {
        res.send(`<h1>Error:</h1>
        <p>${JSON.stringify(err)}</p>`)
      } else {
        let htmlTemple = data.toString('utf-8', 0, data.length)
        let meta = helmet.meta.toString()
        let title = helmet.title.toString()
        htmlTemple = htmlTemple.replace(/<!--start-ssr-meta-->[\s\S]*<!--end-ssr-meta-->/igm, `<!--start-ssr-meta-->${meta}<!--end-ssr-meta-->`)
        htmlTemple = htmlTemple.replace(/<!--start-ssr-title-->[\s\S]*<!--end-ssr-title-->/igm, `<!--start-ssr-title-->${title}<!--end-ssr-title-->`)
        htmlTemple = htmlTemple.replace(/<!--start-ssr-app-->[\s\S]*<!--end-ssr-app-->/igm, `<!--start-ssr-app--><div id="root" data-ssr="true">${html}</div><!--end-ssr-app-->`)
        res.send(htmlTemple);
      }
    });

    // res.send(`
    //         <html>
    //             <head>
    //             ${helmet.title.toString()}
    //             ${helmet.meta.toString()}
    //             <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@3.3.7/dist/css/bootstrap.min.css" />
    //             <style>${cssStr}</style>
    //             </head>
    //             <body>
    //             <div id="root">${html}</div>
    //             <script>
    //               // 服务端：组件初始化时会请求数据，请求的数据会存到服务端仓库中，然后组件使用数据显示相应内容
    //               // 客户端：为了避免组件挂载时又一次的请求数据（当服务器端已经请求过数据并返回了有数据的内容）
    //               // 所以这里要获取下存在服务端仓库中的数据并作为初始值存到 window 中
    //               // 俗称：数据的脱水
    //               window.context = {
    //                   state:${JSON.stringify(SSRRender.store.getState())}
    //               }
    //             </script>
    //             <script src="/client.js"></script>
    //             </body>
    //         </html>`);
  });
}
