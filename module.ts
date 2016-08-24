import * as Express from 'express';

export interface moduleInstance {
    router: Express.Router;
    init(): void;
}

export interface moduleConfig {
    name: string;
    route: string;
    enable: boolean;
}
