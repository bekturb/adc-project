import React from 'react';
import "./hour-glass.scss"

const HourGlass = () => {
    return (
        <span className="hour-glass">
            <ion-icon style={{animation: 'rotate 2s infinite linear'}}
                      name="hourglass-outline">
            </ion-icon>
        </span>
    );
};

export default HourGlass;