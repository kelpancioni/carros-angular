export class Car {
  id: number
  nome: string
  tipo: string
  descricao: string
  urlFoto: string
  urlVideo: string
  latitude: string
  longitude: string

  constructor(car: Car) {
    this.id = car.id
    this.nome = car.nome || ''
    this.tipo = car.tipo || ''
    this.descricao = car.descricao || ''
    this.urlFoto = car.urlFoto || ''
    this.urlVideo = car.urlVideo || ''
    this.latitude = car.latitude || ''
    this.longitude = car.longitude || ''
  }
}
