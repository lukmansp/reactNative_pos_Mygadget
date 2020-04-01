const initialState = {
  isAuthenticated: false,
  profile: {},
};

export default function(state = initialState, action) {
  switch (action.type) {
    case 'LOGIN_USER_PENDING':
      console.log('ini reducers');
      return {
        ...state,
        isAuthenticated: false,
        profile: {},
      };
    case 'LOGIN_USER_REJECTED':
      return {
        ...state,
        isAuthenticated: false,
        profile: {},
      };
    case 'LOGIN_USER_FULFILLED':
      console.log(action.payload);
      return {
        ...state,
        isAuthenticated: true,
        profile: action.payload.data,
      };
    case 'POST_USER_FULFILLED':
      const newDataUser = [...state.profile, action.payload.data.result];
      return {
        ...state,
        profile: newDataUser,
      };
    case 'POST_USER_PENDING':
      return {
        ...state,
      };
    case 'POST_USER_REJECTED':
      return {
        ...state,
      };

    case 'LOGOUT_USER':
      return {
        ...state,
        isAuthenticated: false,
        profile: {},
      };
    default:
      return state;
  }
}
