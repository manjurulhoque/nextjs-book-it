import { combineReducers } from 'redux';

import { allRoomsReducer, roomDetailsReducer, newReviewReducer, checkReviewReducer, newRoomReducer, roomReducer, roomReviewsReducer, reviewReducer } from './roomReducers'

import { authReducer, userReducer, loadedUserReducer, forgotPasswordReducer, userDetailsReducer } from './userReducers'

import { checkBookingReducer, bookedDatesReducer, bookingsReducer, bookingDetailsReducer, bookingReducer } from './bookingReducers'

const reducer = combineReducers({
    allRooms: allRoomsReducer,
    newRoom: newRoomReducer,
    roomDetails: roomDetailsReducer,
    room: roomReducer,
    auth: authReducer,
    user: userReducer,
    loadedUser: loadedUserReducer,
    forgotPassword: forgotPasswordReducer,
    checkBooking: checkBookingReducer,
    bookedDates: bookedDatesReducer,
    bookings: bookingsReducer,
    booking: bookingReducer,
    bookingDetails: bookingDetailsReducer,
    newReview: newReviewReducer,
    checkReview: checkReviewReducer,
    roomReviews: roomReviewsReducer,
    review: reviewReducer,
})

export default reducer