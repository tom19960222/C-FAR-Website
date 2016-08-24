/// <reference path="typings/index.d.ts" />
///<reference path="typings/zuhzu/index.d.ts"/>

import * as logger from "morgan";
import * as helmet from "helmet";
import * as passport from "passport";
import * as _RedisStore from "connect-redis";
import * as session from "express-session";
import * as path from "path";
import {appConfig} from "./config";
import {app} from "./app";
let RedisStore = _RedisStore(session);

global["app"] = app; // Push app to global variable.

app.engine(".html", require("ejs").__express);
app.set("view engine", "html");
app.set("views", app.config.renderPagePath);
app.set("trust proxy", appConfig.trust_proxy);
app.use(logger(appConfig.logType));

// Use helmet to prevent some common attack.
app.use(helmet.xssFilter());
app.use(helmet.frameguard("sameorigin"));
app.use(helmet.hidePoweredBy());
app.use(helmet.ieNoOpen());
app.use(helmet.noSniff());

appConfig.session.store = new RedisStore(appConfig.sessionStore);
app.use(session(appConfig.session));
app.use(passport.initialize());
app.use(passport.session());

appConfig.modules.forEach(moduleConfig => {
    if (moduleConfig.enable) {
        let _moduleInstance = require(path.join(__dirname, "modules", moduleConfig.name));
        _moduleInstance.name = moduleConfig.name;
        _moduleInstance.route = moduleConfig.route;
        app.active_modules.push(_moduleInstance);

        _moduleInstance.init(moduleConfig);
        app.use(moduleConfig.route, _moduleInstance.router);
        console.log("Loaded module " + _moduleInstance.name + ", mounted at " + _moduleInstance.route);
    }
});

app.db.sql.sync({force: true});

app.listen(appConfig.listen.port, () => {
    console.log("Server started at port " + appConfig.listen.port);
});
