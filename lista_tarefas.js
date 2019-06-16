//organiza todo o layout do projeto e retorna esse projeto
function criar_projeto(nome_projeto)
{
    var node = document.createElement('div');
    node.setAttribute('id', nome_projeto);
    var h1 = document.createElement('h1');
    h1.appendChild(document.createTextNode(nome_projeto));
    node.appendChild(h1);

    var adicionar_tarefa = document.createElement('input');
    adicionar_tarefa.type = "text";
    adicionar_tarefa.placeholder = "Tarefa";
    adicionar_tarefa.setAttribute('id', nome_projeto+"_nometarefa");
    adicionar_tarefa_button = document.createElement('input');
    adicionar_tarefa_button.type = "button";
    adicionar_tarefa_button.value = "Adicionar Tarefa";
    adicionar_tarefa_button.setAttribute('onclick', 'adiciona_tarefa(this)');
    adicionar_tarefa_button.setAttribute('id', nome_projeto+"_adiciona");

    var lista_afazer = document.createElement('div');
    lista_afazer.setAttribute('id', nome_projeto+"_afazer");
    var afazer = document.createTextNode('A fazer');
    var lista_feito = document.createElement('div');
    lista_feito.setAttribute('id', nome_projeto+"_feito");
    var feito = document.createTextNode('Feito')

    node.appendChild(adicionar_tarefa);
    node.appendChild(adicionar_tarefa_button);

    node.appendChild(document.createElement('br'));
    temp = document.createElement('h3');
    temp.appendChild(afazer);
    node.appendChild(temp);
    node.appendChild(lista_afazer);
    node.appendChild(document.createElement('br'));
    temp = document.createElement('h3');
    temp.appendChild(feito);
    node.appendChild(temp);
    node.appendChild(lista_feito);
    node.appendChild(document.createElement('br'));
    node.appendChild(document.createElement('hr'));

    return node;
}

//adiciona o projeto na lista
function add_projeto(){
    var lista = document.getElementById("lista_tarefas");
    var nome_projeto = document.getElementById("nome_projeto").value;
    //limpa o campo de adicionar nome do projeto
    document.getElementById("nome_projeto").value = "";
    var test_id = document.getElementById(nome_projeto);

    //se o projeto já existe, ele não é criado. tem de ser nome unico
    if (test_id){
        alert("Um projeto com este nome já existe.");
        return NaN;
    };

    lista.appendChild(criar_projeto(nome_projeto));
}

//adiciona a tarefa na lista a fazer assumindo, por padrão, que ela não foi feita ainda
function adiciona_tarefa(elemento) {
    var projeto_id = elemento.parentNode.id;
    var lista_afazer = document.getElementById(projeto_id+"_afazer");
    var dados_tarefa = document.getElementById(projeto_id+"_nometarefa").value;
    document.getElementById(projeto_id+"_nometarefa").value = "";
    item = criar_item(dados_tarefa);
    lista_afazer.appendChild(item);
}

//cria um item de lista de tarefas e retorna esse item.
function criar_item (dados_tarefa)
{
    var item = document.createElement('li');
    var checkbox = document.createElement('input');
    checkbox.type = "checkbox";
    checkbox.setAttribute("onclick", 'mover_tarefa(this)');
    
    var text = document.createElement('label');
    text.innerText = dados_tarefa;

    var edit_text = document.createElement('input');
    edit_text.type = "text";

    var edit_button = document.createElement('input');
    edit_button.type = "button";
    edit_button.value = "Editar";
    edit_button.setAttribute('onclick', 'editar_tarefa(this)');

    var delete_button = document.createElement('input');
    delete_button.type = "button";
    delete_button.value = "X";
    delete_button.setAttribute("onclick", "excluir_tarefa(this)");

    item.appendChild(checkbox);
    item.appendChild(text);
    item.appendChild(edit_text);
    item.appendChild(edit_button);
    item.appendChild(delete_button);
    return item;
}

//só troca o valor dos elementos
function editar_tarefa(elemento){
    var item = elemento.parentNode;
    item.childNodes[1].innerText = item.childNodes[2].value;
    //apaga o valor pra ficar mais bonito
    item.childNodes[2].value = "";
}

