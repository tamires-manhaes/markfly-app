# Markfly Web

Markfly Web é uma aplicação de gerenciamento de bookmarks desenvolvida com **React**, **TypeScript** e **Vite**. Este projeto oferece autenticação, categorização, visualização e organização de links favoritos, com suporte a temas, internacionalização e interface responsiva.

## Principais Features

### 1. Autenticação de Usuário

- Cadastro e login de usuários.
- Persistência de sessão via cookies.
- Redirecionamento automático para páginas protegidas.
- Contexto de autenticação (`src/context/auth/`).

### 2. Gerenciamento de Bookmarks

- Adição, edição e remoção de bookmarks.
- Visualização de bookmarks em cards com imagem de preview.
- Marcação de bookmarks como "pinned" (fixados).
- Organização por categorias personalizadas.
- Formulários para novo bookmark e nova categoria (`src/pages/Home/`).

### 3. Categorias

- Criação, edição e exclusão de categorias.
- Visualização de bookmarks filtrados por categoria.
- Página dedicada para cada categoria (`src/pages/Category/`).

### 4. Interface Responsiva

- Layout adaptado para mobile, tablet e desktop.
- Navegação lateral para desktop e menu simplificado para mobile.
- Breakpoints configurados em `tailwind.config.js`.

### 5. Internacionalização (i18n)

- Suporte a múltiplos idiomas: Português, Inglês e Espanhol.
- Seleção dinâmica de idioma via componente `LanguageSelect`.
- Traduções organizadas em `src/locales/`.

### 6. Temas (Dark/Light)

- Alternância de tema via componente `ThemeSwitcher`.
- Persistência da preferência do usuário.

### 7. UI Customizada com shadcn/ui e Tailwind CSS

- Componentes reutilizáveis: botão, badge, card, input, select, dialog, etc.
- Estilização moderna e acessível.
- Utilização de SVGs como componentes React.

### 8. Página de Landing

- Apresentação das principais funcionalidades.
- Navegação clara para login/cadastro.
- Seções de features e sobre.

### 9. Outros Recursos

- Avatar e perfil do usuário.
- Separação clara entre páginas públicas e privadas.
- Utilização de hooks customizados para lógica de negócio.
- Validação e feedback em formulários.

## Estrutura de Pastas

```
src/
  api/                # Requisições para backend
  assets/             # Imagens, SVGs e logo
  components/         # Componentes reutilizáveis e de UI
  context/            # Contextos globais (ex: auth)
  hooks/              # Hooks customizados
  lib/                # Bibliotecas utilitárias (ex: i18n, sentry)
  locales/            # Traduções
  pages/              # Páginas principais da aplicação
  utils/              # Funções utilitárias
```

## Como rodar o projeto

1. Instale as dependências:

   ```sh
   npm install
   ```

2. Inicie o servidor de desenvolvimento:

   ```sh
   npm run dev
   ```

3. Acesse `http://localhost:5173` no navegador.

## Configuração de Ambiente

- Variáveis de ambiente podem ser definidas em `.env` (exemplo: API base URL).
- Para adicionar novos idiomas, crie um arquivo em `src/locales/` e atualize o `LanguageSelect`.

## Testes e Lint

- Lint: `npm run lint`
- Testes: (implemente conforme sua stack preferida)

## Contribuição

Sinta-se à vontade para abrir issues e pull requests!

---

**Tecnologias:**  
React • TypeScript • Vite • Tailwind CSS • shadcn/ui •
