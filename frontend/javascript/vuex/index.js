import Vue from 'vue';
import Vuex from 'vuex';

import investmentAnalysisStore from '../features/investment-analysis/vuex';
// import knowledgeCenterStore from '../features/knowledge-center/vuex'

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    investmentAnalysis: investmentAnalysisStore,
    // knowledgeCenter: knowledgeCenterStore,
  },
});
