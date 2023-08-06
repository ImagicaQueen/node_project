const [i2,...rest]= [1,3,45,6]
// console.log(i2)
// console.log(rest)

const {name,age,...rest2}  = {"name":"anurag","age":22,"gender":"male"}

const obj1={
    name:"Jira",
    product:"atlassian"
}
obj1.product="Google";
const obj2={
   name:"Zoho0",
   product:obj1.product 
}
obj1.product='Hifi'
const obj3={
   name:"FreshTeam",
   product:obj2.product 
}
console.log(obj3.product,"What they give")


const array1=["Ajay","Vijay","Anurag","Shiv","Piyush"]
for(let i=0;i<array1.length;i++){


    
 array1.splice(0,array1.length)
}
console.log(array1,"array1")

const array2=array1.map(v=>v).splice(0,array1.length)


console.log(array2,"array2")
// console.log(`${name}  ,  ${age}` , rest2)

const fun =() => {
return {"name":"anurag","age":22, "relation":"myBf"}
}
// console.log(fun(),"What they give")

const {relation} =fun()
console.log(relation)


