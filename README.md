# pcbusca

O pcbusca é um site que procura vários produtos e periféricos de informática nas principais lojas do Brasil-sil-silll!!!

## 📥 Instalação local

No momento, o projeto não está hospedado em nenhum lugar (algumas lojas bloqueiam IPs de servidores, _e eu não tenho dinheiro para pagar um proxy_), então você precisa rodar o projeto localmente =)

### Requisitos

-   [Node.js](https://nodejs.org/en/) (v22.x)
-   [pnpm](https://pnpm.io/)
-   [Git](https://git-scm.com/)

### 1. Clone o repositório

```bash
git clone https://github.com/n0ky4/pcbusca
```

### 2. Instale as dependências

```bash
cd pcbusca
pnpm install
```

### 3. Faça build do projeto

```bash
pnpm build
```

### 4. Inicie o projeto

```bash
pnpm start
```

Pronto! O projeto estará rodando em `http://localhost:3000`!

<small>**Observação:** você só precisa instalar as dependências e fazer build do projeto uma vez. Para iniciar o projeto novamente, basta rodar o comando `pnpm start`.</small>

## 📦 Lojas suportadas

-   KaBuM!
-   Pichau
-   TerabyteShop

## 🛠️ Stack

A parte do [cliente](client) foi feita com [Next.js](https://nextjs.org/), [Tailwind CSS](https://tailwindcss.com/) e [Headless UI](https://headlessui.dev/).

A parte do [servidor](server) foi feita com [Fastify](https://www.fastify.io/), documentado com [Swagger](https://swagger.io/) (OpenAPI 3.0). Para web scraping, foi utilizada a API nativa de fetch, o [Cheerio](https://cheerio.js.org/) e o [Puppeteer](https://pptr.dev/) (com os plugins do [puppeteer-extra](https://github.com/berstend/puppeteer-extra))

## 🗺️ Roadmap

-   [ ] Lojas:

    -   [x] KaBuM!
    -   [x] Pichau
    -   [x] TerabyteShop
    -   [ ] Amazon
    -   [ ] Mercado Livre

-   [ ] Suporte de proxy

-   [ ] Page limit/size configurável

-   [ ] Botão de carregar mais produtos

## 📜 Licença

Este projeto é licenciado sob a licença AGPL-3.0. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## ☝🤓

Projeto feito somente para fins educacionais e de aprendizado, sem quaisquer fins lucrativos. Qualquer uso indevido é de responsabilidade do usuário.
