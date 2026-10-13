/**
 * Navari AI ? Conversation Context Service
 * Maintains local conversational state across follow-up queries.
 */
window.NavariAI_Context = (() => {
  let state = {
    history: [],
    currentTopic: null,
    activeProject: null,
    lastCategory: null,
    turnCount: 0
  };

  const update = (query, intent, details = {}) => {
    state.turnCount++;
    if (details.activeProject) {
      state.activeProject = details.activeProject;
    }
    if (details.currentTopic) {
      state.currentTopic = details.currentTopic;
    }
    if (details.lastCategory) {
      state.lastCategory = details.lastCategory;
    }
    state.history.push({
      turn: state.turnCount,
      query,
      intent,
      timestamp: Date.now()
    });
    // Keep last 15 turns in memory
    if (state.history.length > 15) {
      state.history.shift();
    }
  };

  const getActiveProject = () => state.activeProject;
  const setActiveProject = (project) => { state.activeProject = project; };
  const getCurrentTopic = () => state.currentTopic;
  const getTurnCount = () => state.turnCount;

  const clear = () => {
    state = {
      history: [],
      currentTopic: null,
      activeProject: null,
      lastCategory: null,
      turnCount: 0
    };
  };

  return {
    update,
    getActiveProject,
    setActiveProject,
    getCurrentTopic,
    getTurnCount,
    clear,
    getState: () => ({ ...state })
  };
})();
