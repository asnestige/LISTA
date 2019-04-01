const Lista = require('./index')

const lista = new Lista({baseURL: "http://localhost:9000"})




lista.pollListItems(({listId: 75}), (res,err)=> {
  console.log(res)
})

//lista.checkItem({itemId: 17, checkedBy: "asnestige@gmail.com"})
//.then(res=>console.log(res))
//.catch(err=>console.log("Err:" + err))

