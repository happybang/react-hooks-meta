/**
 * 所有单例的基类，做了单例的基础检查。所有子类最好都写一个getInstance的静态方法来获取
 * @author fengwan@
 * Date:2012-10-29
 * test bac
 */
export class manager {
  // 其实实际的开发项目中，不一定会用到数组，有可能会把数组之类的进行封装
  /** 存放初始化过的构造函数,这里用数组来存放构造函数 **/
  private static classKeys: Function[] = [];
  private static classValues: any[] = [];
  constructor() {
    let clazz: any = this['constructor'];
    // 为空时，表示浏览器不支持这样读取构造函数
    if (!clazz) return;
    // 防止重复实例化
    if (manager.classKeys.indexOf(clazz) !== -1)
      throw new Error(this + ' 只允许实例化一次！');
    else {
      manager.classKeys.push(clazz);
      manager.classValues.push(this);
    }
  }

  private static dataTypesObj: any = {};
  /**
   * 注册数据类型
   * @param name
   * @param dataType
   */
  public registDataType(name: string, dataType: Function) {
    if (manager.dataTypesObj[name] != null) {
    }
    manager.dataTypesObj[name] = dataType;
  }
  /**
   * 获取数据类型
   * @param name
   */
  public getDataType(name: string) {
    return manager.dataTypesObj[name];
  }

  // 注意，manager是要替换成你自己实现的子类 这里没有实际的作用
  private static instance: manager;
  /**
   * 获取实例的静态方法实例
   * @return
   *
   */
  public static getInstance(): manager {
    if (!this.instance) {
      this.instance = new manager();
    }
    return this.instance;
  }
  /**
   * 销毁方法。事实上单例是很少进行销毁的
   */
  destroy(o: any = null): void {
    this.onDestroy();
    manager.removeInstance(this['constructor']);
  }

  /**
   * 子类重写的方法
   */
  protected onDestroy(): void {}
  /**
   * 删除单例的实例（不对单例本身做任何的销毁，只是删除他的引用）
   * @param clazz 单例的Class对象
   *
   */
  static removeInstance(clazz: Function): void {
    let index: number = this.classKeys.indexOf(clazz);
    if (index === -1) {
      return;
    }
    this.classKeys.splice(index, 1);
    this.classValues.splice(index, 1);
  }

  /**
   * 是否存放有这个构造函数
   * @param clazz 构造函数
   * @return {boolean}
   */
  static getFunValue(clazz: Function): any {
    let funs: Function[] = this.classKeys;
    let length: number = funs.length;
    for (let i: number = 0; i < length; i++) {
      if (clazz === funs[i]) return this.classValues[i];
    }
    return null;
  }

  /**
   * 获取单例类，若不存在则创建.所有的单例创建的时候，都必须使用这个方法来创建，这样可以做到统一管理单例
   * @param clazz 任意需要实现单例效果的类
   * @return
   *
   */
  static getInstanceOrCreate(clazz: any): any {
    let obj: any = this.getFunValue(clazz);
    if (obj) {
      return obj;
    }
    obj = new clazz();
    // 不是manager的子类，则手动添加manager构造器会自动添加到classMap
    if (!(obj instanceof manager)) {
      this.classKeys.push(clazz);
      this.classValues.push(obj);
    }
    return obj;
  }
}
