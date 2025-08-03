# Cenários de Teste E2E - Cadastro (SignUp)

## Fluxo Principal - Cadastro com Sucesso

**Cenário:** Usuário realiza cadastro com dados válidos
- **Dado** que o usuário está na página de cadastro
- **Quando** preenche o nome completo válido
- **E** preenche um email válido e não cadastrado
- **E** preenche um telefone válido no formato (99) 99999-9999
- **E** preenche a cidade
- **E** seleciona o estado
- **E** preenche uma senha válida (6-20 caracteres)
- **E** confirma a senha corretamente
- **E** clica no botão "Cadastrar"
- **Então** deve ver mensagem de sucesso "Cadastro concluído com sucesso."
- **E** deve ser redirecionado para a página de login (/sign-in)

## Fluxos Alternativos - Validações e Erros

### Email Já Cadastrado

**Cenário:** Usuário tenta cadastro com email existente
- **Dado** que o usuário está na página de cadastro
- **Quando** preenche todos os campos corretamente
- **Mas** utiliza um email já cadastrado no sistema
- **E** clica no botão "Cadastrar"
- **Então** deve ver mensagem de erro "Já existe um usuário registrado com esse email."
- **E** deve permanecer na página de cadastro

### Senha e Confirmação Diferentes

**Cenário:** Usuário preenche senhas diferentes
- **Dado** que o usuário está na página de cadastro
- **Quando** preenche a senha
- **E** preenche confirmação de senha diferente
- **Então** deve ver mensagem de erro "Senhas diferentes"
- **E** o botão de cadastro deve permanecer desabilitado

### Formato de Telefone

**Cenário:** Usuário preenche telefone em formato inválido
- **Dado** que o usuário está na página de cadastro
- **Quando** preenche o telefone em formato diferente de (99) 99999-9999
- **Então** deve ver mensagem de erro "Telefone inválido"
- **E** o botão de cadastro deve permanecer desabilitado

### Campos Obrigatórios

**Cenário:** Usuário tenta cadastro sem preencher campos obrigatórios
- **Dado** que o usuário está na página de cadastro
- **Quando** deixa campos obrigatórios em branco
- **E** tenta clicar em "Cadastrar"
- **Então** deve ver mensagens de validação nos campos obrigatórios
- **E** o botão de cadastro deve permanecer desabilitado

### Visibilidade das Senhas

**Cenário:** Usuário alterna visibilidade das senhas
- **Dado** que o usuário está na página de cadastro
- **Quando** clica nos ícones de mostrar/ocultar senha
- **Então** os campos de senha devem alternar entre modo visível e oculto

### Navegação para Login

**Cenário:** Usuário navega para tela de login
- **Dado** que o usuário está na página de cadastro
- **Quando** clica no link "Clique aqui para entrar!"
- **Então** deve ser redirecionado para a página de login (/sign-in)
