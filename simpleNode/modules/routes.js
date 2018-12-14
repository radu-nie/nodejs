"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});

const tsoa = require("tsoa");


//app.use('/api/search-user', routes.searchUserRouting);

export function RegisterRoutes(app) {
    app.get('/api/search-user', (req, res, next) => {


        const controller = new scheduleController.ScheduleController();
        const promise = controller.createAppointment.apply(controller, validateArgs);
        promiseHandler(controller, promise, res, next);
    });

    function promiseHandler(controllerObj, promise, response, next) {
        return Promise.resolve(promise)
            .then(data => {
                let statusCode;
                if (controllerObj instanceof tsoa.Controller) {
                    const controller = controllerObj;
                    const headers = controller.getHeaders();
                    Object.keys(headers).forEach(name => {
                        response.set(name, headers[name]);
                    });
                    statusCode = controller.getStatus();
                }
                if (data) {
                    response.status(statusCode || 200).json(data);
                } else {
                    response.status(statusCode || 204).end();
                }
            })
            .catch(error => next(error));
    }
}

exports.RegisterRoutes = RegisterRoutes();