import Runtime from '../config/Runtime';

let subLogsHandler = null;
export const subLogs = () => (dispatch) => {
    if (subLogsHandler) return;
    subLogsHandler = (payload) => { dispatch({ type: 'LOGS_PAYLOAD', payload }) }
    Runtime.wsClient.subscribe('/sub/log', subLogsHandler);
}
export const unsubLogs = () => (/*dispatch*/) => {
    Runtime.wsClient.unsubscribe('/sub/log', subLogsHandler);
    subLogsHandler = null;
}

let subSettingsHandler = null;
export const subSettings = () => (dispatch) => {
    if (subSettingsHandler) return;
    subSettingsHandler = (payload) => { dispatch({ type: 'SETTINGS_PAYLOAD', payload }) }
    Runtime.wsClient.subscribe('/sub/settings', subSettingsHandler);
}
export const unsubSettings = () => (/*dispatch*/) => {
    Runtime.wsClient.unsubscribe('/sub/settings', subSettingsHandler);
    subSettingsHandler = null;
}

let subStatusHandler = null;
export const subStatus = () => (dispatch) => {
    if (subStatusHandler) return;
    subStatusHandler = (payload) => { dispatch({ type: 'STATUS_PAYLOAD', payload }) }
    Runtime.wsClient.subscribe('/sub/status', subStatusHandler);
}
export const unsubStatus = () => (/*dispatch*/) => {
    Runtime.wsClient.unsubscribe('/sub/status', subSettingsHandler);
    subSettingsHandler = null;
}