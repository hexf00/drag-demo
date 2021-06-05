import { Already, Inject, Root, Service } from 'ioc-di'
import TestService from './TestService'

@Root()
@Service()
export default class Entry {
  @Inject() service!: TestService

  constructor() {
    this.init()
  }

  @Already
  init() {
    console.log(this.service)
  }
}