//remove a tarefa e retorna ela 
function excluir_tarefa(elemento)
{
    var item = elemento.parentNode;
    item.parentNode.removeChild(item);
    return item;
}

//move a tarefa quando clicado no checkbox
function mover_tarefa(elemento)
{
    var item = elemento.parentNode;
    var lista = item.parentNode;
    var projeto_id = lista.parentNode.id;
    // exclui a tarefa de um e põe no outro
    if (elemento.checked) {
        document.getElementById(projeto_id+'_feito').appendChild(excluir_tarefa(elemento));
    } else{
        document.getElementById(projeto_id+'_afazer').appendChild(excluir_tarefa(elemento));
    }
}

//cria o json e chama a função para salvar esse json no servidor
function salvar(){
    json_data = {};
    var lista = document.getElementById("lista_tarefas");

    for (var i = 0; i < lista.childNodes.length; i = i + 1){

        //tente as listas filho
        try {
            var lista_afazer = lista.childNodes[i].childNodes[5];
            var lista_feito = lista.childNodes[i].childNodes[8];
            var projeto_items = []
    
            //for para percorrer os items de lista a fazer do projeto i e adicionar em json_data
            for (var i2 = 0; i2 < lista_afazer.childNodes.length; i2 = i2 + 1)
            {
                var item = lista_afazer.childNodes[i2];
                var tarefa = item.childNodes[1].innerText;
                projeto_items.push({'tarefa': tarefa, 'feito': false});
            }
            
            //for para percorrer os items de lista feito do projeto i e adicionar em json_data
            for (var i3 = 0; i3 < lista_feito.childNodes.length; i3 = i3 + 1)
            {
                var item = lista_feito.childNodes[i3];
                var tarefa = item.childNodes[1].innerText;  
                projeto_items.push({'tarefa': tarefa, 'feito': true});
            }
            json_data[lista.childNodes[i].id] = projeto_items;
        }
        catch {
            //do nothing
        }
    }
    json_data = JSON.stringify(json_data);
    send_file(json_data);
}

//envia o json para o servidor
function send_file (json_data) {
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status <= 200) {
            console.log('Enviado Arquivo...');
        }
    }
    xhttp.onload = function(){
        console.log(this.responseText);
    }
    xhttp.open('POST', '/lista_tarefas/todo.php', true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    xhttp.send('tarefas='+json_data);
}

//carrega o arquivo json do servidor
function carregar(){
    document.getElementById("lista_tarefas").innerHTML = "";
    var xhttp = new XMLHttpRequest(); 
    xhttp.onreadystatechange = function (){
        if (this.readyState == 4 && this.status <= 200) {
            console.log("Requisitando Arquivo");
        }
    }
    xhttp.onload = function(){
        carregar_noHTML(this.responseText);
        console.log("Arquivo Carregado");
    }
    xhttp.open('GET', '/lista_tarefas/todo.php', true);
    xhttp.setRequestHeader("Content-Type", "application/x-www-form-urlencoded"); 
    xhttp.send();
}

//pega o json que foi carregado e salva ele no html
function carregar_noHTML (tarefas) {
    try {
        var tarefas = JSON.parse(tarefas);
        var lista = document.getElementById("lista_tarefas");
        //percorre todos os projetos
        for (projeto in tarefas)
        {
            projeto_lista = criar_projeto(projeto);
            var lista_afazer = projeto_lista.childNodes[5];
            var lista_feito = projeto_lista.childNodes[8];
    
            //adiciona a tarefa dos projetos na lista do projeto
            for (var tarefa = 0; tarefa < tarefas[projeto].length; tarefa = tarefa + 1){
                var dados_tarefa = tarefas[projeto][tarefa]["tarefa"];
                var feito = tarefas[projeto][tarefa]["feito"]
                var tarefa_item = criar_item(dados_tarefa);
    
                if (feito == false){
                    lista_afazer.appendChild(tarefa_item);
                }else{
                    tarefa_item.childNodes[0].checked = true;
                    lista_feito.appendChild(tarefa_item);
                }
            }
            
            lista.appendChild(projeto_lista);
        }
    } catch (err){
        //do nothing
    }
    
}