export const addTrainer=data=>{
    return {type:"add",
    payload:data}
}
export const initiate=data=>{
    return {type:"init",
    payload:data}
}