# Labenu Music Awards

## 📄 Sobre

Backend de uma festival de música, no qual os usuários podem cadastrar as bandas, shows e pegar as informações desejadas.

## 🔗 Link do Deploy
https://lama34.onrender.com

## 🔗 Link para acessar os endpoints do Postman
https://documenter.getpostman.com/view/22376488/2s93JzLgEW

## 💻 Funcionalidades

### Sign Up

- Cria um novo usuário. O email deve ser único, senão uma mensagem de erro irá aparecer e não irá criar.
- O usuário deverá passar o name, email, password e role através do body.
- Após criar o usuário, será gerado um token de autenticação.

### Login

- Faz o login do usuário na aplicação.
- O usuário deverá passar o email e password de um usuário já cadastrado através do body.
- Após o login, será gerado um token de autenticação.

### Create Band

- Cria uma nova banda.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado e deve ter o role do tipo "admin".
- O usuário deverá passar name, musicGenre e responsible através do body.

### Create Show

- Cria uma novo show.
- Para conseguir utilizar o endpoint, o usuário deve estar autenticado.
- O usuário deverá passar weekDay, startTime, endTime e bandId através do body.
- Os shows só poderão acontecer nos seguintes weeDays: friday, saturday ou sunday.
- O horário dos shows deve ser entre 8 e 23 horas. Além disso, caso haja um show marcado no mesmo horário, não será possível criar o show.

### Get Bands

- Retorna as informações de todas os bandas cadastradas.
- O usuário deve estar autenticado para utilizar o endpoint.

### Get Band By Id

- Retorna as informações da banda desejada.
- Para utilizar este endpoint, o usuário deve estar autenticado.
- O id da banda deve ser passado por path params.

### Get Show By Day

- Retorna os shows do dia desejado.
- Para utilizar este endpoint, o usuário deve estar autenticado.
- O weekDay deve ser passado por path params.
