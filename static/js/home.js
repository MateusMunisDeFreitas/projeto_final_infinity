let botao = document.querySelector('#listaUsuarios');
let lista_dinamica = document.querySelector('#lista_de_usuarios');
let main = document.querySelector('#main');
let botaoExcluirUser = document.querySelector('#botaoExcluirUser');
let modalEdicaoUser = document.querySelector('.formulario_edicao');

let lista_usuarios = NaN;

let elemento_html_modal = `
    
`;

async function listar_de_usuarios() {
    await fetch('http://127.0.0.1:5000/home/listaUsuarios')
    .then((res)=> res.json())
    .then((dados) => lista_usuarios = dados)
    .catch((e)=> console.error(e));
}

async function excluirUser(id) {
    let messagem = '';
    await fetch(`http://127.0.0.1:5000/home/excluirUser/${id}`, {
        method:'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then((res)=> res.json())
    .then((dados)=> messagem = dados.message)
    .catch((e)=> console.error(e));
    return messagem;
}

async function teste(){
    await listar_de_usuarios();
    let usuarios = lista_usuarios.map((e)=>{
        return `
            <tr>
                <td>${e.id}</td>
                <td>${e.nome}</td>
                <td>${e.nivelAcesso}</td>
                <td><button id="botaoEditarUser" value="${e.id}">Editar</button>
                <button id="botaoExcluirUser" value="${e.id}">Excluir</button></td>
            </tr>
        `
    }).join("");
    let elemento_html = `
        <!-- Modal edição de usuario-->
           <div class="formulario_edicao" style="display: none;">
              <form action="" class="">
                <label for="">Nome: </label>
                <input type="text" name="novo_nome_usuario">
                <select name="option">
                  <option value="" disabled="" selected="">Escolha o nivel</option>
                  <option value="funcionario">funcionarios</option>
                  <option value="gerente">gerente</option>
                  <option value="administrador" >administrador</option>
                </select>
                <button type="submit">Atualizar</button>
              </form>
           </div>
        <!-- Fim do modal -->
        <h2>Lista de funcionarios</h2>
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">Id</th>
                  <th scope="col">Nome</th>
                  <th scope="col">Nivel de acesso</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
    `;
    elemento_html += usuarios;
    elemento_html += `
                </tbody>
            </table>
          </div>
          `;
    return elemento_html;
}

document.addEventListener('click', async(e)=>{
    if(e.target.id == 'customers'){
        main.innerHTML = '';
        main.innerHTML =await teste();
    }
    else if(e.target.id == 'products'){
        return''
    } else if(e.target.id == 'botaoExcluirUser'){
        let msg = await excluirUser(e.target.value);
        main.innerHTML =await teste();
        alert(msg);
    } else if(e.target.id == 'botaoEdicaoUser'){

    }
})