//启用严格模式
'use strict';
namespace Materal {
    /**
     * 普通工具类
     */
    export class ToolManager {
        /**
         * 判断对象是否为Null
         * @param obj 任意值或对象
         * @returns 是否为Null
         */
        public static IsNull(obj: any): boolean {
            return obj === null;
        }
        /**
         * 判断对象是否为Undefined
         * @param obj 任意值或对象
         * @returns 是否为Undefined
         */
        public static IsUndefined(obj: any): boolean {
            return typeof obj === "undefined";
        }
        /**
         * 判断对象是否为Null或Undefined
         * @param obj 任意值或对象
         * @returns 是否为Null或Undefined
         */
        public static IsNullOrUndefined(obj: any): boolean {
            return this.IsNull(obj) || this.IsUndefined(obj);
        }
        /**
         * 判断字符串是否为空字符串
         * @param Str 字符串
         * @returns 是否为空字符串
         */
        public static IsEmpty(Str: string): boolean {
            return Str === "";
        }
        /**
         * 判断字符串是否为Null或Undefined或空字符串
         * @param Str 字符串
         * @returns 是否为Null或Undefined或空字符串
         */
        public static IsNullOrUndefinedOrEmpty(Str: string): boolean {
            return this.IsNull(Str) || this.IsUndefined(Str) || this.IsEmpty(Str);
        }
        /**
         * 鉴别类型
         * @param obj 传入对象
         * @param IncludeCustom 包括自定义类型
         * @returns 对象类型 
         */
        public static GetType(obj: any, IncludeCustom: boolean = true): string {
            let Lowercase: boolean = true;
            let resStr: string = typeof obj;
            if (resStr === "object") {
                if (this.IsNull(obj)) {
                    resStr = "null";
                }
                else {
                    Lowercase = false;
                    resStr = Object.prototype.toString.call(obj).slice(8, -1);
                    if (resStr === "Object" && !this.IsNullOrUndefined(obj.constructor) && obj.constructor.name != "Object" && IncludeCustom) {
                        resStr = obj.constructor.name;
                    }
                }
            }
            if (!this.IsNullOrUndefinedOrEmpty(resStr) && Lowercase) {
                resStr = resStr.toLowerCase();
            }
            return resStr;
        }
        /**
         * 删除字符串两端空格
         * @param Str 要删除空格的字符串
         * @returns 已删除空格的字符串
         */
        public static Trim(Str: string): string {
            if (this.IsNullOrUndefined(String.prototype.trim)) {
                while (Str.substr(0, 1) === " ") {
                    Str = Str.substr(1, Str.length - 1);
                }
                while (Str.substr(Str.length - 2, 1) === " ") {
                    Str = Str.substr(0, Str.length - 2);
                }
            }
            else {
                Str = Str.trim();
            }
            return Str;
        }
        /**
         * 获得URL参数
         * @returns URL参数
         */
        public static GetURLParams(): Object {
            let params: Object = new Object();
            let paramsStr: string = window.location.search;
            let paramsStrs: string[] = new Array<string>();
            if (!this.IsNullOrUndefinedOrEmpty(paramsStr)) {
                paramsStr = paramsStr.substring(1, paramsStr.length);
                paramsStrs = paramsStr.split("&");
                for (let i = 0; i < paramsStrs.length; i++) {
                    let temp = paramsStrs[i].split("=");
                    if (temp.length == 2) {
                        params[temp[0]] = temp[1];
                    }
                    else if (temp.length == 1) {
                        params[temp[0]] = null;
                    }
                }
            }
            return params;
        }
        /**
         * 补位
         * @param Str 要补位的字符串
         * @param Length 长度
         * @param CoverStr 补位字符
         * @param IsFront 前置补位
         */
        public static StrCover(Str: string, Length: number, CoverStr: string, IsFront: boolean = true): string {
            for (let i = Str.length; i < Length; i++) {
                if (IsFront === true) {
                    Str = CoverStr + Str;
                }
                else {
                    Str = Str + CoverStr;
                }
            }
            return Str;
        }
        /**
         * 隐藏代码
         * @param CodeStr 要隐藏的代码
         * @returns 隐藏后的代码
         */
        public static HideCode(CodeStr: string): string {
            let resStr: string = EncryptionManager.ConvertToBinary(CodeStr);
            resStr = resStr.replace(/0/g, "\u200d");
            resStr = resStr.replace(/1/g, "\u200c");
            return resStr;
        }
        /**
         * 显示代码
         * @param CodeStr 被隐藏的代码
         * @returns 显示的代码 
         */
        public static ShowCode(CodeStr: string): string {
            let resStr: string = CodeStr.replace(/.{8}/g, function (u) {
                return String.fromCharCode(parseInt(u.replace(/\u200c/g, "1").replace(/\u200d/g, "0"), 2))
            });
            return resStr;
        }
        /**
         * 获得时间差
         * @param date1 时间1
         * @param date2 时间2
         * @param TimeType 返回类型[ms毫秒s秒m分钟H小时D天数]
         */
        public static GetTimeDifference(date1: Date, date2: Date, TimeType: string = "s"): number {
            let timeDifference: number = date1.getTime() - date2.getTime();
            switch (TimeType) {
                case "D":
                    timeDifference = Math.floor(timeDifference / (24 * 3600 * 1000));
                    break;
                case "H":
                    timeDifference = Math.floor(timeDifference / (3600 * 1000));
                    break;
                case "m":
                    timeDifference = Math.floor(timeDifference / (60 * 1000));
                    break;
                case "s":
                    timeDifference = Math.floor(timeDifference / 1000);
                    break;
                case "ms":
                    timeDifference = timeDifference;
                    break;
                default:
            }
            return timeDifference;
        }
        /**
         * 时间字符串格式化
         * @param DateTime 时间对象
         * @param FormatStr 格式化字符串
         */
        public static DateTimeFormat(DateTime: Date, FormatStr: string): string {
            let formatData: Object = {
                "M+": DateTime.getMonth() + 1, //月份 
                "d+": DateTime.getDate(), //日 
                "H+": DateTime.getHours(), //小时 
                "m+": DateTime.getMinutes(), //分 
                "s+": DateTime.getSeconds(), //秒 
                "q+": Math.floor((DateTime.getMonth() + 3) / 3), //季度 
                "S": DateTime.getMilliseconds() //毫秒 
            };
            if (/(y+)/.test(FormatStr)) {
                FormatStr = FormatStr.replace(RegExp.$1, (DateTime.getFullYear() + "").substr(4 - RegExp.$1.length));
            }
            for (var data in formatData) {
                if (new RegExp("(" + data + ")").test(FormatStr))
                {
                    FormatStr = FormatStr.replace(RegExp.$1, (RegExp.$1.length == 1) ? (formatData[data]) : (("00" + formatData[data]).substr(("" + formatData[data]).length)));
                }
            }
            return FormatStr;
        }
        /**
         * 获取Input DateTime设置值字符串
         * @param DateTime 要设置的时间
         */
        public static GetInputDateTimeValueStr(DateTime: Date): string {
            return ToolManager.DateTimeFormat(DateTime, "yyyy-MM-ddTHH:mm:ss");
        }
        /**
         * 设置Input DateTime的值
         * @param ID 要设置值的ID
         * @param DateTime 要设置的时间
         */
        public static SetInputDateTimeValue(ID: string, DateTime: Date): void {
            let element: HTMLInputElement = DOMManager.$(ID) as HTMLInputElement;
            if (!ToolManager.IsNullOrUndefined(element)) {
                element.value = ToolManager.GetInputDateTimeValueStr(DateTime);
            }
        }
    }
    /**
     * 对象帮助类
     */
    export class ObjectManager {
        /**
         * 克隆对象
         * @param obj 要克隆的对象
         */
        public static Clone(obj: any): any {
            let ObjectType: string = ToolManager.GetType(obj, false);
            let result: any;
            if (ObjectType == "object") {
                result = new Object();
            }
            else if (ObjectType == "array") {
                result = new Array();
            }
            else {
                result = obj;
            }
            for (var i in obj) {
                let copy = obj[i];
                let SubObjectType: string = ToolManager.GetType(copy, false);
                if (SubObjectType == "object" || SubObjectType == "array") {
                    result[i] = arguments.callee(copy);
                }
                else {
                    result[i] = copy;
                }
            }
            return result;
        }
    }
    /**
     * 数组帮助类
     */
    export class ArrayManager {
        /**
         * 查询所在数组的位序
         * @param array 要查询的数组
         * @param item 要查询的对象
         * @returns 位序
         */
        public static ArrayIndexOf<T>(array: Array<T>, item: T, formIndex: number = 0): number {
            let Index: number = -1;
            if (ToolManager.IsNullOrUndefined(array.indexOf)) {
                for (let i = formIndex; i < array.length; i++) {
                    if (array[i] == item) {
                        Index = i;
                    }
                }
            }
            else {
                Index = array.indexOf(item, formIndex);
            }
            return Index;
        }
        /**
         * 清空数组
         * @param array 要清空的数组
         * @returns 清空后的数组
         */
        public static ArrayClear<T>(array: Array<T>): Array<T> {
            array.splice(0, array.length);
            return array;
        }
        /**
         * 插入数组
         * @param array 要插入的数组
         * @param Index 要插入的对象
         * @returns 插入后的数组
         */
        public static ArrayInsert<T>(array: Array<T>, item: T, Index: number): Array<T> {
            array.splice(Index, 0, item);
            return array;
        }
        /**
         * 删除数组
         * @param array 要删除的数组
         * @param Index 要删除的位序
         * @returns 删除后的数组
         */
        public static ArrayRemoveTo<T>(array: Array<T>, Index: number): Array<T> {
            array.splice(Index, 1);
            return array;
        }
        /**
         * 删除数组
         * @param array 要删除的数组
         * @param item 要删除的对象
         * @returns 删除后的数组
         */
        public static ArrayRemove<T>(array: Array<T>, item: T): Array<T> {
            let Index: number = this.ArrayIndexOf(array, item);
            if (Index >= 0) {
                this.ArrayRemoveTo(array, Index);
            }
            return array;
        }
        /**
         * 删除所有数组
         * @param array 要删除的数组
         * @param item 要删除的对象
         * @returns 删除后的数组
         */
        public static ArrayRomeveAll<T>(array: Array<T>, item: T): Array<T> {
            let Index: number = this.ArrayIndexOf(array, item);
            while (Index >= 0) {
                this.ArrayRemoveTo(array, Index);
                Index = this.ArrayIndexOf(array, item);
            }
            return array;
        }
    }
    /**
     * DOM帮助类
     */
    export class DOMManager {
        /**
         * 根据ID获得页面元素对象
         * @param id 页面元素ID
         * @returns 页面元素对象
         */
        public static $(id: string): HTMLElement;
        /**
         * 根据页面元素对象获得页面元素对象
         * @param element 页面元素
         * @returns 页面元素对象
         */
        public static $(element: any): HTMLElement;
        public static $(id): HTMLElement {
            let element: HTMLElement;
            if (ToolManager.GetType(id) === "string") {
                element = document.getElementById(id);
            }
            else {
                element = id;
            }
            return element;
        }
        /**
         * 获得样式
         * @param element 页面元素ID
         * @returns 样式数组
         */
        public static GetClass(id: string): string[];
        /**
         * 获得样式
         * @param element 页面元素
         * @returns 样式数组
         */
        public static GetClass(element: Element): string[];
        public static GetClass(id): string[] {
            let ClassList: string[] = new Array<string>();
            let element: HTMLElement = this.$(id);
            if (!ToolManager.IsNullOrUndefined(element)) {
                let ClassStr: string = element.getAttribute("class");
                if (!ToolManager.IsNullOrUndefinedOrEmpty(ClassStr)) {
                    ClassStr = ClassStr.replace(/\s{2,}/g, " ");
                    ClassStr = ToolManager.Trim(ClassStr);
                    ClassList = ClassStr.split(" ");
                }
            }
            return ClassList;
        }
        /**
         * 设置样式
         * @param id 页面元素ID
         * @param ClassName 要设置的样式
         * @returns 设置结果
         */
        public static SetClass(id: string, ClassName: string): boolean;
        /**
         * 设置样式
         * @param element 页面元素
         * @param ClassName 要设置的样式
         * @returns 设置结果
         */
        public static SetClass(element: Element, ClassName: string): boolean;
        /**
         * 设置样式
         * @param id 页面元素ID
         * @param ClassList 要设置的样式列表
         * @returns 设置结果
         */
        public static SetClass(id: string, ClassList: string[]): boolean;
        /**
         * 设置样式
         * @param element 页面元素
         * @param ClassList 要设置的样式列表
         * @returns 设置结果
         */
        public static SetClass(element: Element, ClassList: string[]): boolean;
        public static SetClass(id, ClassName): boolean {
            let resM: boolean = false;
            let element: HTMLElement = this.$(id);
            if (!ToolManager.IsNullOrUndefined(element)) {
                let classStr: string = "";
                let TypeStr: string = ToolManager.GetType(ClassName);
                let ClassList: string[];
                if (TypeStr === "string") {
                    classStr = (ClassName as string).replace(/\s{2,}/g, " ");
                    classStr = ToolManager.Trim(classStr);
                }
                else if (TypeStr === "Array") {
                    classStr = (ClassName as string[]).join(" ");
                }
                if (!ToolManager.IsNullOrUndefinedOrEmpty(classStr)) {
                    element.setAttribute("class", classStr);
                    resM = true;
                }
            }
            return resM;
        }
        /**
         * 添加样式
         * @param id 页面元素ID
         * @param ClassName 要添加的样式
         * @returns 添加结果
         */
        public static AddClass(id: string, ClassName: string): boolean;
        /**
         * 添加样式
         * @param element 页面元素
         * @param ClassName 要添加的样式
         * @returns 添加结果
         */
        public static AddClass(element: Element, ClassName: string): boolean;
        /**
         * 添加样式
         * @param id 页面元素ID
         * @param ClassList 要添加的样式列表
         * @returns 添加结果
         */
        public static AddClass(id: string, ClassList: string[]): boolean;
        /**
         * 添加样式
         * @param element 页面元素
         * @param ClassList 要添加的样式列表
         * @returns 添加结果
         */
        public static AddClass(element: Element, ClassList: string[]): boolean;
        public static AddClass(element, ClassName): boolean {
            let resM: boolean = false;
            if (!ToolManager.IsNullOrUndefinedOrEmpty(ClassName)) {
                let ClassList: string[] = this.GetClass(element);
                if (!ToolManager.IsNullOrUndefined(ClassList) && ToolManager.GetType(ClassList) === "Array") {
                    let AddClassList: string[];
                    let TypeStr: string = ToolManager.GetType(ClassName);
                    if (TypeStr === "string") {
                        let ClassStr: string = (ClassName as string).replace(/\s{2,}/g, " ");
                        ClassStr = ToolManager.Trim(ClassStr);
                        AddClassList = ClassStr.split(" ");
                    }
                    else if (TypeStr === "Array") {
                        AddClassList = (ClassName as string[]);
                    }
                    if (!ToolManager.IsNullOrUndefined(AddClassList) && ToolManager.GetType(AddClassList) === "Array") {
                        for (let i = 0; i < AddClassList.length; i++) {
                            if (ArrayManager.ArrayIndexOf(ClassList, AddClassList[i]) < 0) {
                                ClassList.push(AddClassList[i]);
                            }
                        }
                        resM = this.SetClass(element, ClassList);
                    }
                }
            }
            return resM;
        }
        /**
         * 删除样式
         * @param id 页面元素ID
         * @param ClassName 要删除的样式
         * @returns 删除结果
         */
        public static RemoveClass(id: string, ClassName: string): boolean;
        /**
         * 删除样式
         * @param element 页面元素
         * @param ClassName 要删除的样式
         * @returns 删除结果
         */
        public static RemoveClass(element: Element, ClassName: string): boolean;
        /**
         * 删除样式
         * @param id 页面元素ID
         * @param ClassList 要删除的样式列表
         * @returns 删除结果
         */
        public static RemoveClass(id: string, ClassList: string[]): boolean;
        /**
         * 删除样式
         * @param element 页面元素
         * @param ClassList 要删除的样式列表
         * @returns 删除结果
         */
        public static RemoveClass(element: Element, ClassList: string[]): boolean;
        public static RemoveClass(element, ClassName): boolean {
            let resM: boolean = false;
            let ClassList: string[] = this.GetClass(element);
            let RemoveClassList: string[];
            if (ToolManager.GetType(ClassName) === "string") {
                let ClassStr: string = (ClassName as string).replace(/\s{2,}/g, " ");
                ClassStr = ToolManager.Trim(ClassStr);
                RemoveClassList = ClassStr.split(" ");
            }
            else {
                RemoveClassList = ClassName;
            }
            for (let i = 0; i < RemoveClassList.length; i++) {
                ArrayManager.ArrayRemove(ClassList, RemoveClassList[i]);
            }
            resM = this.SetClass(element, ClassList);
            return resM;
        }
        /**
         * 是有拥有样式
         * @param id 页面元素ID
         * @param ClassName 要查找的样式
         * @returns 查询结果
         */
        public static HasClass(id: string, ClassName: string): boolean;
        /**
         * 是有拥有样式
         * @param element 页面元素
         * @param ClassName 要查找的样式
         * @returns 查询结果
         */
        public static HasClass(element: Element, ClassName: string): boolean;
        /**
         * 是有拥有样式
         * @param id 页面元素ID
         * @param ClassList 要查找的样式列表
         * @returns 查询结果
         */
        public static HasClass(id: string, ClassList: string[]): boolean;
        /**
         * 是有拥有样式
         * @param element 页面元素
         * @param ClassList 要查找的样式列表
         * @returns 查询结果
         */
        public static HasClass(element: Element, ClassList: string[]): boolean;
        public static HasClass(element, ClassName): boolean {
            let ClassList: string[] = this.GetClass(element);
            let QueryList: string[];
            if (ToolManager.GetType(ClassName) === "string") {
                let ClassStr = (ClassName as string).replace(/\s{2,}/g, " ");
                ClassStr = ToolManager.Trim(ClassStr);
                QueryList = ClassStr.split(" ");
            }
            else {
                QueryList = (ClassName as string[]);
            }
            let IsHave = true;
            for (let i = 0; i < QueryList.length; i++) {
                IsHave = ClassList.indexOf(QueryList[i]) > -1;
                if (!IsHave) {
                    break;
                }
            }
            return IsHave;
        }
        /**
         * 根据ClassName获得元素对象
         * @param id 父元素ID
         * @param className ClassName
         * @returns Element集合
         */
        public static GetElementsByClassName(id: string, className: string): Array<Element>
        /**
         * 根据ClassName获得元素对象
         * @param element 父元素
         * @param className ClassName
         * @returns Element集合
         */
        public static GetElementsByClassName(element: HTMLElement, className: string): Array<Element> | NodeListOf<Element>
        public static GetElementsByClassName(id, className): Array<Element> | NodeListOf<Element> {
            let element: HTMLElement = this.$(id);
            let resultM: Array<Element> = new Array<Element>();
            let elements: NodeListOf<Element>;
            if (!ToolManager.IsNullOrUndefined(element)) {
                if (!ToolManager.IsNullOrUndefined(element.getElementsByClassName)) {
                    elements = element.getElementsByClassName(className);
                    return elements;
                }
                else {
                    elements = element.getElementsByTagName("*");
                    for (let i = 0; i < elements.length; i++) {
                        if (this.HasClass(elements[i], className)) {
                            resultM.push(elements[i]);
                        }
                    }
                    return resultM;
                }
            }
        }
        /**
         * 获得事件触发元素
         * @param event 事件对象
         * @returns 触发元素 
         */
        public static GetEventTarget(event: Event): Element | EventTarget {
            return event.srcElement || event.target
        }
        /**
         * 添加事件
         * @param id 元素ID
         * @param type 事件类型
         * @param fun 执行方法
         */
        public static AddEvent(id: string, type: string, fun: Function): void;
        /**
         * 添加事件
         * @param element 元素
         * @param type 事件类型
         * @param fun 执行方法
         */
        public static AddEvent(element: Element, type: string, fun: Function): void;
        /**
         * 添加事件
         * @param thisWindow window对象
         * @param type 事件类型
         * @param fun 执行方法
         */
        public static AddEvent(thisWindow: Window, type: string, fun: Function): void;
        public static AddEvent(id, type, fun): void {
            let element: HTMLElement = this.$(id);
            if (!ToolManager.IsNullOrUndefined(element) && !ToolManager.IsNullOrUndefined(type) && !ToolManager.IsNullOrUndefined(fun)) {
                if (!ToolManager.IsNullOrUndefined(element.addEventListener)) {
                    element.addEventListener(type, fun);
                }
                else if (!ToolManager.IsNullOrUndefined(element["attachEvent"])) {
                    element["attachEvent"]("on" + type, fun);
                }
            }
        }
        /**
         * 获得子节点
         * @param id 父元素ID
         * @returns 子节点
         */
        public static GetChildren(id: string): HTMLCollection | Array<Node>;
        /**
         * 获得子节点
         * @param element 父元素
         * @returns 子节点
         */
        public static GetChildren(element: Element): HTMLCollection | Array<Node>;
        public static GetChildren(id): HTMLCollection | Array<Node> {
            let children: any;
            let element: HTMLElement = this.$(id);
            if (!ToolManager.IsNullOrUndefined(element)) {
                if (!ToolManager.IsNullOrUndefined(element.children)) {
                    children = element.children;
                }
                else {
                    children = new Array<Node>();
                    let length = element.childNodes.length;
                    for (let i = 0; i < length; i++) {
                        if (element.childNodes[i].nodeType == 1) {
                            (children as Array<Node>).push(element.childNodes[i]);
                        }
                    }
                }
            }
            return children;
        }
        /**
         * 获得自定义属性
         * @param id 父节点ID
         * @returns 自定义属性
         */
        public static GetDataSet(id: string): DOMStringMap | Object;
        /**
         * 获得自定义属性
         * @param element 父节点
         * @returns 自定义属性
         */
        public static GetDataSet(element: Element): DOMStringMap | Object;
        public static GetDataSet(id): DOMStringMap | Object {
            let DataSet: any;
            let element: HTMLElement = this.$(id);
            if (!ToolManager.IsNullOrUndefined(element)) {
                if (!ToolManager.IsNullOrUndefined(element.dataset)) {
                    DataSet = element.dataset;
                }
                else {
                    DataSet = new Object();
                    let length: number = element.attributes.length;
                    let item: any;
                    for (let i = 0; i < length; i++) {
                        item = element.attributes[i];
                        if (!ToolManager.IsNullOrUndefined(item.specified) && /^data-/.test(item.nodeName)) {
                            DataSet[item.nodeName.substring(5)] = item.nodeValue;
                        }
                    }
                }
                return DataSet;
            }
        }
        /**
         * 获得元素的实际样式
         * @param id 元素ID
         * @returns 实际样式
         */
        public static GetComputedStyle(id: string): CSSStyleDeclaration;
        /**
         * 获得元素的实际样式
         * @param element 元素
         * @returns 实际样式
         */
        public static GetComputedStyle(element: Element): CSSStyleDeclaration;
        public static GetComputedStyle(id): CSSStyleDeclaration {
            let element: HTMLElement = this.$(id);
            let cssStyle: CSSStyleDeclaration;
            if (!ToolManager.IsNullOrUndefined(element["currentStyle"])) {
                cssStyle = element["currentStyle"];
            }
            else {
                cssStyle = getComputedStyle(element);
            }
            return cssStyle;
        }
    }
    /**
     *JSON帮助类
     */
    export class JsonManager {
        /**
         * Json字符串转换为Json对象
         * @param JsonStr Json字符串
         * @returns Json对象
         */
        public static JSONParse(JsonStr: string): Object {
            let resM: Object;
            if (!ToolManager.IsNullOrUndefined(JSON.parse)) {
                resM = JSON.parse(JsonStr)
            }
            else {
                resM = eval("(" + JsonStr + ")");
            }
            return resM;
        }
        /**
         * Json对象转换为Json字符串
         * @param JsonObj Json对象
         * @returns Json字符串
         */
        public static JSONStringify(JsonObj: Object): string {
            let resM: string;
            if (!ToolManager.IsNullOrUndefined(JSON.stringify)) {
                resM = JSON.stringify(JsonObj)
            }
            else {
                let IsArray: boolean;
                let TypeStr: string;
                for (let key in JsonObj) {
                    IsArray = false;
                    TypeStr = ToolManager.GetType(JsonObj[key]);
                    if (JsonObj instanceof Array) {
                        IsArray = true;
                    }
                    if (TypeStr == "string") {
                        if (IsArray) {
                            resM += "\"" + JsonObj[key].toString() + "\",";
                        }
                        else {
                            resM += "\"" + key + "\":\"" + JsonObj[key].toString() + "\",";
                        }
                    }
                    else if (JsonObj[key] instanceof RegExp) {
                        if (IsArray) {
                            resM += JsonObj[key].toString() + ",";
                        }
                        else {
                            resM += "\"" + key + "\":\"" + JsonObj[key].toString() + "\",";
                        }
                    }
                    else if (JsonObj[key] instanceof Array) {
                        resM += "\"" + key + "\":" + this.JSONStringify(JsonObj[key]) + ",";
                    }
                    else if (TypeStr == "boolean") {
                        if (IsArray) {
                            resM += JsonObj[key].toString() + ",";
                        }
                        else {
                            resM += "\"" + key + "\":" + JsonObj[key].toString() + ",";
                        }
                    }
                    else if (TypeStr == "number") {
                        if (IsArray) {
                            resM += JsonObj[key].toString() + ",";
                        }
                        else {
                            resM += "\"" + key + "\":" + JsonObj[key].toString() + ",";
                        }
                    }
                    else if (JsonObj[key] instanceof Object) {
                        if (IsArray) {
                            resM += this.JSONStringify(JsonObj[key]) + ",";
                        }
                        else {
                            resM += "\"" + key + "\":" + this.JSONStringify(JsonObj[key]) + ",";
                        }
                    }
                    else if (!JsonObj[key] || JsonObj[key] instanceof Function) {
                        if (IsArray) {
                            resM += "null,";
                        }
                        else {
                            resM += "\"" + key + "\":null,";
                        }
                    }
                }
                if (IsArray) {
                    resM = "[" + resM.slice(0, -1) + "]";
                }
                else {
                    resM = "{" + resM.slice(0, -1) + "}";
                }
            }
            return resM;
        }
    }
    /**
     * 返回结果枚举
     */
    export enum ResultState {
        //成功
        Success = 200,
        //失败
        Failure = 400,
        //发生错误
        Error = 500
    };
    /**
     * 返回模型
     */
    export class ResultModel<T> {
        //返回代码
        private _Code: ResultState;
        get Code(): ResultState {
            return this._Code;
        }
        set Code(code: ResultState) {
            this._Code = code;
            switch (this._Code) {
                case ResultState.Success:
                    this.CodeMessage = "成功";
                    break;
                case ResultState.Failure:
                    this.CodeMessage = "失败";
                    break;
                case ResultState.Error:
                    this.CodeMessage = "错误";
                    break;
            }
        }
        //返回代码描述
        public CodeMessage: string;
        //返回信息
        public Message: string;
        //返回数据
        public Data: T;
        /**
         * 构造方法
         * @param model 返回数据
         * @param Message 返回信息
         * @param code 返回代码
         */
        constructor(model: T, Message: string, code: ResultState = ResultState.Success) {
            this.Message = Message;
            this.Data = model;
        }
        /**
         * 获得一个成功的返回
         * @param model 返回数据
         * @param Message 返回信息
         * @returns
         */
        public static GetSuccessReult<T>(model: T, Message: string = "成功"): ResultModel<T> {
            return new ResultModel<T>(model, Message, ResultState.Success);
        }
        /**
         * 获得一个失败的返回
         * @param model 返回数据
         * @param Message 返回信息
         * @returns
         */
        public static GetFailureReult<T>(model: T, Message: string = "失败"): ResultModel<T> {
            return new ResultModel<T>(model, Message, ResultState.Failure);
        }
        /**
         * 获得一个错误的返回
         * @param model 返回数据
         * @param Message 返回信息
         * @returns
         */
        public static GetErrorReult<T>(model: T, Message: string = "程序出错了"): ResultModel<T> {
            return new ResultModel<T>(model, Message, ResultState.Error);
        }
    }
    /**
     * Http配置类
     */
    export class HttpConfigModel {
        //URL地址
        public url: string;
        //要发送的数据
        public data: Object;
        //成功方法
        public success: Function;
        //失败方法
        public error: Function;
        //成功错误都执行的方法
        public complete: Function;
        //类型
        public type: string;
        //超时时间
        public timeout: number = 15000;
        //异步发送
        public async: boolean = true;
        //数据类型
        public dataType: string;
        /**
         * 
         * @param url
         * @param type
         * @param data
         * @param dataType
         * @param success
         * @param error
         * @param complete
         */
        constructor(url: string, type: string = "post", data: Object = null, dataType: string = "json", success: Function = null, error: Function = null, complete: Function = null) {
            this.url = url;
            this.type = type;
            this.data = data;
            this.dataType = dataType;
            this.success = success;
            this.error = error;
            this.complete = complete;
        }
    }
    /**
     * Http帮助类
     */
    export class HttpManager {
        /**
         * 获取XMLHttpRequest对象
         * @param config 配置对象
         * @returns HttpRequest对象
         */
        private static GetHttpRequest(config: HttpConfigModel): XMLHttpRequest {
            let xhr: XMLHttpRequest;
            if (!ToolManager.IsNullOrUndefined(window["XMLHttpRequest"])) {
                xhr = new XMLHttpRequest();
            }
            else {
                xhr = new ActiveXObject("Microsoft.XMLHTTP");
            }
            xhr.onreadystatechange = function () {
                HttpManager.Readystatechange(xhr, config);
            }
            return xhr;
        }
        /**
         * 状态更改方法
         * @param xhr XMLHttpRequest对象
         * @param config 配置对象
         */
        private static Readystatechange(xhr: XMLHttpRequest, config: HttpConfigModel): void {
            if (xhr.readyState == 4) {
                let res: Object;
                switch (config.dataType) {
                    case "json":
                        res = JsonManager.JSONParse(xhr.responseText);
                        break;
                    default:
                        res = xhr.responseText;
                        break;
                }
                if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
                    if (config.complete) {
                        config.complete(xhr, res);
                    }
                    if (config.success) {
                        config.success(res);
                    }
                }
                else {
                    if (config.complete) {
                        config.complete(xhr, res);
                    }
                    if (config.error) {
                        config.error(xhr, xhr.status, res);
                    }
                }
            }
        }
        /**
         * 序列化参数
         * @param data 要序列化的参数
         * @returns 序列化后的字符串 
         */
        private static serialize(data: Object): string {
            let result: string[] = new Array<string>();
            let value: string = "";
            for (let name in data) {
                if (typeof data[name] === "function") {
                    continue;
                }
                if (ToolManager.GetType(data[name]) == "Object") {
                    result.push(HttpManager.serialize(data[name]));
                }
                else {
                    name = encodeURIComponent(name);
                    value = data[name].toString();
                    value = encodeURIComponent(value);
                    result.push(name + "=" + value);
                }
            };
            return result.join("&");
        }
        /**
         * 发送Post请求
         * @param config 配置对象
         */
        private static SendPost(config: HttpConfigModel): void {
            let xhr: XMLHttpRequest = HttpManager.GetHttpRequest(config);
            xhr.open(config.type, config.url, config.async);
            xhr.setRequestHeader("Content-type", "application/json");
            if (config.data) {
                xhr.send(JSON.stringify(config.data));
            }
            else {
                xhr.send(null);
            }
        }
        /**
         * 发送Get请求
         * @param config 配置对象
         */
        private static SendGet(config: HttpConfigModel): void {
            let xhr: XMLHttpRequest = HttpManager.GetHttpRequest(config);
            config.type = config.type.toLowerCase();
            let url: string = config.url;
            if (config.data) {
                url += "?" + HttpManager.serialize(config.data);
            }
            xhr.open(config.type, url, config.async);
            xhr.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
            xhr.send(null);
        }
        /**
         * 发送请求
         * @param config 配置对象
         */
        public static Send(config: HttpConfigModel): void {
            config.type = config.type.toLowerCase();
            if (config.type == "post") {
                HttpManager.SendPost(config);
            }
            else {
                HttpManager.SendGet(config);
            }
        }
    }
    /**
     * 加密帮助类
     */
    export class EncryptionManager {
        /**
         * 获取32位MD5加密字符串
         * @param Str 要加密的字符串
         * @param IsLower 是小写
         * @returns 加密后的字符串
         */
        public static Get32MD5Str(Str: string, IsLower: boolean = false): string {
            function l(a) {
                return h(g(o(a), a.length * 8));
            }
            function m(e) {
                let b = "0123456789ABCDEF";
                if (IsLower === true) {
                    b = b.toLowerCase();
                }
                let c = "";
                let d;
                for (let a = 0; a < e.length; a++) {
                    d = e.charCodeAt(a);
                    c += b.charAt(d >>> 4 & 15) + b.charAt(d & 15);
                }
                return c;
            }
            function n(d) {
                let b = "";
                let c = -1;
                let a, e;
                while (++c < d.length) {
                    a = d.charCodeAt(c),
                        e = c + 1 < d.length ? d.charCodeAt(c + 1) : 0;
                    55296 <= a && a <= 56319 && 56320 <= e && e <= 57343 && (a = 65536 + ((a & 1023) << 10) + (e & 1023), c++);
                    a <= 127 ? b += String.fromCharCode(a) : a <= 2047 ? b += String.fromCharCode(192 | a >>> 6 & 31, 128 | a & 63) : a <= 65535 ? b += String.fromCharCode(224 | a >>> 12 & 15, 128 | a >>> 6 & 63, 128 | a & 63) : a <= 2097151 && (b += String.fromCharCode(240 | a >>> 18 & 7, 128 | a >>> 12 & 63, 128 | a >>> 6 & 63, 128 | a & 63));
                }
                return b;
            }
            function o(c) {
                let b = Array(c.length >> 2);
                for (let a = 0; a < b.length; a++) {
                    b[a] = 0;
                }
                for (let a = 0; a < c.length * 8; a += 8) {
                    b[a >> 5] |= (c.charCodeAt(a / 8) & 255) << a % 32;
                }
                return b;
            }
            function h(c) {
                let b = "";
                for (let a = 0; a < c.length * 32; a += 8) {
                    b += String.fromCharCode(c[a >> 5] >>> a % 32 & 255);
                }
                return b;
            }
            function g(j, l) {
                j[l >> 5] |= 128 << l % 32, j[(l + 64 >>> 9 << 4) + 14] = l;
                let g = 1732584193;
                let h = -271733879;
                let i = -1732584194;
                let f = 271733878;
                for (let k = 0; k < j.length; k += 16) {
                    let n = g;
                    let o = h;
                    let p = i;
                    let m = f;
                    g = a(g, h, i, f, j[k + 0], 7, -680876936);
                    f = a(f, g, h, i, j[k + 1], 12, -389564586);
                    i = a(i, f, g, h, j[k + 2], 17, 606105819);
                    h = a(h, i, f, g, j[k + 3], 22, -1044525330);
                    g = a(g, h, i, f, j[k + 4], 7, -176418897);
                    f = a(f, g, h, i, j[k + 5], 12, 1200080426);
                    i = a(i, f, g, h, j[k + 6], 17, -1473231341);
                    h = a(h, i, f, g, j[k + 7], 22, -45705983);
                    g = a(g, h, i, f, j[k + 8], 7, 1770035416);
                    f = a(f, g, h, i, j[k + 9], 12, -1958414417);
                    i = a(i, f, g, h, j[k + 10], 17, -42063);
                    h = a(h, i, f, g, j[k + 11], 22, -1990404162);
                    g = a(g, h, i, f, j[k + 12], 7, 1804603682);
                    f = a(f, g, h, i, j[k + 13], 12, -40341101);
                    i = a(i, f, g, h, j[k + 14], 17, -1502002290);
                    h = a(h, i, f, g, j[k + 15], 22, 1236535329);
                    g = b(g, h, i, f, j[k + 1], 5, -165796510);
                    f = b(f, g, h, i, j[k + 6], 9, -1069501632);
                    i = b(i, f, g, h, j[k + 11], 14, 643717713);
                    h = b(h, i, f, g, j[k + 0], 20, -373897302);
                    g = b(g, h, i, f, j[k + 5], 5, -701558691);
                    f = b(f, g, h, i, j[k + 10], 9, 38016083);
                    i = b(i, f, g, h, j[k + 15], 14, -660478335);
                    h = b(h, i, f, g, j[k + 4], 20, -405537848);
                    g = b(g, h, i, f, j[k + 9], 5, 568446438);
                    f = b(f, g, h, i, j[k + 14], 9, -1019803690);
                    i = b(i, f, g, h, j[k + 3], 14, -187363961);
                    h = b(h, i, f, g, j[k + 8], 20, 1163531501);
                    g = b(g, h, i, f, j[k + 13], 5, -1444681467);
                    f = b(f, g, h, i, j[k + 2], 9, -51403784);
                    i = b(i, f, g, h, j[k + 7], 14, 1735328473);
                    h = b(h, i, f, g, j[k + 12], 20, -1926607734);
                    g = c(g, h, i, f, j[k + 5], 4, -378558);
                    f = c(f, g, h, i, j[k + 8], 11, -2022574463);
                    i = c(i, f, g, h, j[k + 11], 16, 1839030562);
                    h = c(h, i, f, g, j[k + 14], 23, -35309556);
                    g = c(g, h, i, f, j[k + 1], 4, -1530992060);
                    f = c(f, g, h, i, j[k + 4], 11, 1272893353);
                    i = c(i, f, g, h, j[k + 7], 16, -155497632);
                    h = c(h, i, f, g, j[k + 10], 23, -1094730640);
                    g = c(g, h, i, f, j[k + 13], 4, 681279174);
                    f = c(f, g, h, i, j[k + 0], 11, -358537222);
                    i = c(i, f, g, h, j[k + 3], 16, -722521979);
                    h = c(h, i, f, g, j[k + 6], 23, 76029189);
                    g = c(g, h, i, f, j[k + 9], 4, -640364487);
                    f = c(f, g, h, i, j[k + 12], 11, -421815835);
                    i = c(i, f, g, h, j[k + 15], 16, 530742520);
                    h = c(h, i, f, g, j[k + 2], 23, -995338651);
                    g = d(g, h, i, f, j[k + 0], 6, -198630844);
                    f = d(f, g, h, i, j[k + 7], 10, 1126891415);
                    i = d(i, f, g, h, j[k + 14], 15, -1416354905);
                    h = d(h, i, f, g, j[k + 5], 21, -57434055);
                    g = d(g, h, i, f, j[k + 12], 6, 1700485571);
                    f = d(f, g, h, i, j[k + 3], 10, -1894986606);
                    i = d(i, f, g, h, j[k + 10], 15, -1051523);
                    h = d(h, i, f, g, j[k + 1], 21, -2054922799);
                    g = d(g, h, i, f, j[k + 8], 6, 1873313359);
                    f = d(f, g, h, i, j[k + 15], 10, -30611744);
                    i = d(i, f, g, h, j[k + 6], 15, -1560198380);
                    h = d(h, i, f, g, j[k + 13], 21, 1309151649);
                    g = d(g, h, i, f, j[k + 4], 6, -145523070);
                    f = d(f, g, h, i, j[k + 11], 10, -1120210379);
                    i = d(i, f, g, h, j[k + 2], 15, 718787259);
                    h = d(h, i, f, g, j[k + 9], 21, -343485551);
                    g = e(g, n);
                    h = e(h, o);
                    i = e(i, p);
                    f = e(f, m);
                }
                return Array(g, h, i, f);
            }
            function f(a, b, c, d, f, g) {
                return e(j(e(e(b, a), e(d, g)), f), c);
            }
            function a(b, a, c, d, e, g, h) {
                return f(a & c | ~a & d, b, a, e, g, h);
            }
            function b(c, a, d, b, e, g, h) {
                return f(a & b | d & ~b, c, a, e, g, h);
            }
            function c(b, a, c, d, e, g, h) {
                return f(a ^ c ^ d, b, a, e, g, h);
            }
            function d(b, a, c, d, e, g, h) {
                return f(c ^ (a | ~d), b, a, e, g, h);
            }
            function e(b, c) {
                let a = (b & 65535) + (c & 65535);
                let d = (b >> 16) + (c >> 16) + (a >> 16);
                return d << 16 | a & 65535;
            }
            function j(a, b) {
                return a << b | a >>> 32 - b;
            }
            return m(l(n(Str)));
        }
        /**
         * 获取16位MD5加密字符串
         * @param Str 要加密的字符串
         * @param IsLower 是小写
         * @returns 加密后的字符串
         */
        public static Get16MD5Str(Str: string, IsLower: boolean = false): string {
            return this.Get32MD5Str(Str, IsLower).substr(8, 16);
        }
        /**
         * 转换为二进制字符串
         * @param Str 要转换的字符串
         * @returns 转换后的字符串 
         */
        public static ConvertToBinary(Str: string): string {
            let StrList: string = Array.prototype.map.call(Str, function (c) {
                return c.charCodeAt(0).toString(2);
            });
            let resStr: string = "";
            for (let i = 0; i < StrList.length; i++) {
                resStr += ToolManager.StrCover(StrList[i], 8, "0", true);
            }
            return resStr;
        }
    }
    /**
     * 数学帮助类
     */
    export class MathManager {
        /**
         * 返回一个随机数
         * @param Min 最小值
         * @param Max 最大值
         * @returns 随机数
         */
        public GetRandom(Min: number, Max: number): number {
            return Math.floor(Math.random() * Max + Min);
        }
        /**
         * 获取四边形的外接圆半径
         * @param length 长
         * @param width 宽
         * @param IsRound 是圆形
         */
        public GetCircumcircleRadius(length: number, width: number = length, IsRound: boolean = true): number {
            let max: number = Math.max(length, width);
            //正方形的对角线=边长^2*2
            let diameter: number = Math.sqrt(Math.pow(max, 2) * 2);
            //外接圆的直径=正方形的对角线
            //圆的半径=直径/2
            let radius: number = diameter / 2;
            if (IsRound) {
                radius = Math.round(radius);
            }
            return radius;
        }
    }
    /**
     * 本地存储帮助类
     */
    export class LocalDataManager {
        /**
         * 是否支持本地存储
         * @returns 是否支持
         */
        public static IsLocalStorage(): boolean {
            if (window.localStorage) {
                return true;
            }
            else {
                return false;
            }
        }
        /**
         * 清空本地存储对象
         */
        public static CleanLocalData(): void {
            if (this.IsLocalStorage() == true) {
                window.localStorage.clear();
            }
        }
        /**
         * 移除本地存储对象
         * @param Key Key值
         */
        public static RemoveLocalData(Key: string): void {
            if (this.IsLocalStorage() == true && Key) {
                window.localStorage.removeItem(Key);
            }
        }
        /**
         * 设置本地存储对象
         * @param Key Key值
         * @param Value 要保存的数据
         * @param IsJson 以Json格式保存
         */
        public static SetLocalData(Key: string, Value: Object, IsJson: boolean): void
        /**
         * 设置本地存储对象
         * @param Key Key值
         * @param Value 要保存的数据
         * @param IsJson 以Json格式保存
         */
        public static SetLocalData(Key: string, Value: string, IsJson: boolean): void
        /**
         * 设置本地存储对象
         * @param Key Key值
         * @param Value 要保存的数据
         * @param IsJson 以Json格式保存
         */
        public static SetLocalData(Key: string, Value: string[], IsJson: boolean): void
        public static SetLocalData(Key, Value, IsJson = true): void {
            if (this.IsLocalStorage() && Key && Value) {
                this.RemoveLocalData(Key);
                if (IsJson) {
                    window.localStorage.setItem(Key, JSON.stringify(Value));
                }
                else {
                    window.localStorage.setItem(Key, Value.toString());
                }
            }
        }
        /**
         * 获取本地存储对象
         * @param Key Key值
         * @param IsJson 以Json格式获取
         * @returns 获取的数据 
         */
        public static GetLocalData(Key: string, IsJson: boolean = true): Object | string {
            if (this.IsLocalStorage() == true && Key) {
                if (IsJson) {
                    return JSON.parse(window.localStorage.getItem(Key));
                }
                else {
                    return window.localStorage.getItem(Key);
                }
            }
            return null;
        }
        /**
         * 是否支持网页存储
         * @returns 是否支持 
         */
        public static IsSessionStorage(): boolean {
            if (window.sessionStorage) {
                return true;
            }
            else {
                return false;
            }
        }
        /**
         * 清空网页存储对象
         */
        public static CleanSessionData(): void {
            if (this.IsSessionStorage() == true) {
                window.sessionStorage.clear();
            }
        }
        /**
         * 移除网页存储对象
         * @param Key Key值
         */
        public static RemoveSessionData(Key: string) {
            if (this.IsSessionStorage() == true && Key) {
                window.sessionStorage.removeItem(Key);
            }
        }
        /**
         * 设置网页存储对象
         * @param Key Key值
         * @param Value 要保存的数据
         * @param IsJson 以Json格式保存
         */
        public static SetSessionData(Key: string, Value: Object, IsJson: boolean): void
        /**
         * 设置网页存储对象
         * @param Key Key值
         * @param Value 要保存的数据
         * @param IsJson 以Json格式保存
         */
        public static SetSessionData(Key: string, Value: string, IsJson: boolean): void
        /**
         * 设置网页存储对象
         * @param Key Key值
         * @param Value 要保存的数据
         * @param IsJson 以Json格式保存
         */
        public static SetSessionData(Key: string, Value: string[], IsJson: boolean): void
        public static SetSessionData(Key, Value, IsJson) {
            if (!IsJson && IsJson != false) {
                IsJson = true;
            }
            if (this.IsSessionStorage() && Key && Value) {
                this.RemoveSessionData(Key);
                if (IsJson) {
                    window.sessionStorage.setItem(Key, JSON.stringify(Value));
                }
                else {
                    window.sessionStorage.setItem(Key, Value.toString());
                }
            }
        }
        /**
         * 获取网页存储对象
         * @param Key Key值
         * @param IsJson 以Json格式获取
         * @returns 获取的数据 
         */
        public static GetSessionData(Key: string, IsJson: boolean = true): Object | string {
            if (this.IsSessionStorage() == true && Key) {
                if (IsJson) {
                    return JSON.parse(window.sessionStorage.getItem(Key));
                }
                else {
                    return window.sessionStorage.getItem(Key);
                }
            }
            return null;
        }
        /**
         * 获得有效时间
         * @param Value 值(默认60)
         * @param Type 单位(默认m[分钟])
         * @returns 计算后的时间
         */
        private static GetTimer(Value: number = 60, Type: string = "m"): number {
            if (!Type) {
                Type = "m";
            }
            if (!Value) {
                Value = 60;
            }
            switch (Type) {
                case "y":
                    Value = 60 * 60 * 24 * 365 * Value;
                    break;
                case "M":
                    Value = 60 * 60 * 24 * 30 * Value;
                    break;
                case "d":
                    Value = 60 * 60 * 24 * Value;
                    break;
                case "H":
                    Value = 60 * 60 * Value;
                    break;
                case "m":
                    Value = 60 * Value;
                    break;
                case "s":
                    Value = Value;
                    break;
                default:
                    break;
            }
            return Value;
        }
        /**
         * 设置一个Cookie
         * @param Key Key值
         * @param Value 要保存的值
         * @param Timer 持续时间
         * @param TimerType 单位(默认s[秒])
         */
        public static SetCookie(Key: string, Value: string, IsJson: boolean = true, Timer: number = 60, TimerType: string = "m") {
            if (!IsJson && IsJson != false) {
                IsJson = true;
            }
            if (IsJson) {
                document.cookie = Key + "=" + JSON.stringify(Value) + ";max-age=" + this.GetTimer(Timer, TimerType);
            }
            else {
                document.cookie = Key + "=" + Value + ";max-age=" + this.GetTimer(Timer, TimerType);
            }
        }
        /**
         * 删除一个Cookie
         * @param Key Key值
         */
        public static RemoveCookie(Key: string) {
            document.cookie = Key + "=;max-age=0";
        }
        /**
         * 获得所有Cookie
         * @returns Cookie对象 
         */
        public static GetAllCookie(): Object {
            let cookies: string[] = document.cookie.split(";");
            let cookie: Array<string[]> = new Array();
            let LocalCookie = new Object();
            for (var i = 0; i < cookies.length; i++) {
                if (!ToolManager.IsNullOrUndefinedOrEmpty(cookies[i])) {
                    cookie[i] = cookies[i].trim().split("=");
                    if (cookie[i][0] && cookie[i][1]) {
                        LocalCookie[cookie[i][0]] = cookie[i][1];
                    }
                }
            }
            return LocalCookie;
        }
        /**
         * 获得Cookie
         * @param Key Key值
         * @param IsJson 是否为Json格式
         * @returns
         */
        public static GetCookie(Key: string, IsJson: boolean): Object {
            if (!IsJson && IsJson != false) {
                IsJson = true;
            }
            let resM: Object = this.GetAllCookie();
            if (IsJson && !ToolManager.IsNullOrUndefined(resM) && !ToolManager.IsNullOrUndefined(resM[Key])) {
                return JSON.parse(resM[Key]);
            }
            else {
                return null;
            }
        }
        /**
         * 设置数据
         * @param Key Key值
         * @param Value 要保存的数据
         * @param IsJson 以Json格式保存
         */
        public static SetData(Key: string, Value: Object, IsJson: boolean, Timer: number, TimerType: string): void
        /**
         * 设置数据
         * @param Key Key值
         * @param Value 要保存的数据
         * @param IsJson 以Json格式保存
         */
        public static SetData(Key: string, Value: string, IsJson: boolean, Timer: number, TimerType: string): void
        /**
         * 设置数据
         * @param Key Key值
         * @param Value 要保存的数据
         * @param IsJson 以Json格式保存
         */
        public static SetData(Key: string, Value: string[], IsJson: boolean, Timer: number, TimerType: string): void
        public static SetData(Key, Value, IsJson, Timer = 60, TimerType = "m"): void {
            if (this.IsLocalStorage()) {
                this.SetLocalData(Key, Value, IsJson);
            }
            else {
                this.SetCookie(Key, Value, IsJson, Timer, TimerType);
            }
        }
        /**
         * 获得数据
         * @param Key Key值
         * @param IsJson 是否为Json格式
         * @returns [0]是localStorage [1]是Cookie
         */
        public static GetData(Key: string, IsJson: boolean = true): Array<Object> | Array<string> {
            let resM = [];
            resM.push(this.GetLocalData(Key, IsJson));
            resM.push(this.GetCookie(Key, IsJson));
            return resM;
        }
    }
    /**
     * 实现引擎模型
     */
    export class EngineInfoModel {
        //是否为Trident引擎
        public Trident: boolean = false;
        //是否为Gecko引擎
        public Gecko: boolean = false;
        //是否为WebKit引擎
        public WebKit: boolean = false;
        //是否为KHTML引擎
        public KHTML: boolean = false;
        //是否为Presto引擎
        public Presto: boolean = false;
        //具体版本号
        public Version: string = "";
    }
    /**
     * 浏览器模型
     */
    export class BrowserInfoModel {
        //是否为IE浏览器
        public IE: boolean = false;
        //是否为Firefox浏览器
        public Firefox: boolean = false;
        //是否为Safari浏览器
        public Safari: boolean = false;
        //是否为Konqueror浏览器
        public Konqueror: boolean = false;
        //是否为Opera浏览器
        public Opera: boolean = false;
        //是否为Chrome浏览器
        public Chrome: boolean = false;
        //是否为Edge浏览器
        public Edge: boolean = false;
        //是否为QQ浏览器
        public QQ: boolean = false;
        //是否为UC浏览器
        public UC: boolean = false;
        //是否为Maxthon(遨游)浏览器
        public Maxthon: boolean = false;
        //具体版本号
        public Version: string = "";
    }
    /**
     * 系统模型
     */
    export class SystemInfoModel {
        //是否为Windows操作系统
        public Windows: boolean = false;
        //是否为WindowsMobile操作系统
        public WindowsMobile: boolean = false;
        //Windows版本
        public WindowsVersion: string = "";
        //是否为Mac操作系统
        public Mac: boolean = false;
        //是否为Unix操作系统
        public Unix: boolean = false;
        //是否为Linux操作系统
        public Linux: boolean = false;
        //是否为iPhone操作系统
        public iPhone: boolean = false;
        //是否为iPod操作系统
        public iPod: boolean = false;
        //是否为Windows操作系统
        public iPad: boolean = false;
        //是否为Windows操作系统
        public IOS: boolean = false;
        //IOS版本
        public IOSVersion: string = "";
        //是否为Android操作系统
        public Android: boolean = false;
        //Android版本
        public AndroidVersion: string = "";
        //是否为NokiaN操作系统
        public NokiaN: boolean = false;
        //是否为Wii操作系统
        public Wii: boolean = false;
        //是否为PS操作系统
        public PS: boolean = false;
    }
    /**
     * 客户端信息模型
     */
    export class ClientInfoModel {
        private _engineM: EngineInfoModel = new EngineInfoModel();
        private _browserM: BrowserInfoModel = new BrowserInfoModel();
        private _systemM: SystemInfoModel = new SystemInfoModel();
        /**
         * 实现引擎信息
         */
        public get EngineInfoM(): EngineInfoModel {
            return (ObjectManager.Clone(this._engineM) as EngineInfoModel);
        }
        /**
         * 浏览器信息
         */
        public get BrowserInfoM(): BrowserInfoModel {
            return (ObjectManager.Clone(this._browserM) as BrowserInfoModel);
        }
        /**
         * 系统信息
         */
        public get SystemInfoM(): SystemInfoModel {
            return (ObjectManager.Clone(this._systemM) as SystemInfoModel);
        }
        /**
         * 客户端信息模型
         */
        constructor() {
            //检测呈现引擎和浏览器
            let userAgent: string = navigator.userAgent;
            if (!ToolManager.IsNullOrUndefined(window["opera"])) {
                this._engineM.Version = this._engineM.Version = window["opera"].version();
                this._engineM.Presto = this._browserM.Opera = true;
            }
            else if (/AppleWebKit\/(\S+)/.test(userAgent)) {
                this._engineM.Version = RegExp["$1"];
                this._engineM.WebKit = true;
                if (/Edge\/(\S+)/.test(userAgent)) {
                    this._browserM.Version = RegExp["$1"];
                    this._browserM.Edge = true;
                }
                else if (/QQBrowser\/(\S+)/.test(userAgent)) {
                    this._browserM.Version = RegExp["$1"];
                    this._browserM.QQ = true;
                }
                else if (/UBrowser\/(\S+)/.test(userAgent)) {
                    this._browserM.Version = RegExp["$1"];
                    this._browserM.UC = true;
                }
                else if (/Maxthon\/(\S+)/.test(userAgent)) {
                    this._browserM.Version = RegExp["$1"];
                    this._browserM.Maxthon = true;
                }
                else if (/Chrome\/(\S+)/.test(userAgent)) {
                    this._browserM.Version = RegExp["$1"];
                    this._browserM.Chrome = true;
                }
                else if (/Safari\/(\S+)/.test(userAgent)) {
                    this._browserM.Version = RegExp["$1"];
                    this._browserM.Safari = true;
                }
                else {
                    if (this._engineM.WebKit) {
                        let safariVersion: string = "";
                        let WebKitVersion: number = parseInt(this._engineM.Version);
                        if (WebKitVersion < 100) {
                            safariVersion = "1";
                        }
                        else if (WebKitVersion < 312) {
                            safariVersion = "1.2";
                        }
                        else if (WebKitVersion < 412) {
                            safariVersion = "1.3";
                        }
                        else {
                            safariVersion = "2";
                        }
                        this._browserM.Version = safariVersion;
                        this._browserM.Safari = true;
                    }
                }
            }
            else if (/KHTML\/(\S+)/.test(userAgent) || /Konqueror\/([^;]+)/.test(userAgent)) {
                this._engineM.Version = this._browserM.Version = RegExp["$1"];
                this._engineM.KHTML = this._browserM.Konqueror = true;
            }
            else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(userAgent)) {
                this._engineM.Version = RegExp["$1"];
                this._engineM.Gecko = true;
                if (/Firefox\/(\S+)/.test(userAgent)) {
                    this._browserM.Version = RegExp["$1"];
                    this._browserM.Firefox = true;
                }
            }
            else if (/MSIE ([^;]+)/.test(userAgent)) {
                this._engineM.Version = this._browserM.Version = RegExp["$1"];
                this._engineM.Trident = this._browserM.IE = true;
            }
            else {
                if (!ToolManager.IsNullOrUndefined(window["ActiveXObject"]) || "ActiveXObject" in window) {
                    this._engineM.Version = this._browserM.Version = "11";
                    this._engineM.Trident = this._browserM.IE = true
                }
            }
            //检测平台
            var p = navigator.platform;
            this._systemM.Windows = p.indexOf("Win") == 0;
            if (this._systemM.Windows) {
                if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(userAgent)) {
                    if (RegExp["$1"] == "NT") {
                        switch (RegExp["$2"]) {
                            case "5.0":
                                this._systemM.WindowsVersion = "2000";
                                break;
                            case "5.1":
                                this._systemM.WindowsVersion = "XP";
                                break;
                            case "6.0":
                                this._systemM.WindowsVersion = "Vista";
                                break;
                            case "6.1":
                                this._systemM.WindowsVersion = "7";
                                break;
                            case "6.2":
                                this._systemM.WindowsVersion = "8";
                                break;
                            case "10.0":
                                this._systemM.WindowsVersion = "10";
                                break;
                            default:
                                this._systemM.WindowsVersion = "NT";
                                break;
                        }
                    }
                    else if (RegExp["$1"] == "9X") {
                        this._systemM.WindowsVersion = "ME";
                    }
                    else {
                        this._systemM.WindowsVersion = RegExp["$1"];
                    }
                }
                if (this._systemM.WindowsVersion == "CE") {
                    this._systemM.WindowsMobile = true;
                }
                else if (this._systemM.WindowsVersion == "Ph") {
                    if (/Windows Phone OS (\d+.\d+)/.test(userAgent)) {
                        this._systemM.WindowsMobile = true;
                    }
                }
            }
            this._systemM.Mac = p.indexOf("Mac") == 0;
            if (this._systemM.Mac && userAgent.indexOf("Mobile") > -1) {
                if (/CPU (?:iPhone)?OS (\d+_\d+)/.test(userAgent)) {
                    this._systemM.IOS = true;
                    this._systemM.IOSVersion = RegExp["$1"].replace("_", ".");
                }
                else {
                    this._systemM.IOS = true;
                    this._systemM.IOSVersion = "2";
                }
            }
            this._systemM.Unix = p.indexOf("X11") == 0;
            this._systemM.Linux = p.indexOf("Linux") == 0;
            this._systemM.iPhone = p.indexOf("iPhone") == 0;
            this._systemM.iPod = p.indexOf("iPod") == 0;
            this._systemM.iPad = p.indexOf("iPad") == 0;
            this._systemM.NokiaN = userAgent.indexOf("NokiaN") > -1;
            this._systemM.Wii = userAgent.indexOf("Wii") > -1;
            this._systemM.PS = /playstation/i.test(userAgent);
            if (/Android (\d+\.\d+)/.test(userAgent)) {
                this._systemM.Android = true;
                this._systemM.AndroidVersion = RegExp["$1"];
            }
        }
    }
}