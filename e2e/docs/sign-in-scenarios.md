# Cenários de Teste E2E - Login (SignIn)

## Fluxo Principal - Login com Sucesso

**Cenário:** Usuário realiza login com credenciais válidas
- **Dado** que o usuário está na página de login
- **Quando** preenche o email com um email válido cadastrado
- **E** preenche a senha corretamente
- **E** clica no botão "Entrar"
- **Então** deve ser redirecionado para a página inicial (/home)
- **E** deve visualizar o menu de usuário logado

## Fluxos Alternativos - Validações e Erros

### Senha Incorreta

**Cenário:** Usuário tenta login com senha incorreta
- **Dado** que o usuário está na página de login
- **Quando** preenche o email com um email válido cadastrado
- **E** preenche a senha incorretamente
- **E** clica no botão "Entrar"
- **Então** deve ver mensagem de erro "E-mail ou senha inválidos."
- **E** deve permanecer na página de login

### Email Não Cadastrado

**Cenário:** Usuário tenta login com email não cadastrado
- **Dado** que o usuário está na página de login
- **Quando** preenche o email com um email não cadastrado
- **E** preenche qualquer senha
- **E** clica no botão "Entrar"
- **Então** deve ver mensagem de erro "E-mail ou senha inválidos."
- **E** deve permanecer na página de login

### Campos Obrigatórios

**Cenário:** Usuário tenta login sem preencher campos
- **Dado** que o usuário está na página de login
- **Quando** clica no botão "Entrar" sem preencher os campos
- **Então** deve ver mensagens de validação nos campos obrigatórios
- **E** o botão de login deve permanecer desabilitado

### Visibilidade da Senha

**Cenário:** Usuário alterna visibilidade da senha
- **Dado** que o usuário está na página de login
- **Quando** clica no ícone de mostrar/ocultar senha
- **Então** o campo de senha deve alternar entre modo visível e oculto

### Navegação para Cadastro

**Cenário:** Usuário navega para tela de cadastro
- **Dado** que o usuário está na página de login
- **Quando** clica no link "Clique aqui para criar uma!"
- **Então** deve ser redirecionado para a página de cadastro (/sign-up)
