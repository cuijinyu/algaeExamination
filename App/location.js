import React from 'react';
import Geolocation from 'Geolocation';
import moment from 'moment';

export default class geolocation{
    getLocation(){
        return new Promise ((resolve, reject) => {
            let result = {};
            let timer = setInterval(() => {
                if (!result.hasOwnProperty('time')) {
                    return false;
                }
            }, 5000);
            Geolocation.getCurrentPosition(location=>{
                    result['longitude'] = location.coords.longitude;
                    result['latitude'] = location.coords.latitude;
                    result['altitude'] = location.coords.altitude;
                    result['time'] = moment().format('YYYY MMMM Do, h:mm:ss a');
                    clearInterval(timer);
                    resolve(result);
                },
                error => {
                    reject(error);
            });
        })
    }
}