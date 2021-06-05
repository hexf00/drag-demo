import IndexService from '@/themes/pure/Index/Index.service'
import { Inject, InjectRef, Service } from 'ioc-di'

@Service()
export default class TreeItemService {
    @Inject() index!: IndexService
}