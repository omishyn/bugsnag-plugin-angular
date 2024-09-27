import { ErrorHandler } from '@angular/core';
import { Client, Plugin } from '@bugsnag/js';
import * as i0 from "@angular/core";
export declare class BugsnagErrorHandler extends ErrorHandler {
    bugsnagClient: Client;
    constructor(client?: Client);
    handleError(error: any): void;
    static ɵfac: i0.ɵɵFactoryDeclaration<BugsnagErrorHandler, never>;
    static ɵprov: i0.ɵɵInjectableDeclaration<BugsnagErrorHandler>;
}
declare const plugin: Plugin;
export default plugin;
