// Pull together all routes from the different pages of your application.
import investmensAnalysisRoutes from './investment-analysis/routes';
import knowledgeCenterRoutes from './knowledge-center/routes'; // same as ./auth/routes/index.js
import dashboardRoutes from './dashboard/routes';

export default [
  ...investmensAnalysisRoutes,
  ...knowledgeCenterRoutes,
  ...dashboardRoutes,
];

// the router looks for a match from the beginning to the end. Adding the error
// routes at the beginning would render 404 every time.
