import { combineReducers } from 'redux';
import { allRoomsReducer, newRoomReducer, roomDetailsReducer, roomReducer } from './roomReducers';

const reducers = combineReducers({
    allRooms: allRoomsReducer,
    newRoom: newRoomReducer,
    roomDetails: roomDetailsReducer,
    room: roomReducer,
});

export default reducers;