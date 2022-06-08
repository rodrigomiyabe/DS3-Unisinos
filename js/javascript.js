

function showFormVacina(){
  exitEstoque();
  cancelMovimento();
  document.getElementById("cadastroVacina").style.display = 'block';

  btnVacina = document.getElementById('btnVacina');
  btnVacina.style.backgroundColor = '#007BFF'
  btnVacina.style.borderColor = '#007BFF'

}

function showFormMovimento(){
  exitEstoque();
  cancelVacina();
  document.getElementById("cadastroMovimento").style.display = 'block';

  btnMovimento = document.getElementById('btnMovimento');
  btnMovimento.style.backgroundColor = '#007BFF'
  btnMovimento.style.borderColor = '#007BFF'

}

function showTableEstoque(){
  cancelVacina();
  cancelMovimento();
  document.getElementById("tableEstoque").style.display = 'block';

  btnEstoque = document.getElementById('btnEstoque');
  btnEstoque.style.backgroundColor = '#007BFF'
  btnEstoque.style.borderColor = '#007BFF'
}

function cancelVacina(){
  document.getElementById("cadastroVacina").style.display = 'none';
  document.getElementById('marca').value = '';
  document.getElementById('lote').value = '';

  btnVacina = document.getElementById('btnVacina');
  btnVacina.style.backgroundColor = '#212529'
  btnVacina.style.borderColor = '#212529'
}
function cancelMovimento(){
  document.getElementById("cadastroMovimento").style.display = 'none';
  document.getElementById('marca').value = '';
  document.getElementById('lote').value = '';

  btnVacina = document.getElementById('btnVacina');
  btnVacina.style.backgroundColor = '#212529'
  btnVacina.style.borderColor = '#212529'
}

function exitEstoque(){
  document.getElementById("tableEstoque").style.display = 'none';

  btnEstoque = document.getElementById('btnEstoque');
  btnEstoque.style.backgroundColor = '#212529'
  btnEstoque.style.borderColor = '#212529'
}

async function saveVacina(event){
  event.preventDefault();

  const form = event.target;
  const marca = form[0].value;
  const lote = form[1].value;
try{
  await axios.post("http://localhost:8081/vacina/cadastrar",{
    descricaoMaterial: marca,
    lote

  })

  alert("Vacina "+ marca +" salva com sucesso!")
}catch (error){
  alert("")
}

  carregaVacina();

    form[0].value = "";
    form[1].value = "";
}

async function carregaVacina(){
  const {data} = await axios.get("http://localhost:8081/vacina/listar");
  const vacinas = document.querySelector("#vacinas");
  vacinas.options.length = 1;
  data.forEach((vacina) => {
    vacinas.appendChild(new Option(vacina.descricaoMaterial,vacina.id));
  });
}

async function movimentaVacina(event){
  event.preventDefault();
  const form = event.target;
  const quantidade = form[1].value;
  const operacao = document.querySelector('input[name = "flexRadioDefault"]:checked').id;
  const vacinas = document.querySelector("#vacinas");
  const vacinaSelecionada = vacinas.options[vacinas.selectedIndex].value;

  try{
    await axios.post("http://localhost:8081/estoque/registrar",{
      vacina : vacinaSelecionada ,
      operacao,
      qtde : quantidade
    })
    alert ("Movimento realizado!")
  } catch (error){
    alert(error.response.data.erro);
  }

}

async function listaVacinaAnoMes(){
  const anomes = document.querySelector("#AnoMes").value;
  console.log(anomes);
  try{
    const {data} = await axios.get(`http://localhost:8081/estoque/listar/${anomes}`)
    console.log(data);
    const tabelaVacinas = document.getElementById("tabela-vacina");
    var rowCount = tabelaVacinas.rows.length;

    for (var i=rowCount-1; i > 0; i--) {
      tabelaVacinas.deleteRow(i);
    }
    data.itens.forEach((vacinas) => {
      var row = tabelaVacinas.tBodies[0].insertRow(0);
      var cell1 = row.insertCell(-1)
      var cell2 = row.insertCell(-1)
      cell1.innerHTML = vacinas.vacina;
      cell2.innerHTML = vacinas.quantidade;
    });
  }catch (error){
    alert("Data invalida")
  }

}

window.onload = function(){
  carregaVacina();
}







