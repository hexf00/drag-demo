import IndexService from '@/themes/pure/Index/Index.service'
import { GetContainer, Inject, Root, Service } from 'ioc-di'

@Root()
@Service()
class Container {
  @Inject() index!: IndexService
}

//初始化一个容器
const container = new Container()

console.log(GetContainer(container))
export default container