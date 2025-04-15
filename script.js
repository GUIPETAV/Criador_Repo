// Variáveis globais
let githubToken = '';
let username = '';

// Elementos da interface
const loginBtn = document.getElementById('loginBtn');
const tokenInput = document.getElementById('token');
const loginMessage = document.getElementById('loginMessage');
const loginSection = document.getElementById('loginSection');
const mainSection = document.getElementById('mainSection');
const repoForm = document.getElementById('repoForm');
const createMessage = document.getElementById('createMessage');
const repoList = document.getElementById('repoList');
const refreshReposBtn = document.getElementById('refreshReposBtn');
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

// Função de login com o GitHub
loginBtn.addEventListener('click', async () => {
    const token = tokenInput.value.trim();

    if (!token) {
        showMessage(loginMessage, 'Por favor, insira um token válido.', 'error');
        return;
    }

    try {
        // Verifica se o token é válido tentando obter informações do usuário
        const response = await fetch('https://api.github.com/user', {
            headers: {
                'Authorization': `token ${token}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('Token inválido ou sem permissões necessárias.');
        }

        const userData = await response.json();
        username = userData.login;
        githubToken = token;

        showMessage(loginMessage, `Conectado como ${username}!`, 'success');

        // Mostrar a tela principal após login bem-sucedido
        setTimeout(() => {
            loginSection.classList.add('hidden');
            mainSection.classList.remove('hidden');
            loadRepositories(); // Carrega os repositórios inicialmente
        }, 1000);

    } catch (error) {
        showMessage(loginMessage, error.message, 'error');
    }
});

// Manipulação das tabs
tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        const tabId = tab.getAttribute('data-tab');

        // Ativar tab clicada e desativar as outras
        tabs.forEach(t => t.classList.remove('active'));
        tab.classList.add('active');

        // Mostrar conteúdo da tab selecionada e esconder os outros
        tabContents.forEach(content => {
            if (content.id === `${tabId}RepoSection`) {
                content.classList.remove('hidden');
            } else {
                content.classList.add('hidden');
            }
        });

        // Se a tab de listar repositórios for selecionada, carregar os repositórios
        if (tabId === 'list') {
            loadRepositories();
        }
    });
});

// Função para criar um repositório
repoForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('repoName').value.trim();
    const description = document.getElementById('repoDesc').value.trim();
    const isPrivate = document.getElementById('repoVisibility').value === 'private';
    const initWithReadme = document.getElementById('initReadme').checked;
    const licenseTemplate = document.getElementById('licenseTemplate').value;

    if (!name) {
        showMessage(createMessage, 'Por favor, insira um nome para o repositório.', 'error');
        return;
    }

    try {
        const response = await fetch('https://api.github.com/user/repos', {
            method: 'POST',
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                description,
                private: isPrivate,
                auto_init: initWithReadme,
                license_template: licenseTemplate
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.message || 'Erro ao criar repositório');
        }

        const data = await response.json();

        showMessage(
            createMessage, 
            `Repositório criado com sucesso! <a href="${data.html_url}" target="_blank">Ver no GitHub</a>`, 
            'success'
        );

        // Limpar o formulário
        repoForm.reset();

    } catch (error) {
        showMessage(createMessage, error.message, 'error');
    }
});

// Função para carregar repositórios
async function loadRepositories() {
    if (!githubToken) return;

    repoList.innerHTML = '<p>Carregando repositórios...</p>';

    try {
        const response = await fetch('https://api.github.com/user/repos?sort=created&direction=desc', {
            headers: {
                'Authorization': `token ${githubToken}`,
                'Accept': 'application/vnd.github.v3+json'
            }
        });

        if (!response.ok) {
            throw new Error('Erro ao carregar repositórios');
        }

        const repositories = await response.json();

        if (repositories.length === 0) {
            repoList.innerHTML = '<p>Você não possui nenhum repositório.</p>';
            return;
        }

        repoList.innerHTML = '';

        repositories.forEach(repo => {
            const repoItem = document.createElement('div');
            repoItem.className = 'repo-item';

            const createdDate = new Date(repo.created_at).toLocaleDateString();

            repoItem.innerHTML = `
                <div class="repo-title">
                    <a href="${repo.html_url}" target="_blank">${repo.name}</a>
                    <span style="font-size: 12px; color: #666; margin-left: 10px;">
                        ${repo.private ? '🔒 Privado' : '🌐 Público'}
                    </span>
                </div>
                <p>${repo.description || 'Sem descrição'}</p>
                <div style="font-size: 13px; color: #666;">
                    Criado em: ${createdDate}
                </div>
            `;

            repoList.appendChild(repoItem);
        });

    } catch (error) {
        repoList.innerHTML = `<p class="error">Erro: ${error.message}</p>`;
    }
}

// Atualizar lista de repositórios
refreshReposBtn.addEventListener('click', loadRepositories);

// Função auxiliar para mostrar mensagens
function showMessage(element, message, type) {
    element.innerHTML = `<div class="${type}">${message}</div>`;

    // Limpar a mensagem após 5 segundos se for de sucesso
    if (type === 'success') {
        setTimeout(() => {
            element.innerHTML = '';
        }, 5000);
    }
}