interface MyBase {
    name: string;  
    age: number;
    gender?:string;
  }
  
  interface MyInterface<T extends MyBase> {
    base: T; 
    property:Array< keyof T>; // should be: "string" but only properties from T
  }
  
  const myFunc = <T extends MyBase>(item: MyInterface<T>) => {
      // console.clear();
      var temp:any={};
      item.property.forEach((key)=>{
  
      Object.assign(temp,{[key]:item.base[key]})
      })
      console.log(temp);
    return temp
  };
  
  type Keys = (keyof MyBase)[]
//   const a = { [K in keyof Required<Foo>]: K }={}
const v = keyof Person[]

  let t: MyInterface<MyBase> = {
    base: { name: "Chris",age: 30 ,gender:'male'},
  //   age: 30,
    property: ["name","age"],
  };
  console.log(myFunc(t));




  ----------------------
  interface MyBase {
    name: string;  
    age: number;
    gender?:string;
  }
  
  interface MyInterface<T extends MyBase> {
    base: T; 
    property:Array< keyof T>; // should be: "string" but only properties from T
  }
  
  const myFunc = <T extends MyBase>(item: MyInterface<T>) => {
      // console.clear();
      var temp:any={};
      item.property.forEach((key)=>{
  
      Object.assign(temp,{[key]:item.base[key]})
      })
      console.log(temp);
    return temp
  };
  // const a:any =  keyof MyBase: any;
  // const keys = Object.keys(MyBase);
  
    type Keys = (keyof MyBase)[]
  let t: MyInterface<MyBase> = {
    base: { name: "Chris",age: 30 ,gender:'male'},
  //   age: 30,
    property: [MyBase],
  };
  console.log(myFunc(t));