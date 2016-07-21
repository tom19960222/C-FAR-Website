"use strict";
const child_process_1 = require('child_process');
exports.restartWebsite = function () {
    child_process_1.exec('pm2 restart all', (error, stdout, stderr) => {
        if (error) {
            console.error(error);
            throw error;
        }
    });
};
