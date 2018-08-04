/// <reference path="typings/index.d.ts" />

import * as Sequelize from "sequelize";
import {appConfig} from "./config";
import * as Express from "express";
import * as cors from "cors";

function App(): Express.Application {
    let _app: any = Express();

    _app.active_modules = [];

    _app.db = {
        sql: new Sequelize(appConfig.database.sql.dbname, appConfig.database.sql.username, appConfig.database.sql.password, {
            host: appConfig.database.sql.host,
            dialect: appConfig.database.sql.type,
            port: appConfig.database.sql.port,
            pool: {
              maxConnections: 5,
              minConnections: 0,
              maxIdleTime: 10000
            },
            define: {
                charset: "utf8",
                collate: "utf8_general_ci"
            }
        })
    };

    _app.config = appConfig;
    let app: Express.Application = _app;

    _app.use(cors());
    return app;
}

export let app = App();
