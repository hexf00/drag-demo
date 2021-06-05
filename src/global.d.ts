declare global {
  // interface Window { }
}

namespace JSX {
  interface IntrinsicElements { [key: string]: any }

  // 给组件增加属性
  interface IntrinsicAttributes {
    draggable?: boolean
    key?: string | number
    class?: string | string[]
    on?: Record<string, () => void>
    nativeOn?: Record<string, () => void>
  }

  interface ElementAttributesProperty {
    $props: any // 配置JSX中属性类型检查
  }
}

declare module '*.module.scss' {
  const classes: { [key: string]: string }
  export default classes
}

/** 函数式组件 */
type FunctionalComponent<T> = (props: T | { props: T }) => void

/** 树结构Item */
type ITreeItem<T> = T & { children: ITreeItem<T>[]; parent?: ITreeItem<T>; toJSON?: () => unknown }