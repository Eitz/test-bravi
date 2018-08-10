# Instalação

1. Dependências
	`$ npm install`
2. Preparar o banco de dados
	`$ mysql -uusername -p < ../database/prepare-db/0_schema.sql`

# Rodando em ambiente Dev

	`$ npm run dev`

# Rodando em ambiente de produção

	`$ npm start`


# Alerta

Normalmente não subo para os repositórios o arquivo `config.json` uma vez que ele contém as diretivas de autenticação dos serviços que o WebApp usa, porém nesse caso, à título de exemplo, este arquivo foi commitado.
