let form = document.querySelector('form');

form.addEventListener('submit',()=>{
    fetch('http://127.0.0.1:5000/cadastrar')
    .then((res)=>res.json())
    .then((data)=> console.log(data.message))       
})
