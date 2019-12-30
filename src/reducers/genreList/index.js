export default (state = [], action)=>{
  switch (action.type) {
    case 'GENRE_LIST':
      return action.payload
    default:
      return state;
  };
};