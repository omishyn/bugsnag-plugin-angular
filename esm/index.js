import { ErrorHandler, Injectable } from '@angular/core';
import Bugsnag from '@bugsnag/js';
import * as i0 from "@angular/core";
import * as i1 from "@bugsnag/js";
// zones are optional, so we need to detect if they are being used
// see https://angular.io/guide/zone#noopzone
const isNgZoneEnabled = typeof Zone !== 'undefined' && !!Zone.current;
export class BugsnagErrorHandler extends ErrorHandler {
    bugsnagClient;
    constructor(client) {
        super();
        if (client) {
            this.bugsnagClient = client;
        }
        else {
            this.bugsnagClient = Bugsnag._client;
        }
    }
    handleError(error) {
        const handledState = {
            severity: 'error',
            severityReason: { type: 'unhandledException' },
            unhandled: true
        };
        const event = this.bugsnagClient.Event.create(error, true, handledState, 'angular error handler', 1);
        if (error.ngDebugContext) {
            event.addMetadata('angular', {
                component: error.ngDebugContext.component,
                context: error.ngDebugContext.context
            });
        }
        this.bugsnagClient._notify(event);
        ErrorHandler.prototype.handleError.call(this, error);
    }
    static ɵfac = function BugsnagErrorHandler_Factory(__ngFactoryType__) { return new (__ngFactoryType__ || BugsnagErrorHandler)(i0.ɵɵinject(i1.Client)); };
    static ɵprov = /*@__PURE__*/ i0.ɵɵdefineInjectable({ token: BugsnagErrorHandler, factory: BugsnagErrorHandler.ɵfac });
}
(() => { (typeof ngDevMode === "undefined" || ngDevMode) && i0.ɵsetClassMetadata(BugsnagErrorHandler, [{
        type: Injectable
    }], () => [{ type: i1.Client }], null); })();
