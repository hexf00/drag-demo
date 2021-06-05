import { Inject, InjectRef, Service } from 'ioc-di'
import Foo2 from './Foo2'
import TestService from './TestService'

@Service()
export default class Foo {
  @InjectRef(() => Foo2) foo2!: Foo2

  @InjectRef(() => TestService) test!: TestService

  method() {
    console.log('Foo.method', this.test, this.foo2)
  }
}