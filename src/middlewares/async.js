//helping w/ async actions

export default function({ dispatch }){
    return next => action => {
        //if the action does not have a payload or the payload does not have a
        // .then property we don't care about it, send it on
        if(!action.payload || !action.payload.then){
            return next(action)
        }
        //console.log("we have a promise", action);
        //Make sure the action's promise resolves (fetches our list of users)
        action.payload
            .then(res => {
                //create new action w/ old type but
                // replace the promise w/ the response data
                const newAction = {...action, payload: res}
                //send the newAction through the action flow from the top
                dispatch(newAction)
                console.log(newAction)
                //we won't hit the if statement the next time through b/c our payload is no longer a promise but is the data we're after
            });

        
    }
}