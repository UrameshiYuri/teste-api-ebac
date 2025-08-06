/// <reference types="cypress" />
import contrato from '../contracts/usuarios.contrato'


describe('Testes da Funcionalidade Usuários', () => {

  it('Deve validar contrato de usuários - GET', () => {
    cy.request('usuarios').then(response=>{
      return contrato.validateAsync(response.body)
    })
  });

  it('Deve listar usuários cadastrados - GET', () => {
    cy.request({
      method: 'GET',
      url:'usuarios'  
  }).then((response)=>{
    expect(response.status).equal(200)
    expect(response.body).property('usuarios')
    cy.log(response.body.usuarios)
  })
  })
  it('Deve cadastrar um usuário com sucesso - POST', () => {
    cy.cadastrarUsuario('usuarioDeletado', 'usuarioDeletado@qa.com', 'senhateste', 'true')
    .should((response)=>{
      expect(response.status).equal(201)
      expect(response.body.message).equal('Cadastro realizado com sucesso')
    })
  });

  it('Deve validar um usuário com email inválido - POST', () => {
    cy.cadastrarUsuario('usuarioTeste2', 'usuarioTeste2@qa.com', 'senhateste', 'false')
    .should((response)=>{
      expect(response.status).equal(400)
      expect(response.body.message).equal('Este email já está sendo usado')
  })
})
  it.only('Deve editar um usuário previamente cadastrado', () => {
    let usuario = 'usuarioEditado ' + Math.floor(Math.random() * 1000000000)
    cy.cadastrarUsuario(usuario, 'emailteste23@qa.com', 'senhaTeste', 'false')
    .then(response=>{
      let id = response.body._id
        cy.request({
        method: 'PUT',
        url:`usuarios/${id}`,
        body:
        {
          "nome": usuario,
          "email": email,
          "password": senha,
          "administrador": adm
        }
      })
    })
});
  it('Deve deletar um usuário previamente cadastrado', () => {
    //TODO: 
  });
})
