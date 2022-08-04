
const data=['panneer','thanneer','kanneeer','selvam','gotham','batman'];

// let res = ['lo', 'He'].some(word => string.startsWith(word));
data.forEach((d)=>{
    if(['er', 'an'].some(word => d.endsWith(word))){
        console.log(d)
    }
})