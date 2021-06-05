import { Inject, InjectRef, Service } from 'ioc-di'
import Foo from './Foo'

@Service()
export default class Foo2 {
  @InjectRef(() => Foo) foo!: Foo

  method() {
    console.log('Foo2.method', this.foo)
  }
}