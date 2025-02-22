let botao = document.querySelector('#listaUsuarios');
let lista_dinamica = document.querySelector('#lista_de_usuarios');
let main = document.querySelector('#main');
let botaoExcluirUser = document.querySelector('#botaoExcluirUser');
let id_user_edicao = NaN;
let id_recurso_edicao = NaN;

// --------------- Fetch usuarios -------------------
async function listaDeUsuarios() {
    let lista_usuarios = NaN;
    await fetch('http://127.0.0.1:5000/home/listaUsuarios')
    .then((res)=> res.json())
    .then((dados) => lista_usuarios = dados)
    .catch((e)=> console.error(e));

    return lista_usuarios;
}

async function excluirUser(id) {
    let messagem = '';
    await fetch(`http://127.0.0.1:5000/home/excluirUser/${id}`, {
        method:'DELETE',
        headers:{ 'Content-Type': 'application/json' }
    })
    .then((res)=> res.json())
    .then((dados)=> messagem = dados.message)
    .catch((e)=> console.error(e));
    return messagem;
}

async function editarUser(id, nome, nivelAcesso) {
    let message = ''
    await fetch(`http://127.0.0.1:5000/home/editarUser/${id}`,{
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            'nome': `${nome}`,
            'nivelAcesso': `${nivelAcesso}`
        })
    }).then((res)=> res.json())
    .then((dados)=> message = dados.message)
    return message
}
// ------------ Fetch Recursos ------------------
async function listaDeRecursos() {
    let lista_recursos = NaN;
     await fetch('http://127.0.0.1:5000/home/listaRecursos/0')
     .then((res) => res.json())
     .then((dados) => lista_recursos = dados)
     .catch((e)=> alert(e));
    
    return lista_recursos;
}

async function cadastrarRecurso(nome, tipo, status) {
    let message = {};
    await fetch('http://127.0.0.1:5000/home/listaRecursos/0', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify({
            nome: nome,
            tipo: tipo,
            status: status
        })
    }).then((res)=>res.json())
    .then((dados)=> message = dados)
    .catch((e)=>console.error(e));

    return message;
}

async function editarStatusRecurso(id, novo_status) {
    let message = {};
    await fetch(`http://127.0.0.1:5000/home/listaRecursos/${id}`, {
        method:'PUT',
        headers:{'Content-Type': 'application/json'},
        body: JSON.stringify({
            status: novo_status
        })
    }).then((res)=> res.json())
    .then((dados)=> message=dados)
    .catch((e)=> console.error(e));

    return message;
}

async function excluirRecurso(id) {
    let message = {};
    await fetch(`http://127.0.0.1:5000/home/listaRecursos/${id}`, {
        method:'DELETE',
        headers:{'Content-Type':'application/json'}
    }).then((res)=> res.json())
    .then((dados)=> message=dados)
    .catch((e)=>console.error(e));

    return message;
}

// -------- FUNCAO E HTML DAHSBOARD ------------------------
async function exibirDashboard() {
    let message = {};
    await fetch('http://127.0.0.1:5000/home/dashboard')
    .then((res)=> res.json())
    .then((dados)=> message = dados)
    .catch((e)=> console.error(e));

    return message;
}
// ----------------- Pagina USUARIO HTML ------------------
async function listaUsers(){
    let lista_usuarios = await listaDeUsuarios();
    let usuarios = lista_usuarios.map((e)=>{
        return `
            <tr>
                <td>${e.nome}</td>
                <td>${e.nivelAcesso}</td>
                <td><button id="botaoEditarUser" value="${e.id}">Editar</button>
                <button id="botaoExcluirUser" value="${e.id}">Excluir</button></td>
            </tr>
        `;
    }).join("");
    let elemento_html_usuarios = `
        <h2>Lista de funcionarios</h2>
          <div class="formulario_edicao"></div>
          <div class="table-responsive">
            <table class="table table-striped table-sm">
              <thead>
                <tr>
                  <th scope="col">Nome</th>
                  <th scope="col">Nivel de acesso</th>
                  <th scope="col"></th>
                </tr>
              </thead>
              <tbody>
    `;
    elemento_html_usuarios += usuarios;
    elemento_html_usuarios += `
                </tbody>
            </table>
          </div>
          `;
    return elemento_html_usuarios;
}

