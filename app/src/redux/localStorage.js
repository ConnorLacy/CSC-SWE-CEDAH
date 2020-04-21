export const loadState = () => {
    try{
        const serializedState = localStorage.getItem('state')
        console.log('Loading state')
        if(serializedState === null){
            return undefined;
        }
        return JSON.parse(serializedState)
    } catch (err) {
        console.log("something went wrong loading state")
        return undefined;
    }
};

export const saveState = (state) => {
    try{
        console.log('Saving state: ', state)
        const serializedState = JSON.stringify(state)
        localStorage.setItem('state', serializedState);
    } catch(err){
        console.log("something went wrong saving state")
        // Ignore write errors
    }
};