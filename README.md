# Pokédex Mini

Uma Pokédex responsiva construída com React que consome dados em tempo real da [PokéAPI](https://pokeapi.co/). O projeto permite explorar Pokémon, pesquisar, filtrar por tipo, consultar atributos detalhados em um modal e salvar favoritos no navegador.

## Preview

> Execute o projeto localmente seguindo as instruções abaixo. A aplicação busca os dados diretamente da PokéAPI, portanto é necessário estar conectado à internet.

## Funcionalidades

- Listagem paginada de Pokémon com arte oficial, número, tipos e atributos principais.
- Busca por nome ou número da Pokédex.
- Filtros para os 18 tipos oficiais, com cores correspondentes.
- Ordenação por número, nome, ataque e defesa.
- Modal de detalhes com altura, peso, estatísticas, total de atributos e navegação entre Pokémon.
- Barras de estatísticas com a cor do tipo principal do Pokémon.
- Favoritos persistentes com `localStorage`.
- Estados de carregamento, erro, busca sem resultados e lista de favoritos vazia.
- Interface responsiva para desktop e mobile.
- Cache em memória para reduzir chamadas repetidas à API.

## Tecnologias

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [Lucide React](https://lucide.dev/)
- [PokéAPI](https://pokeapi.co/)
- CSS responsivo, sem dependência de biblioteca de estilos

## Pré-requisitos

Antes de começar, tenha instalado:

- [Node.js](https://nodejs.org/) **20.19+** ou **22.12+**.
- npm (instalado junto com o Node.js).
- Git (opcional, para clonar o repositório).
- Conexão com a internet, necessária para consultar a PokéAPI e carregar as imagens oficiais.

Você pode verificar as versões instaladas com:

```bash
node -v
npm -v
```

## Como executar

Clone o repositório e entre na pasta do projeto:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd PokedexMini
```

Instale as dependências:

```bash
npm install
```

Inicie o servidor de desenvolvimento:

```bash
npm run dev
```

Abra no navegador o endereço exibido no terminal — normalmente `http://localhost:5173`.

## Scripts disponíveis

| Comando | Descrição |
| --- | --- |
| `npm run dev` | Inicia o ambiente de desenvolvimento com atualização automática. |
| `npm run build` | Verifica o TypeScript e gera a versão otimizada em `dist/`. |
| `npm run preview` | Inicia uma prévia local da versão gerada pelo build. |

## Estrutura do projeto

```text
src/
├── components/    # Componentes reutilizáveis da interface
├── hooks/         # Hook de favoritos persistentes
├── pages/         # Página inicial e página de favoritos
├── services/      # Comunicação com a PokéAPI e cache
├── types/         # Tipos TypeScript da API
├── utils/         # Cores e formatação de Pokémon
├── App.tsx        # Rotas e estrutura principal
├── main.tsx       # Inicialização da aplicação
└── styles.css     # Estilos globais e responsividade
```

## Fonte dos dados

Os dados e as imagens exibidos são fornecidos pela [PokéAPI](https://pokeapi.co/), uma API pública para informações de Pokémon.

## Licença

Este projeto é destinado a estudo e portfólio. Pokémon e seus nomes são marcas da Nintendo, Game Freak e Creatures Inc.
