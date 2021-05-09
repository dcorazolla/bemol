# Projeto Desafio Bemol 

Este projeto foi criado para atender o desafio proposto pela Bemol Digital.  

## Desafio 

Foi pedido que fizesse um módulo com CRUD de usuários, com interface.  
Considerando campos que sejam úteis em uma plataforma omnichannel.

## Solução

Para atender, imaginando um cenário onde existe uma plataforma microsservices, onde cada serviço rodaria dentro da "sua caixa" e seria responsável por uma entidade única.  

Pensando em detalhes como:
- Funcionamento desacoplado;
- Segurança no acesso aos serviços;
- Fazer uso de tecnologias e frameworks modernos para backend e frontend;
- Responsividade;
- Tempo relativamente curto para entregar algo funcional;

### Proposta

A entrega do desafio foi dividida em dois módulos, o frontend e o backend.  
Além de dos arquivos Dockerfile e docker-compose necessários para rodar a solução.

#### Backend

Escrito em PHP, utilizando Laravel 8 e banco MySQL. API REST (similar), protegida com autenticação, utilizando JWT.  

Contém os seguintes EndPoints:
- Login (http://localhost:8080/api/login) - HTTP POST 
- Logout (http://localhost:8080/api/logout) - HTTP POST
- Refresh (http://localhost:8080/api/refresh) - HTTP POST
- List (http://localhost:8080/api/user) - HTTP GET
- Add (http://localhost:8080/api/user) - HTTP POST
- Detail (http://localhost:8080/api/user/{cod_usuario}) - HTTP GET
- Update (http://localhost:8080/api/user) - HTTP PUT
- Delete (http://localhost:8080/api/user) - HTTP DELETE

Tentei aproximar ao máximo do REST (verbos HTTP e respostas HTTP 201, 201, 204, 400, etc), porém tenho ciência não estar seguindo 100% essa implementação.

### Frontend

Escrito em JavaScript, com REACT. Utilizando Axios, Styled-Components e DataTable.  
Realiza o controle de acesso, permitindo acesso livre apenas à tela de login. Demais telas fica protegidas e só são acessíveis após login na aplicação.

### Rodando a solução

1. Baixe este repositório;
2. Acesse a pasta baixada (clonada);
3. Suba a stack com o docker-compose  
   `$ docker-compose up --build `
4. Neste ponto devem subir 3 containers, 1 com o Apache/PHP (exposta porta 8080), 1 com o MySQL (sem porta exposta) e 1 com o NGINX (exposta porta 8081) com o Front.
5. Acesse o container Backend e instale a aplicação e inicialize o banco: 
> 1. Acesse o container  
   `$ docker exec -ti bemol_back bash`  
> 2. Instale as dependências  
   `# composer install`
> 3. Rode o migrate e seed do banco de dados  
   `# php artisan migrate --seed`
> 4. Saia do container  
   `# exit`
6. Acesse o Front da aplicação através do navegador de internet em *https://localhost:8081*
7. Realize o login com as seguintes informações: email: admin@bemol.com.br, senha: 123456
8. Para testar o Backend de forma desacoplada utilize a extensão "Talend API Tester", deixei o cenário de testes que pode ser importado para essa ferramenta na pasta docs do repositório, o arquivo "testes-api-bemol.json"