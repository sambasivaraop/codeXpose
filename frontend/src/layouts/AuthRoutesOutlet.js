import React from 'react';
import { Route } from 'react-router-dom';
import { authRoutes } from '../routes';

export const AuthRoutesOutlet = () => <div>
    {
        authRoutes.map((route, index) => <Route key={index} exact {...route} />)
    }
    </div>