const plugin = {
    load: (client) => {
        const originalNotify = client._notify;
        client._notify = function () {
            const originalArguments = arguments;
            if (isNgZoneEnabled) {
                // run notify in the root zone to avoid triggering change detection
                Zone.root.run(() => {
                    originalNotify(originalArguments);
                });
            }
            else {
                // if zones are not enabled, change detection will not run anyway
                originalNotify(originalArguments);
            }
        };
        return new BugsnagErrorHandler(client);
    },
    name: 'Angular'
};
export default plugin;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290Ijoic3JjLyIsInNvdXJjZXMiOlsiaW5kZXgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxFQUFFLFlBQVksRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUE7QUFDeEQsT0FBTyxPQUEyQixNQUFNLGFBQWEsQ0FBQTs7O0FBVXJELGtFQUFrRTtBQUNsRSw2Q0FBNkM7QUFDN0MsTUFBTSxlQUFlLEdBQUcsT0FBTyxJQUFJLEtBQUssV0FBVyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFBO0FBR3JFLE1BQU0sT0FBTyxtQkFBb0IsU0FBUSxZQUFZO0lBQzVDLGFBQWEsQ0FBUztJQUM3QixZQUFhLE1BQWU7UUFDMUIsS0FBSyxFQUFFLENBQUE7UUFDUCxJQUFJLE1BQU0sRUFBRSxDQUFDO1lBQ1gsSUFBSSxDQUFDLGFBQWEsR0FBRyxNQUFNLENBQUE7UUFDN0IsQ0FBQzthQUFNLENBQUM7WUFDTixJQUFJLENBQUMsYUFBYSxHQUFLLE9BQWUsQ0FBQyxPQUFrQixDQUFBO1FBQzNELENBQUM7SUFDSCxDQUFDO0lBRU0sV0FBVyxDQUFFLEtBQVU7UUFDNUIsTUFBTSxZQUFZLEdBQUc7WUFDbkIsUUFBUSxFQUFFLE9BQU87WUFDakIsY0FBYyxFQUFFLEVBQUUsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQzlDLFNBQVMsRUFBRSxJQUFJO1NBQ2hCLENBQUE7UUFFRCxNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQzNDLEtBQUssRUFDTCxJQUFJLEVBQ0osWUFBWSxFQUNaLHVCQUF1QixFQUN2QixDQUFDLENBQ0YsQ0FBQTtRQUVELElBQUksS0FBSyxDQUFDLGNBQWMsRUFBRSxDQUFDO1lBQ3pCLEtBQUssQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFO2dCQUMzQixTQUFTLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxTQUFTO2dCQUN6QyxPQUFPLEVBQUUsS0FBSyxDQUFDLGNBQWMsQ0FBQyxPQUFPO2FBQ3RDLENBQUMsQ0FBQTtRQUNKLENBQUM7UUFFRCxJQUFJLENBQUMsYUFBYSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQTtRQUNqQyxZQUFZLENBQUMsU0FBUyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFBO0lBQ3RELENBQUM7NkdBbkNVLG1CQUFtQjtnRUFBbkIsbUJBQW1CLFdBQW5CLG1CQUFtQjs7aUZBQW5CLG1CQUFtQjtjQUQvQixVQUFVOztBQXVDWCxNQUFNLE1BQU0sR0FBVztJQUNyQixJQUFJLEVBQUUsQ0FBQyxNQUFjLEVBQWdCLEVBQUU7UUFDckMsTUFBTSxjQUFjLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQTtRQUVyQyxNQUFNLENBQUMsT0FBTyxHQUFHO1lBQ2YsTUFBTSxpQkFBaUIsR0FBRyxTQUFnQixDQUFBO1lBQzFDLElBQUksZUFBZSxFQUFFLENBQUM7Z0JBQ3BCLG1FQUFtRTtnQkFDbkUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFO29CQUNqQixjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtnQkFDbkMsQ0FBQyxDQUFDLENBQUE7WUFDSixDQUFDO2lCQUFNLENBQUM7Z0JBQ04saUVBQWlFO2dCQUNqRSxjQUFjLENBQUMsaUJBQWlCLENBQUMsQ0FBQTtZQUNuQyxDQUFDO1FBQ0gsQ0FBQyxDQUFBO1FBRUQsT0FBTyxJQUFJLG1CQUFtQixDQUFDLE1BQU0sQ0FBQyxDQUFBO0lBQ3hDLENBQUM7SUFDRCxJQUFJLEVBQUUsU0FBUztDQUNoQixDQUFBO0FBRUQsZUFBZSxNQUFNLENBQUEiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBFcnJvckhhbmRsZXIsIEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJ1xyXG5pbXBvcnQgQnVnc25hZywgeyBDbGllbnQsIFBsdWdpbiB9IGZyb20gJ0BidWdzbmFnL2pzJ1xyXG5cclxuLy8gYW5ndWxhciB1c2VzIHpvbmVzIHRvIHdhdGNoIGZvciBjaGFuZ2VzIGluIGFzeW5jaHJvbm91cyB0YXNrcyBzbyBpdCBjYW5cclxuLy8gdXBkYXRlIHRoZSBVSSBpbiByZXNwb25zZVxyXG4vLyBCdWdzbmFnIHVzZXMgYSBsb3Qgb2YgYXN5bmNocm9ub3VzIHRhc2tzIHdoZW4gbm90aWZ5aW5nLCB3aGljaCB0cmlnZ2VyIGNoYW5nZVxyXG4vLyBkZXRlY3Rpb24gbXVsdGlwbGUgdGltZXMuIFRoaXMgY2F1c2VzIGEgcG90ZW50aWFsIHBlcmZvcm1hbmNlIHByb2JsZW0sIHNvIHdlXHJcbi8vIG5lZWQgdG8gcnVuIGBub3RpZnlgIG91dHNpZGUgb2YgdGhlIGN1cnJlbnQgem9uZSBpZiB6b25lcyBhcmUgYmVpbmcgdXNlZFxyXG4vLyBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL3pvbmVcclxuZGVjbGFyZSBjb25zdCBab25lOiBhbnlcclxuXHJcbi8vIHpvbmVzIGFyZSBvcHRpb25hbCwgc28gd2UgbmVlZCB0byBkZXRlY3QgaWYgdGhleSBhcmUgYmVpbmcgdXNlZFxyXG4vLyBzZWUgaHR0cHM6Ly9hbmd1bGFyLmlvL2d1aWRlL3pvbmUjbm9vcHpvbmVcclxuY29uc3QgaXNOZ1pvbmVFbmFibGVkID0gdHlwZW9mIFpvbmUgIT09ICd1bmRlZmluZWQnICYmICEhWm9uZS5jdXJyZW50XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBCdWdzbmFnRXJyb3JIYW5kbGVyIGV4dGVuZHMgRXJyb3JIYW5kbGVyIHtcclxuICBwdWJsaWMgYnVnc25hZ0NsaWVudDogQ2xpZW50O1xyXG4gIGNvbnN0cnVjdG9yIChjbGllbnQ/OiBDbGllbnQpIHtcclxuICAgIHN1cGVyKClcclxuICAgIGlmIChjbGllbnQpIHtcclxuICAgICAgdGhpcy5idWdzbmFnQ2xpZW50ID0gY2xpZW50XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICB0aGlzLmJ1Z3NuYWdDbGllbnQgPSAoKEJ1Z3NuYWcgYXMgYW55KS5fY2xpZW50IGFzIENsaWVudClcclxuICAgIH1cclxuICB9XHJcblxyXG4gIHB1YmxpYyBoYW5kbGVFcnJvciAoZXJyb3I6IGFueSk6IHZvaWQge1xyXG4gICAgY29uc3QgaGFuZGxlZFN0YXRlID0ge1xyXG4gICAgICBzZXZlcml0eTogJ2Vycm9yJyxcclxuICAgICAgc2V2ZXJpdHlSZWFzb246IHsgdHlwZTogJ3VuaGFuZGxlZEV4Y2VwdGlvbicgfSxcclxuICAgICAgdW5oYW5kbGVkOiB0cnVlXHJcbiAgICB9XHJcblxyXG4gICAgY29uc3QgZXZlbnQgPSB0aGlzLmJ1Z3NuYWdDbGllbnQuRXZlbnQuY3JlYXRlKFxyXG4gICAgICBlcnJvcixcclxuICAgICAgdHJ1ZSxcclxuICAgICAgaGFuZGxlZFN0YXRlLFxyXG4gICAgICAnYW5ndWxhciBlcnJvciBoYW5kbGVyJyxcclxuICAgICAgMVxyXG4gICAgKVxyXG5cclxuICAgIGlmIChlcnJvci5uZ0RlYnVnQ29udGV4dCkge1xyXG4gICAgICBldmVudC5hZGRNZXRhZGF0YSgnYW5ndWxhcicsIHtcclxuICAgICAgICBjb21wb25lbnQ6IGVycm9yLm5nRGVidWdDb250ZXh0LmNvbXBvbmVudCxcclxuICAgICAgICBjb250ZXh0OiBlcnJvci5uZ0RlYnVnQ29udGV4dC5jb250ZXh0XHJcbiAgICAgIH0pXHJcbiAgICB9XHJcblxyXG4gICAgdGhpcy5idWdzbmFnQ2xpZW50Ll9ub3RpZnkoZXZlbnQpXHJcbiAgICBFcnJvckhhbmRsZXIucHJvdG90eXBlLmhhbmRsZUVycm9yLmNhbGwodGhpcywgZXJyb3IpXHJcbiAgfVxyXG59XHJcblxyXG5jb25zdCBwbHVnaW46IFBsdWdpbiA9IHtcclxuICBsb2FkOiAoY2xpZW50OiBDbGllbnQpOiBFcnJvckhhbmRsZXIgPT4ge1xyXG4gICAgY29uc3Qgb3JpZ2luYWxOb3RpZnkgPSBjbGllbnQuX25vdGlmeVxyXG5cclxuICAgIGNsaWVudC5fbm90aWZ5ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgICBjb25zdCBvcmlnaW5hbEFyZ3VtZW50cyA9IGFyZ3VtZW50cyBhcyBhbnlcclxuICAgICAgaWYgKGlzTmdab25lRW5hYmxlZCkge1xyXG4gICAgICAgIC8vIHJ1biBub3RpZnkgaW4gdGhlIHJvb3Qgem9uZSB0byBhdm9pZCB0cmlnZ2VyaW5nIGNoYW5nZSBkZXRlY3Rpb25cclxuICAgICAgICBab25lLnJvb3QucnVuKCgpID0+IHtcclxuICAgICAgICAgIG9yaWdpbmFsTm90aWZ5KG9yaWdpbmFsQXJndW1lbnRzKVxyXG4gICAgICAgIH0pXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgLy8gaWYgem9uZXMgYXJlIG5vdCBlbmFibGVkLCBjaGFuZ2UgZGV0ZWN0aW9uIHdpbGwgbm90IHJ1biBhbnl3YXlcclxuICAgICAgICBvcmlnaW5hbE5vdGlmeShvcmlnaW5hbEFyZ3VtZW50cylcclxuICAgICAgfVxyXG4gICAgfVxyXG5cclxuICAgIHJldHVybiBuZXcgQnVnc25hZ0Vycm9ySGFuZGxlcihjbGllbnQpXHJcbiAgfSxcclxuICBuYW1lOiAnQW5ndWxhcidcclxufVxyXG5cclxuZXhwb3J0IGRlZmF1bHQgcGx1Z2luXHJcbiJdfQ==