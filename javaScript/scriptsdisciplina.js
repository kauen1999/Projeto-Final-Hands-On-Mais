const disciplineModal = document.querySelector('#discipline-modal');
const disciplineForm = document.querySelector('#discipline-form');
const disciplineModalTitle = document.querySelector('#discipline-modal-title')
const saveDisciplineButton = document.querySelector('#save-discipline')

const openDisciplineModal = () => disciplineModal.showModal();
const closeDisciplineModal = () => disciplineModal.close();


/**
 * Função responsável por criar linhas na tabela student-table
 * @param {nome} string
 * @param {cargaHoraria} string
 * @param {professor} string
 * @param {status} string
 * @param {observacos} string
 * @param {id} string
 */

const createDisciplineSubject = (nome, cargaHoraria, professor, status, observacos, id) => {
  const disciplinesubjet = document.querySelector('#card-disciplinas')
  const articleli = document.createElement('div');
  articleli.innerHTML = ` 
  <div class="subject-list">
    <div class="subject-card" id="discipline-article">
      <article >
        <h3 class="subject-card__title" id="nome">${nome}</h3>
        <hr />
        <ul class="subject-card__list">
          <li id="cargaHoraria">carga horária: ${cargaHoraria}</li>
          <li id="professor">Professor: ${professor}</li>
          <li id="status">Status <span class="tag ${status === 'Opcional' ? 'tag--success' : 'tag--danger'} ">${status}</span></li>
        </ul>
        <p id="observacos">${observacos}</p>
        <p class="button-subject">
          <button class="button button--danger" onclick=disciplinesubjet(${id})>Apagar</button>
          <button class="button button--success" onclick="editDisciplineModal(${id})">Editar</button>
        </p>
      </article>
    </div>
  </div>`;
  disciplinesubjet.appendChild(articleli);
}

 /**
   * Função responsável abrir o modal de aluno e salvar um novo aluno
   * @param {disciplineId} string
   */
 function createDiscipline() {
  openDisciplineModal();
  disciplineModalTitle.textContent = 'Nova Disciplina';
  saveDisciplineButton.textContent = 'Criar';
  saveDisciplineData('http://localhost:3000/disciplinas', 'POST');
 }


/**
 * Função responsável abrir o modal de edição e carregar os dados de um estudante e salvar os dados da edição
 * @param {disciplineId} string
 */
const editDisciplineModal = async (disciplineId)  => {
  const url = `http://localhost:3000/disciplinas/${disciplineId}`;
  openDisciplineModal();
  disciplineModalTitle.textContent='Editar Disciplina';
  saveStudentButton.textContent = 'Editar';
  const [ , ,nome, cargaHoraria, professor,observacos] = document.querySelectorAll("input")
  fetch(url)
  .then(resp => resp.json())
  .then(data => {
    nome.value = data.nome
    cargaHoraria.value = data.cargaHoraria
    professor.value = data.professor
    observacos.value = data.observacos
    
  })
  saveStundentData(url,  'PUT');
 }; 

/**
 * @param {url} string
 * @param {method} string
 */
const saveDisciplineData = (url, method) => {
  disciplineForm.addEventListener('submit', (event)=> {
    event.preventDefault();
    const formData = new FormData(disciplineForm);
    const payload = new URLSearchParams(formData);
    fetch(url, {
        method: method,
        body: payload
    })
    created
    .catch(error => {
        closeDisciplineModal();
        alert('ocorreu um erro tente mais tarde')
        console.error(error);
    })
    // const inputs = document.querySelectorAll('input') // pega todos os iputs
    // console.log(inputs[0].value) // acessa o primeiro indice do array de inputs
  });
}
/**
* Função responsável por apagar dados de um estutande
* @param {desciplineId} string
*/

const disciplinesubjet = async (disciplineId)  =>  
fetch(`http://localhost:3000/disciplinas/${disciplineId}`, {method : 'DELETE'});

const loadDisciplineSubject = () => {
  fetch('http://localhost:3000/disciplinas')
  .then(resp => resp.json())
  .then(data => {
    data.forEach(item => {
      createDisciplineSubject(item.nome, item.cargaHoraria, item.professor, item.status, item.observacos, item.id)
    })
  }).catch((error) => {
    alert('ocorreu um erro tente mais tarde')
    console.error(error);
  });
  };
  
  loadDisciplineSubject();