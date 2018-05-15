import Vue from 'vue';

import InvestmentAnalysisSFC from './InvestmentAnalysisComponent.vue';
import FinancialStatementSFC from './FinancialStatement.vue';

export const InvestmentAnalysisComponent = Vue.component('investment-analysis', InvestmentAnalysisSFC);
export const FinancialStatement = Vue.component('financial-statement', FinancialStatementSFC);
