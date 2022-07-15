
const Model={
  
  GetData(url){
      
    return fetch(url)

  },

  AddData(url,data){
    console.log(data)
    return fetch(url,{
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)}
    )
  },

  DeleteData(url,id){

    return fetch(url+id,{method: 'DELETE'})
  } 

}

const Controller=(Model,View)=>{
  
  baseUrl = 'http://localhost:4232/todos/'
  Model.GetData(baseUrl).then((response)=>{return response.json()}).then((data)=>{View.render(data.reverse())})
  
  View.Add.addEventListener('click',function(){
    if(View.New_Item.value.trim().length<6){alert('You have to enter 6 letter or more')}
    else{
      Model.AddData(baseUrl,{
        "userId": 1,
        "title":View.New_Item.value,
        "completed": false
      }).then(window.location.reload())
    }
  })
  
}


const View = {

  List:document.querySelector("#list"),
    
  Id_Selection:document.querySelector("#Id_Selection"),

  New_Item:document.querySelector("#New_Item"),

  Add:document.querySelector("#Add"),


  render(data){
    
    for (d of data){
      console.log(d.title)

        let Item = document.createElement('div')
        Item.classList="item"
        let id_num=document.createElement('i')
        id_num.classList="item_number"
        id_num.innerText=d.id
        Item.appendChild(id_num)
        let title=document.createElement('h1')
        title.classList="title"
        title.innerText=d.title
        Item.appendChild(title)
        Item.appendChild(id_num)
        let delete_button = document.createElement('button')
        delete_button.innerText = 'X'
        delete_button.setAttribute("data_id",d.id)
        delete_button.classList = 'delete_button'
        delete_button.addEventListener('click',function(){
          console.log(this.getAttribute('data_id'))
          Model.DeleteData(baseUrl,this.getAttribute('data_id')).then((response)=>{return response.json()}).then(window.location.reload())
        })
        Item.appendChild(delete_button)
        this.List.appendChild(Item)

    }
  }
}

Controller(Model,View)
