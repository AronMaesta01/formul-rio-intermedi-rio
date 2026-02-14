const CHAVE = "carrinho";


// PRODUTOS

const produtos = [
    { id: 1, nome: "Camiseta", preco: 50 },
    { id: 2, nome: "Tênis", preco: 200 },
    { id: 3, nome: "Boné", preco: 40 }
];



// PEGAR CARRINHO SALVO 

function pegarCarrinho() {

    let dados = localStorage.getItem(CHAVE);

    // se tiver transforma em array
    if (dados) {
        return JSON.parse(dados);
    }

    // se não tiver retorna vazio
    return [];
}



//SALVAR CARRINHO 

function salvarCarrinho(carrinho) {

    let texto = JSON.stringify(carrinho);

    localStorage.setItem(CHAVE, texto);

    mostrarCarrinho();
}


 //ADICIONAR PRODUTO

function adicionarProduto(id) {

    let carrinho = pegarCarrinho();

    // procura produto na lista
    let produto = produtos.find(p => p.id === id);

    // verifica se já existe no carrinho
    let existe = carrinho.find(i => i.id === id);

    if (existe) {

        // se já tiver → aumenta quantidade
        existe.quantidade = existe.quantidade + 1;

    } else {

        // se não tiver → cria novo item
        carrinho.push({
            id: produto.id,
            nome: produto.nome,
            preco: produto.preco,
            quantidade: 1
        });
    }

    salvarCarrinho(carrinho);
}


// ALTERAR QUANTIDADE 
 
function mudarQuantidade(id, qtd) {

    let carrinho = pegarCarrinho();

    carrinho.forEach(item => {

        if (item.id === id) {
            item.quantidade = Number(qtd);
        }

    });

    salvarCarrinho(carrinho);
}


// REMOVER PRODUTO 
 
function removerProduto(id) {

    let carrinho = pegarCarrinho();

    // cria novo array sem o item removido
    let novo = carrinho.filter(item => item.id !== id);

    salvarCarrinho(novo);
}



 // MOSTRAR PRODUTOS NA TELA 

function mostrarProdutos() {

    let area = document.getElementById("listaProdutos");

    area.innerHTML = "";

    produtos.forEach(prod => {

        let div = document.createElement("div");

        div.innerHTML = `
            ${prod.nome} - R$ ${prod.preco}

            <button onclick="adicionarProduto(${prod.id})">
                Adicionar
            </button>
        `;

        area.appendChild(div);
    });
}


 //MOSTRAR CARRINHO 

 function mostrarCarrinho() {

    let area = document.getElementById("listaCarrinho");

    area.innerHTML = "";

    let carrinho = pegarCarrinho();

    let total = 0;

    carrinho.forEach(item => {

        let subtotal = item.preco * item.quantidade;

        total = total + subtotal;

        let div = document.createElement("div");

        div.innerHTML = `
            ${item.nome}

            <input type="number"
                value="${item.quantidade}"
                min="1"
                onchange="mudarQuantidade(${item.id}, this.value)">

            R$ ${subtotal}

            <button onclick="removerProduto(${item.id})">
                Remover
            </button>
        `;

        area.appendChild(div);
    });

    document.getElementById("totalCarrinho").innerText =
        "Total: R$ " + total;
}


// INICIAR APP

mostrarProdutos();
mostrarCarrinho();
