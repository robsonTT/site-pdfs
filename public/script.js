const searchInput = document.getElementById('search');

async function carregar() {
  const filtro = searchInput.value.toLowerCase();
  const res = await fetch('/api/list');
  const arquivos = await res.json();
  const lista = document.getElementById('pdfList');
  lista.innerHTML = '';
  arquivos
    .filter(f => f.toLowerCase().includes(filtro))
    .forEach(nome => {
      const li = document.createElement('li');
      li.innerHTML = `
        <a href="/pdfs/${nome}" target="_blank">${nome}</a>
        <button onclick="remover('${nome}')">Excluir</button>
      `;
      lista.appendChild(li);
    });
}

function upload() {
  const file = document.getElementById('fileInput').files[0];
  if (!file) return;
  const formData = new FormData();
  formData.append('pdf', file);
  fetch('/api/upload', { method: 'POST', body: formData })
    .then(() => { document.getElementById('fileInput').value = ''; carregar(); });
}

function remover(nome) {
  fetch(`/api/delete/${nome}`, { method: 'DELETE' }).then(carregar);
}

// Corrigido: aguardar "input" para buscar
searchInput.addEventListener('input', () => {
  carregar();
});

carregar();
