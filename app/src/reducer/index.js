const initialState = {
    settings: {},
    stats: null,
    logs: []
};
const rootReducer = (state = initialState, action) => {
    state = Object.assign({}, state);
    switch (action.type) {
        case "SETTINGS_PAYLOAD":
            state.settings = action.payload.payload;
        break;
        case "LOGS_PAYLOAD":
            // Update Logs Array
            let { type, payload } = action.payload;
            if (type === "complete") {
                state.logs = payload;
            } else {
                state.logs = payload.concat(state.logs) 
            }

            // Maybe update status
            if (type === "complete") {
                let status = payload
                    .filter(log => log.data.action === "status")
                    .sort((a, b) => (new Date(b.date).getTime() - new Date(a.date).getTime()))
                state.stats = status.length > 0 ? status[0].data.data  : null;
            } else if (payload.action === "status") {
                state.stats = payload.data.data;
            }        
        break;
    }
    return state;
};
export default rootReducer;