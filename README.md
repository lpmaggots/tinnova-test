# Tinnova - Front-end Test

Teste técnico de front-end proposto pela **Tinnova**.

## 💻 Desafio

Desenvolver um app front-end com **Um formulário e uma listagem de usuários**:

1. **Modal de formulário**:

   * Nome completo
   * CPF
   * Telefone
   * Email

2. **Página de listagem de usuários**:

   * Mostrar os dados cadastrados
   * Permitir exclusão dos itens
   * *(Plus)* Permitir edição dos dados

Link do Netlify: https://tinnnova-test.netlify.app/

---

## ✅ Requisitos

* [x] Criar, listar e excluir dados
* [x] Validações de formulário
* [x] Persistência em `localStorage`
* [x] Estilização conforme guia de estilo proposto
* [x] Responsividade
* [x] Edição de registros *(Plus)*
* [x] Animação de loading no botão de submit
* [x] Pré-processador CSS (`SASS`)
* [x] Testes unitários e de componentes com `Vitest`

---

## 🧪 Como rodar os testes

```bash
# Testes unitários
npm run test

# UI para testes
npm run test:ui

# Cobertura de testes
npm run coverage
```

---

## 🚀 Como rodar o projeto

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/tinnova-test.git
cd tinnova-test
```

2. Instale as dependências:

```bash
npm install
```

3. Rode o projeto em ambiente de desenvolvimento:

```bash
npm run dev
```

4. Acesse no navegador:

```
http://localhost:{PORT}
```

---

## 🧐 Solução adotada

* A aplicação foi construída com **Vue 3**, seguindo o padrão de componentes e usando **composition API**
* O formulário foi validado com `vee-validate` + `yup`
* Máscaras de CPF e telefone foram aplicadas com `imask` + `vue-imask`
* Dados iniciais são carregados via `fetch` e armazenados com `localStorage`
* Interface responsiva utilizando SCSS e layout baseado no guia de estilo fornecido
* Testes escritos com `Vitest` e `@testing-library/vue`

---

## 🛠️ Tecnologias e bibliotecas utilizadas

### Dependências

* **Vue 3** – Framework JavaScript
* **VeeValidate** – Validação de formulários
* **Yup** – Schema validation
* **IMask** – Máscara de inputs
* **Vue IMask** – Integração do IMask com Vue
* **Font Awesome** – Ícones SVG

### DevDependencies

* **Vite** – Bundler moderno para desenvolvimento
* **Sass** – Pré-processador CSS
* **Vitest** – Test runner
* **@testing-library/vue** – Utilitários de teste para Vue
* **@vue/test-utils** – Testes unitários de componentes Vue
* **jsdom** – Simulação do DOM para testes
* **@vitest/coverage-v8** – Relatórios de cobertura de testes

---

## 📦 Scripts disponíveis

```json
"scripts": {
  "dev": "vite",
  "build": "vite build",
  "preview": "vite preview",
  "test": "vitest",
  "test:ui": "vitest --ui",
  "coverage": "vitest run --coverage"
}
```
