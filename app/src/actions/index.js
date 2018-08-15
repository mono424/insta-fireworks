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