let elemento_html_modal_user = () => {
    return `
   <!-- Modal edição de usuario-->
               <form>
                   <button id="fechar_modal">X</button>
                   <label for="">Nome: </label>
                   <input type="text" name="novo_nome_usuario" id="novo_nome_usuario" required>
                   <select name="option" id="novo_nivelAcesso" required>
                   <option value="" disabled="" selected="">Escolha o nivel</option>
                   <option value="funcionario">funcionarios</option>
                   <option value="gerente">gerente</option>
                   <option value="administrador" >administrador</option>
                   </select>
                   <button id="botao_atualizar_user">Atualizar</button>
               </form>
               <!-- Fim do modal -->
`;
}

// ------------------ Pagina RECURSOS HTML --------------------
async function listaRecursos() {
    let lista_recursos = await listaDeRecursos();
    let recursos = lista_recursos.map((e) => {
        return `
            <tr>
                <td>${e.nome}</td>
                <td>${e.tipo}</td>
                <td>${e.status}</td> 
                <td><button id="botaoEditarRecurso" value="${e.id}">Atualizar status</button>
                <button id="botaoExcluirRecurso" value="${e.id}">Excluir</button></td>
            </tr>
        `;
    }).join(" ");

    console.log(lista_recursos.message)
    let elemento_html_recursos = `
        <div class="formulario_recursos">
            <!-- Modal recurso -->
            <div class="formulario_edicao_recurso esconder">
                <fieldset>
                <legend>Status do recurso</legend>
                <form>
                    <button id="fechar_formulario_edicao_recurso">X</button>
                    <select name="" id="selecao_novo_status">
                    <option value="" disabled="" selected=""> ---  Selecione --- </option>
                    <option value="Disponivel">Disponivel</option>
                    <option value="Não disponivel">Não disponivel</option>
                    <option value="Em manutenção">Em manutenção</option>
                    <option value="Inoperante">Inoperante</option>
                    </select>
                    <button id="botao_edicao_status">Atualizar</button>
                </form>
                </fieldset>
            </div>
            <!-- Fim do modal -->
            <fieldset >
              <legend>Cadastro de recursos</legend>
              <form>
                <div class="nome_tipo">
                  <label for="">Nome:</label>
                  <input id="novo_nome_recurso" type="text">
                  <label for="">Tipo:</label>
                  <input id="novo_tipo_recurso" type="text">
                </div>
                <div class="status_botao">
                  <label for="">Status de recurso:</label>
                  <select name="status" id="novo_status_recurso">
                    <option value="" disabled="" selected=""> ---  Selecione --- </option>
                    <option value="Disponivel">Disponivel</option>
                    <option value="Não disponivel">Não disponivel</option>
                    <option value="Em manutenção">Em manutenção</option>
                    <option value="Inoperante">Inoperante</option>
                  </select>
                  <button id="botao_cadastrar">Cadastrar</button>
                </div>
              </form>
            </fieldset>
        </div>
        <h2>Lista de recursos</h2>
        <div class="table-responsive">
            <table class="table table-striped table-sm">
            <thead>
                <tr>
                <th scope="col">Nome</th>
                <th scope="col">Nivel de acesso</th>
                <th scope="col"></th>
                </tr>
            </thead>
            <tbody>
        `;
    elemento_html_recursos += recursos;
    elemento_html_recursos += `
                </tbody>
            </table>
          </div>
          `;
    return elemento_html_recursos;
}

let elemento_html_modal_recurso = `
    <div class="formulario_edicao_recurso">
        <fieldset>
            <legend>Status</legend>
            <form>
                <button id="fechar_formulario_edicao_recurso">X</button>
                <select name="" id="selecao_novo_status">
                    <option value="" disabled="" selected=""> ---  Selecione --- </option>
                    <option value="Disponivel">Disponivel</option>
                    <option value="Não disponivel">Não disponivel</option>
                    <option value="Em manutenção">Em manutenção</option>
                    <option value="Inoperante">Inoperante</option>
                </select>
                <button id="botao_edicao_status">Atualizar</button>
            </form>
        </fieldset>
        </div>
`;
// ------------------ Pagina DASHBOARD HTML --------------------

