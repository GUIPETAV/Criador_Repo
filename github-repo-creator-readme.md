# GitHub Repo Creator

Um aplicativo simples e eficiente para criar e gerenciar repositórios no GitHub, disponível tanto em versão de linha de comando (Node.js) quanto como aplicação web.

![GitHub Logo](https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png)

## 📋 Descrição

Este projeto oferece duas soluções para criar e gerenciar repositórios no GitHub:

1. **Aplicativo CLI (Node.js)**: Ferramenta de linha de comando para criar e listar repositórios
2. **Aplicativo Web**: Interface gráfica acessível pelo navegador para as mesmas funcionalidades

Ambas as soluções utilizam a API oficial do GitHub e requerem um token de acesso pessoal para autenticação.

## 🚀 Funcionalidades

- Autenticação usando Token de Acesso Pessoal do GitHub
- Criação de novos repositórios com configurações personalizáveis:
  - Nome e descrição
  - Visibilidade (público/privado)
  - Inicialização com README
  - Seleção de licença
- Listagem de repositórios existentes do usuário
- Interface amigável (versão web) ou linha de comando eficiente (versão CLI)

## 📦 Pré-requisitos

### Para a versão CLI (Node.js):
- [Node.js](https://nodejs.org/) (v12 ou superior)
- NPM ou Yarn
- Token de Acesso Pessoal do GitHub

### Para a versão Web:
- Navegador web moderno
- Token de Acesso Pessoal do GitHub

## 🔧 Instalação

### Aplicativo CLI (Node.js)

1. Clone este repositório ou baixe os arquivos
2. Navegue até a pasta do projeto
3. Instale as dependências:

```bash
npm install
# ou
yarn install
```

### Aplicativo Web

Não é necessária instalação. Basta abrir o arquivo HTML em um navegador web.

## 🔑 Obtendo um Token de Acesso Pessoal

Para usar qualquer uma das versões, você precisará de um token de acesso pessoal do GitHub:

1. Acesse [GitHub Settings > Developer Settings > Personal access tokens](https://github.com/settings/tokens)
2. Clique em "Generate new token"
3. Dê um nome ao token (ex: "GitHub Repo Creator")
4. Selecione as permissões necessárias:
   - `repo` (acesso completo aos repositórios)
   - `user` (acesso aos dados do usuário)
5. Clique em "Generate token"
6. **Importante**: Copie e guarde o token gerado em um local seguro, pois ele não será mostrado novamente!

## 📖 Como Usar

### Aplicativo CLI (Node.js)

1. Execute o aplicativo:

```bash
node github-repo-creator.js
```

2. Insira seu token de acesso quando solicitado
3. Siga as instruções no terminal para criar ou listar repositórios

### Aplicativo Web

1. Abra o arquivo `github-repo-creator.html` em seu navegador
2. Cole seu token de acesso pessoal no campo apropriado
3. Clique em "Conectar"
4. Utilize a interface para criar novos repositórios ou visualizar os existentes

## 🛡️ Segurança

- Seu token de acesso pessoal é armazenado apenas localmente durante a execução da aplicação
- Na versão web, o token nunca é enviado para qualquer servidor além do GitHub
- As comunicações com a API do GitHub são feitas via HTTPS
- É recomendável criar um token com apenas as permissões necessárias e revogá-lo quando não for mais utilizado

## 🔄 Limitações da API do GitHub

- A API do GitHub possui [limites de taxa](https://docs.github.com/en/rest/overview/resources-in-the-rest-api#rate-limiting) (5.000 requisições por hora para usuários autenticados)
- Algumas funcionalidades podem exigir permissões específicas no token de acesso

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua funcionalidade (`git checkout -b feature/nova-funcionalidade`)
3. Faça commit das suas alterações (`git commit -m 'Adiciona nova funcionalidade'`)
4. Faça push para a branch (`git push origin feature/nova-funcionalidade`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo LICENSE para detalhes.

## 📞 Contato

Se você tiver alguma dúvida ou sugestão, sinta-se à vontade para abrir uma issue neste repositório.

---

Desenvolvido com ❤️ para a comunidade GitHub
