import { NOT_PARTICIPANT, PARTICIPANT } from "../actions/types";

const initialState = {
    isParticipant:false
};

// eslint-disable-next-line
export default function(state=initialState,action) {
    switch (action.type) {
        case PARTICIPANT:
            return {
                ...state,
                isParticipant:action.payload
            }
        case NOT_PARTICIPANT:
            return {
                ...state,
                isParticipant:action.payload
            }
        default:
            return state;
    }
}