let elemento_html_dasoboard =
    `
        <div class="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
            <h1 class="h2">Status dos recursos da empresa</h1>
        </div>
          
        <canvas id="myChart">Seu navegador não suporte a renderização do grafico.</canvas>
        
    `;

// EVENTOS DE CLICK'S DO HTML
document.addEventListener('click', async(e)=>{
    // Funcoes de usuarios
    if(e.target.id == 'customers'){
        main.innerHTML = '';
        main.innerHTML = await listaUsers();
    } else if(e.target.id == 'botaoExcluirUser'){
        let msg = await excluirUser(e.target.value);
        main.innerHTML = await listaUsers();
        alert(msg);
    } else if(e.target.id == 'botaoEditarUser'){
        id_user_edicao = e.target.value;
        let modalContainer = document.querySelector('.formulario_edicao');
        modalContainer.innerHTML = elemento_html_modal_user(e.target.value);
        modalContainer.classList.add('mostrar');
    } else if(e.target.id == 'fechar_modal'){
        e.preventDefault();
        let modalContainer = document.querySelector('.formulario_edicao');
        modalContainer.classList.remove('mostrar');
        modalContainer.style = {'display': 'none'};
    } else if(e.target.id == 'botao_atualizar_user'){
        let modalContainer = document.querySelector('.formulario_edicao');
        let nomeNovo = document.querySelector('#novo_nome_usuario').value;
        let nivelAcessoNovo = document.querySelector('#novo_nivelAcesso').value;

        let message = await editarUser(id_user_edicao, nomeNovo, nivelAcessoNovo);
        modalContainer.classList.remove('mostrar');
        modalContainer.style = {'display': 'none'};

        alert(message);
        main.innerHTML = await listaUsers();
    // Funcoes de recursos
    } else if(e.target.id == 'recursos'){
        main.innerHTML = '';
        main.innerHTML = await listaRecursos();
    } else if(e.target.id == 'botao_cadastrar'){
        e.preventDefault();
        let nome = document.querySelector('#novo_nome_recurso').value;
        let tipo = document.querySelector('#novo_tipo_recurso').value;
        let status = document.querySelector('#novo_status_recurso').value;
        let message = await cadastrarRecurso(nome, tipo, status);

        alert(message.message);
        main.innerHTML = await listaRecursos();

    } else if(e.target.id == 'botaoEditarRecurso'){
        let modal = document.querySelector('.formulario_edicao_recurso');
        id_recurso_edicao = e.target.value;
        modal.classList.remove('esconder'); 

    } else if(e.target.id == 'fechar_formulario_edicao_recurso'){
        let modal = document.querySelector('.formulario_edicao_recurso');
        modal.classList.add('esconder');
        
        
    }else if(e.target.id == 'botao_edicao_status'){
        let status = document.querySelector('#selecao_novo_status').value;
        let message = await editarStatusRecurso(id_recurso_edicao, status);

        alert(message.message);
        main.innerHTML = await listaRecursos();

    }else if(e.target.id == 'botaoExcluirRecurso'){
        let message = await excluirRecurso(e.target.value);

        alert(message.message);
        main.innerHTML = await listaRecursos()
    // Funcoes Dashboard
    } else if(e.target.id == 'dashboard'){
        let message = await exibirDashboard();
        main.innerHTML = '';
        main.innerHTML = elemento_html_dasoboard;

        const ctx = document.getElementById('myChart');
            
        new Chart(ctx, {
            type: 'doughnut',
            data: {
            datasets: [{
                data: [message.quant_disponivel, message.quant_nao_disponivel, message.quant_em_manutencao, message.quant_inoperante    ]
            }],
            labels: [
                'Disponivel',
                'Não disponivel',
                'Em manutenção',
                'Inoperante'
            ]
        }
        });
    }
})