import * as Sequelize from "sequelize";
import * as session from "express-session";
import * as Express from "express";


declare module "express" {
    export interface Application {
        active_modules: ModuleInstance[];
        db: {
            sql: Sequelize.Connection;
        };
        config: AppConfig;
    }
}

export interface AppConfig {
    modules: ModuleConfig[];
    listen: ListenConfig;
    logType: string;
    trust_proxy: string;
    sessionStore: {host: string, port: number};
    session: session.SessionOptions;
    database: DBConfig;
    staticStorage: string;
    renderPagePath: string;
}

export interface ListenConfig {
    address: string;
    port: number;
}

export interface DBConfig {
    sql: {
        type: string;
        host: string;
        port: number;
        username: string;
        password: string;
        dbname: string;
    };
}


export interface ModuleInstance {
    name: string;
    route: string;
    router: Express.Router;
    init(): void;
}

export interface ModuleConfig {
    name: string;
    route: string;
    enable: boolean;
}
