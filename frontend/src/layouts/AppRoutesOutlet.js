import React from 'react';
import { Route } from 'react-router-dom';
import { appRoutes } from '../routes';

export const AppRoutesOutlet = () => <div>
    {
        appRoutes.map((route, index) => <Route key={index} {...route} />)
    }
    </div>