import React from 'react';
import loadable from '@loadable/component';
import PageLoading from './components/PageLoading';

export const Tools = loadable(() => import('./components/tools/Tools'), {
  fallback: <PageLoading />
});

export const CompoundInterest = loadable(() => import('./components/tools/CompoundInterest'), {
  fallback: <PageLoading />
});