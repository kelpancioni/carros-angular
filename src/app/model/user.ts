export class User {
  username: string
  password?: string
  id: number
  login: string
  nome: string
  email: string
  urlFoto: string
  token: string
  roles: string[]


  constructor(user: User) {
    this.username = user.username || ''
    this.password = user.password || ''
    this.id = user.id
    this.login = user.login || ''
    this.nome = user.nome || ''
    this.email = user.email || ''
    this.urlFoto = user.urlFoto || ''
    this.token = user.token || ''
    this.roles = user.roles || []
  }

  isAdmin() {
    return this.roles.includes('ROLE_ADMIN')
  }

  isUser() {
    return this.roles.includes('ROLE_USER') && !this.roles.includes('ROLE_ADMIN')
  }

}
