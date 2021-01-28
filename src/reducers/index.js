import {combineReducers} from 'redux'
let trainings=[{
    name:"nani",
    age:24
}]


    const trainingData=(state=trainings,action)=>{
        switch(action.type){
            case "add":
                let st=state;
                st.push(action.payload)
                return st;
            case "init":
                return action.payload
            default:
                return state;
        }
    }



const allreducer=combineReducers({
    trainingData:trainingData
})

export default allreducer

