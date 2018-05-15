import { InvestmentAnalysisComponent } from '../components';

export default [
  {
    path: '/analysis',
    component: InvestmentAnalysisComponent,
    name: 'investmentAnalysis',
    meta: {
      needsAuth: true,
    },
  },
];
