import {exec} from 'child_process';

export let restartWebsite = function(){
    exec('pm2 restart all', (error, stdout, stderr) => {
        if (error){
            console.error(error);
            throw error; // Anyway, I want to restart.
        }
    })
}
