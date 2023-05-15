const cart = [];

const handleCart = (state = cart, action) =>{
    const product = action.payload;
    switch (action.type) {
        case "ADDITEM":
            // return [
            //     ...state,
            //     action.payload
            // ]
            const exist = state.find((evt)=> evt.id === product.id)
            if(exist){
                return state.map((evt)=>
                     evt.id === product.id ? {...evt, qty: evt.qty + 1 } : evt
                )
            }
            else {
                const product = action.payload;
                return [
                    ...state,
                    {
                        ...product,
                        qty: 1,
                    }
                ]
            }

            case "DELETEITEM":
                const exist1 = state.find((evt)=> evt.id === product.id);
                if(exist1.qty === 1){
                    return state.filter((evt)=>
                        evt.id !== exist1.id
                    );
                } else {

                    return state.map((evt)=>
                        evt.id === product.id ? {...evt, qty: evt.qty - 1} : evt
                    );
                }

            case "DELETEPRODUCT":
                    const exist2 = state.find((evt)=> evt.id === product.id);
                        return state.filter((evt)=>
                            evt.id !== exist2.id
                        );
                   
                  default:
                       return state;
    }
};

export default handleCart;