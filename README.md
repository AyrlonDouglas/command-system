# Sistema de gerenciamento de comanda (em construção)

Projeto criado com foco em melhorar a captação de pedidos e acompanhamento dos mesmos em restaurantes e lanchonetes de médio/pequeno porte.

## 🚀 Começando

Essas instruções permitirão que você obtenha uma cópia do projeto em operação na sua máquina local para fins de desenvolvimento e teste.


### 📋 Pré-requisitos

* [Node.js](https://nodejs.org/pt-br) -> versão 18
* [MySQL](https://www.mysql.com/) -> versão 8

### 🔧 Instalação

Passo 1: Dê um git clone no repositório atual 
```
git clone https://github.com/AyrlonDouglas/command-system.git
```

Passo 2: Entre no diretório api e configure as variáveis de ambiente no arquivo .env; Você deve modificar as variáveis do banco de acordo com as configurações do banco de dados instalado em seu computador/servidor. 
```
cd api
```

Passo 4: Entre no diretório web e configure as variáveis de ambiente do arquivo .env de acordo com as configurações do servidor da api. 
```
cd web
```
* Por padrão a porta configurada é a 3000. Para modificar, você deve acessar o arquivo vite.config.ts e mudar o port. 

## 🔩 Inicializando os servidores

Dentro do diretório api, execute o comando abaixo para inicializar o backend
```
npm run start
```

Dentro do diretório web, execute o comando abaixo para inicializar o backend
```
npm run dev
```

Pronto, agora você pode acessar a url configurada previamente no seu navegador para ter acesso a aplicação.


## 🛠️ Construído com

Mencione as ferramentas que você usou para criar seu projeto

* [React.js](https://react.dev/) - Biblioteca para criação da UI
* [Redux](https://redux.js.org/) - Gerenciador de estado global do frontend
* [Vite](https://vitejs.dev/) - Ambiente de desenvolvimento para react
* [Nest.js](https://nestjs.com/) - Framework do backend
* [TypeORM](https://typeorm.io/) - ORM gerenciador do banco de dados
* [MySQL](https://www.mysql.com/) - Banco de dados
