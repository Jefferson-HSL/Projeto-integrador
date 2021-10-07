class Registro{
    constructor(){
        this.id=1;
        this.arrayMateriais=[];
        this.editId = null;/*se!=null o botão Salvar vira Atualizar*/
    }
    
    salvar(){
        let registro=this.lerDados();
        if(this.validaCampos(registro)){
            if(this.editId == null){
                this.adicionar(registro);
            } else {
                this.atualizar(this.editId, registro);
            }
        }
        this.listaTabela();
        this.cancelar();
    }
    cancelar(){       
        document.getElementById('qnt').value = null;
        document.getElementById('material').value = null;
        document.getElementById('data').value = null;
        document.getElementById('cliente').value = null;
        if(this.editId != null){
            document.getElementById('btn1').value = 'Salvar';
            this.editId = null;/*volta a ser nulo para o botão escrito atualizar voltar a ser salvar*/
        } 
    }
    listaTabela(){
        let tbody=document.getElementById('tbody');
        tbody.innerText = '';
        for(let i=0;i<this.arrayMateriais.length;i++){
            let tr = tbody.insertRow();/*cria uma nova linha*/
            let td_qnt = tr.insertCell();/*incere uma coluna na linha*/
            let td_material = tr.insertCell();
            let td_data = tr.insertCell();
            let td_cliente = tr.insertCell();
            let td_acoes = tr.insertCell();

            td_qnt.innerText=this.arrayMateriais[i].quantidade;
            td_material.innerText=this.arrayMateriais[i].nomeMaterial;
            td_data.innerText=this.arrayMateriais[i].data;
            td_cliente.innerText=this.arrayMateriais[i].cliente;
            
            let imgEdit = document.createElement('img');/*cria um elemento html do tipo declarado no parametro*/
            imgEdit.src = 'img/edit.png';
            imgEdit.setAttribute("onclick","registro.preparaEditacao("+JSON.stringify(this.arrayMateriais[i])+")");/*convertendo o registro em forma de string*/
            imgEdit.style.width = '22px';

            let imgDelete = document.createElement('img');/*cria um elemento html do tipo declarado no parametro*/
            imgDelete.src = 'img/delete.png';
            imgDelete.setAttribute("onclick","registro.deletar("+this.arrayMateriais[i].id+")");/*evento,ação*/
            imgDelete.style.width = '22px';

            td_acoes.appendChild(imgEdit);/*insere em um elemento pai um elemento filho: <td><img><td>*/
            td_acoes.appendChild(imgDelete);
        }
    }
    adicionar(registro){
        this.arrayMateriais.push(registro);
        this.id++;
    }
    atualizar(id, registro){
        for(let i = 0; i < this.arrayMateriais.length; i++){
            if(this.arrayMateriais[i].id == id){
                this.arrayMateriais[i].quantidade = registro.quantidade;
                this.arrayMateriais[i].nomeMaterial = registro.nomeMaterial;
                this.arrayMateriais[i].data = registro.data;
                this.arrayMateriais[i].cliente = registro.cliente;
            }
        }
    }
    lerDados(){
        let registro={};
        registro.id=this.id;
        registro.quantidade=document.getElementById('qnt').value;
        registro.nomeMaterial=document.getElementById('material').value;
        registro.data=document.getElementById('data').value;
        registro.cliente=document.getElementById('cliente').value;
        return registro;
    }
    validaCampos(registro){/*Verifica se há um campo vazio*/
        let msg='';
        if(registro.quantidade==''){
            msg+='- Informe a quantidade do Material \n';
        }
        if(registro.nomeMaterial==''){
            msg+='- Informe o nome do Material \n';
        }
        if(registro.data==''){
            msg+='- Informe a data \n';
        }
        if(registro.cliente==''){
            msg+='- Informe o nome do cliente \n';
        }
        if(msg!=''){
            alert(msg);
            return false;
        }
        return true;
    }
    deletar(id){
        if(confirm("Deseja deletar esse registro?")){
            let tbody=document.getElementById('tbody');
            for(let i = 0; i < this.arrayMateriais.length; i++){
                if(this.arrayMateriais[i].id == id){
                    this.arrayMateriais.splice(i, 1);
                    tbody.deleteRow(i);/*deleta a linha da tabela na posição informada*/
                }
            }
        }
        
    }
    preparaEditacao(dados){
        this.editId = dados.id;/*troca o valor nulo por o id que será atualizado*/
        document.getElementById('qnt').value = dados.quantidade;
        document.getElementById('material').value = dados.nomeMaterial;
        document.getElementById('data').value = dados.data;
        document.getElementById('cliente').value = dados.cliente;
        document.getElementById('btn1').value = 'Atualizar';
    }
}
var registro=new Registro();