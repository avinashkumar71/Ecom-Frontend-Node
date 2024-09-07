export default function reducer(state, action) {
    switch (action.type) {
      case "increase":
        return [...state,action.product]
        
      case "decrease":
        for(let x in state){
          if(state[x]['_id'] === action.product['_id']){
              if (x >= -1) {
              state.splice(x,1);
              return [...state]
          }
      }
  } 
      default:
        return "Unrecognized command";
    }
  }