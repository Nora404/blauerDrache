import React from 'react';
import { routes } from './routes';

const navigationMap: Record<string, React.LazyExoticComponent<React.ComponentType<any>>> = {};

routes.forEach((route) => {
  if (route.navigation) {
    navigationMap[route.path] = route.navigation;
  }
});

export default navigationMap;
