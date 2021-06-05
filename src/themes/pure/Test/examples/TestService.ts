import { Already, Concat, Inject, Service } from 'ioc-di'
import Foo from './Foo'
import Foo2 from './Foo2'
import Foo3 from './Foo3'

@Service()
export default class TestService {
  @Inject(Foo) foo!: Foo
  @Inject() foo2!: Foo2

  constructor() {
    // this.foo.method() // ❌无法在构造函数内访问注入属性
    this.init() //✔️使用 @Already 装饰器可以在对应函数内第一时间访问注入属性
  }

  method() {
    this.foo.method()
    this.foo2.method()

    const foo3 = Concat(this, new Foo3)
    console.log('TestService.method', foo3)
  }

  @Already
  init() {
    this.foo.method()
    this.foo2.method()
  }

  hello() {
    console.log('hello')
  }
}
