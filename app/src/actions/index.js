import Runtime from '../config/Runtime';

let subLogsHandler = null;
export const subLogs = () => (dispatch) => {
    if (subLogsHandler) return;
    subLogsHandler = (payload) => { dispatch({ type: 'LOGS_PAYLOAD', payload }) }
    Runtime.wsClient.subscribe('/log', subLogsHandler);
}
export const unsubLogs = () => (/*dispatch*/) => {
    Runtime.wsClient.unsubscribe('/log', subLogsHandler);
    subLogsHandler = null;
}

let subSettingsHandler = null;
export const subSettings = () => (dispatch) => {
    if (subSettingsHandler) return;
    subSettingsHandler = (payload) => { dispatch({ type: 'SETTINGS_PAYLOAD', payload }) }
    Runtime.wsClient.subscribe('/settings', subSettingsHandler);
}
export const unsubSettings = () => (/*dispatch*/) => {
    Runtime.wsClient.unsubscribe('/settings', subSettingsHandler);
    subSettingsHandler = null;
}
