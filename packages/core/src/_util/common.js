export function isObject(input) {
    return Object
        .prototype
        .toString
        .call(input) === '[object Object]';
}

export function isArray(input) {
    return Object
        .prototype
        .toString
        .call(input) === '[object Array]';
}

export function px2num(val) {
    return Number(val.replace('px', ''));
}

export function calcScale(parentEl, childEl, padding = 0) {
    const parentStyle = window.getComputedStyle(parentEl);
    const childStyle = window.getComputedStyle(childEl);

    const parentHeight = px2num(parentStyle.height);
    const parentWidth = px2num(parentStyle.width);

    const childHeight = px2num(childStyle.height);
    const childWidth = px2num(childStyle.width);

    let scale = 1;

    if (childHeight + padding > parentHeight) 
        scale = parentHeight / (childHeight + padding);
    
    if (childWidth + padding > parentWidth) 
        scale = parentWidth / (childWidth + padding);
    
    return scale;
}

/**
 * 工具函数 把对象编码成 key1=value1&key2=value
 *
 * @exports
 * @param {Object} body
 * @returns {String}
 */
export function serialize(body) {
    let paramArr = [];
    for (let key in body) {
        paramArr.push(`${key}=${body[key]}`);
    }
    return paramArr.join('&');
}

/**
 * 枚举常量函数
 *
 * @exports
 * @param {Array} args
 * @returns ｛Object｝
 */
export function enumConstants(...args) {
    var constants = {};
    for (var key in args) {
        constants[args[key]] = args[key];
    }
    return constants;
}

let idCounter = 0;
/**
 * 生成唯一键值
 *
 * @exports
 * @param {String} prefix
 * @returns {String}
 */
export function uniqueIdCreator(prefix) {
    return prefix
        ? `${prefix}${idCounter++}`
        : `${idCounter++}`;

}

/**
 * 深度复制对象
 *
 * @exports
 * @param {any} obj
 * @returns {Object}
 */
export function deepCloneObj(obj) {
    if (typeof obj === 'object') {
        if (isArray(obj)) {
            let newArr = [];
            for (let i = 0; i < obj.length; i++) {
                newArr.push(deepCloneObj(obj[i]));
            }
            return newArr;
        } else {
            let newObj = {};
            for (let key in obj) {
                newObj[key] = deepCloneObj(obj[key]);
            }
            return newObj;
        }
    } else {
        return obj;
    }
}

/**
 * 获取字符串长度 Ascii字符长度为1，中文长度为2
 *
 * @exports
 * @param {String} str
 * @return {Object}
 */
export function getStringLength(str) {
    if (typeof str !== 'string') 
        return 0;
    return str
        .trim()
        .replace(/[^\x00-\xff]/g, 'aa')
        .length;
}
/**
 * 生成公共组件容器
 *
 * @exports
 * @param {string} id
 * @param {Object} properties
 * @returns {Object}
 */
export function getContainer(id, properties) {
    let div = document.getElementById(id);
    if (!div) {
        const {getContainer} = properties || {};

        if (getContainer) {
            div = getContainer(id);
        } else {
            div = document.createElement('div');
            document
                .body
                .appendChild(div);
            div.id = id
        }
    }
    return div;
}

/**
 * 数组转对象
 *
 * @exports
 * @param {Array} arr
 * @param {String} key
 * @param {Boolean} needIdx
 * @returns Object
 */
export function arr2Obj(arr, key, needIdx) {
    let obj = {};
    arr.forEach((item, idx) => {
        if(!item) return;
        
        if (key && item[key]) {
            obj[item[key]] = deepCloneObj(item);
            if (needIdx) {
                obj[item[key]].__idx__ = idx;
            }
        } else {
            obj[idx] = deepCloneObj(item);
            if (needIdx) {
                obj[idx].__idx__ = idx;
            }
        }
    });
    return obj;
}

/**
 * 数组转对象 Immutable版
 *
 * @exports
 * @param {Immutable.List} arr_i
 * @param {String} key
 */
export function arr2Obj4I(arr_i, key) {
    let obj = {}

    arr_i = arr_i || [];
    
    arr_i.forEach((item_i, idx) => {
        if (key && item_i.get(key)) {
            obj[item_i.get(key)] = item_i;
        } else {
            obj[idx] = item_i;
        }
    });

    return obj;
}

/**
 * 判断是否为空
 *
 * @exports
 * @param {any} obj
 * @returns boolean
 */
export function isEmpty(obj) {
    if (obj == null) 
        return true;
    else if (isArray(obj) || typeof obj === 'string') 
        return obj.length === 0;
    else if (typeof obj === 'Object')
        return Object.keys(obj).length === 0;

    return false;
}

/**
 * uuid生成函数
 *
 * @export
 * @param {Number} 长度
 * @param {Number} 基数
 * @returns
 */
export function uuid(len, radix = 10) {
    const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'.split('');
    let uuid = [],
        i;
    radix = radix || chars.length;

    if (len) {
        for (i = 0; i < len; i++) {
            uuid[i] = chars[0 | Math.random() * radix];
        }
    } else {
        let r;

        uuid[8] = uuid[13] = uuid[18] = uuid[23] = '-';
        uuid[14] = '4';

        for (i = 0; i < 36; i++) {
            if (!uuid[i]) {
                r = 0 | Math.random() * 16;
                uuid[i] = chars[(i == 19)
                        ? (r & 0x3) | 0x8
                        : r];
            }
        }
    }

    return uuid.join('');
}

/**
 * 函数节流
 * 
 * @exports
 * @param {function} func 
 * @param {number} wait 
 * @param {object} options 
 * @returns 
 */
export function throttle(func, wait, options) {
    var context,
        args,
        result;
    var timeout = null;
    // 上次执行时间点
    var previous = 0;
    if (!options) 
        options = {};
    
    // 延迟执行函数
    var later = function () {
        // 若设定了开始边界不执行选项，上次执行时间始终为0
        previous = options.leading === false
            ? 0
            : +new Date;
        timeout = null;
        result = func.apply(context, args);
        if (!timeout) 
            context = args = null;
        };
    
    return function () {
        var now = +new Date;
        // 首次执行时，如果设定了开始边界不执行选项，将上次执行时间设定为当前时间。
        if (!previous && options.leading === false) 
            previous = now;
        
        // 延迟执行时间间隔
        var remaining = wait - (now - previous);
        context = this;
        args = arguments;
        // 延迟时间间隔remaining小于等于0，表示上次执行至此所间隔时间已经超过一个时间窗口
        // remaining大于时间窗口wait，表示客户端系统时间被调整过
        if (remaining <= 0 || remaining > wait) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
            if (!timeout) 
                context = args = null;
                //如果延迟执行不存在，且没有设定结尾边界不执行选项
            }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

/**
 * 去抖
 *
 * @exports
 * @param {function} func
 * @param {number} wait
 * @param {boolean} immediate
 * @returns
 */
export function debounce(func, wait, immediate) {
    var timeout,
        args,
        context,
        timestamp,
        result;

    var later = function () {
        // 当wait指定的时间间隔期间多次调用_.debounce返回的函数，则会不断更新timestamp的值，导致last < wait && last >=
        // 0一直为true，从而不断启动新的计时器延时执行func
        var last = +new Date - timestamp;

        if (last < wait && last >= 0) {
            timeout = setTimeout(later, wait - last);
        } else {
            timeout = null;
            if (!immediate) {
                result = func.apply(context, args);
                if (!timeout) 
                    context = args = null;
                }
            }
    };

    return function () {
        context = this;
        args = arguments;
        timestamp = +new Date;
        // 第一次调用该方法时，且immediate为true，则调用func函数
        var callNow = immediate && !timeout;
        // 在wait指定的时间间隔内首次调用该方法，则启动计时器定时调用func函数
        if (!timeout) 
            timeout = setTimeout(later, wait);
        if (callNow) {
            result = func.apply(context, args);
            context = args = null;
        }

        return result;
    };
}

/**
 * 给数组或对象注入id
 *
 * @exports
 * @param {Array} list
 * @returns {Array}
 */
export function injectId2Array(obj, prefix) {
    if (typeof obj !== 'object') 
        return obj;
    
    if (Array.isArray(obj)) {
        obj.forEach((item) => {
            if(!item.id) {
                item.id = uniqueIdCreator(prefix);
            }
        });
    } else {
        for (const key in obj) {
            if (obj.hasOwnProperty(key) && !obj[key].id) {
                obj[key].id = uniqueIdCreator(prefix);
            }
        }
    }

    return obj;
}

/**
 *
 *
 * @exports
 * @param {string}
 *
 */
export function splitMoney(str, fixedNum) {
    //注册校验数字方法
    var isNumeric = function (obj) {
        var realStringObj = obj && obj.toString();
        return !Array.isArray(obj) && (realStringObj - parseFloat(realStringObj) + 1) >= 0;
    };
    //校验入参合法性
    if (!isNumeric(str)) 
        return str;
    
    //小数部分(若有)四舍五入
    if (!isNumeric(fixedNum) || fixedNum < 0 || fixedNum > 20) {
        fixedNum = /\./.test(str)
            ? 2
            : 0;
    }
    str = parseFloat(str).toFixed(fixedNum);
    return str;
}
/**
 * 判断两个矩阵是否重叠
 *
 * @exports
 * @param {Object} r1
 * @param {Object} r2
 * @returns {Boolean}
 */
export function isRectOverlap(r1, r2) {
    var x1 = Number(r1.x),
        y1 = Number(r1.y),
        w1 = Number(r1.w),
        h1 = Number(r1.h),
        x2 = Number(r2.x),
        y2 = Number(r2.y),
        w2 = Number(r2.w),
        h2 = Number(r2.h);

    if (x1 + w1 > x2 && x2 + w2 > x1 && y1 + h1 > y2 && y2 + h2 > y1) {
        return true;
    } else {
        return false;
    }
}

/**
 * 重新定义Messages
 * 
 * @exports
 * @param {Object} messages 
 * @param {String} prefix 
 * @returns {Object}
 */
export function getMessages(messages, prefix) {
    let output = {};

    for(const id in messages) {
        const key = prefix? `${prefix}.${id}`:id;
        const message = messages[id];
        output[key] = message
    }

    return output;
}

/**
 * 去除首尾空格
 * TODO: 可去除其他字符
 * 
 * @exports
 * @returns {any}
 */
export function trim(str) {
    if(typeof str === 'string') {
        return str.replace(/(^\s*)|(\s*$)/g, "");
    } else {
        return str;
    }
}

/**
 * 深度合并JSON对象
 * 
 * @exports
 * @param {Object} target 
 * @param {Object} source 
 * @return {Object}
 */
export function mergeJSON(main, minor) {
    const target = Object.assign({}, main);

    for(const key in minor) {
        if(main[key] === undefined) {
            target[key] = minor[key];
            continue;
        }

        if(isObject(minor[key]) && isObject(main[key])) {
            target[key] = mergeJSON(main[key], minor[key]);
        }
    }

    return target;
}

/**
 * 获取元素最终样式
 * 
 * @exports
 * @param {Object} element 
 * @param {Object} attr
 * @return {Object}
 */
export function getComputedStyle(element, attr) {
    if(window.getComputedStyle){
        //优先使用W3C规范
        return window.getComputedStyle(element)[attr];
    }else{
        //针对IE9以下兼容
        return element.currentStyle[attr];

    }
}

/**
 * 复制source中在propNames列表中的属性到target
 * 
 * @param {Object} target 
 * @param {Object} source 
 * @param {Array} propNames 
 * @return {Object}
 */
export function copyProp(target, source, propNames) {
    const propNameMap = {};

    propNames.forEach((name) => {
        propNameMap[name] = 1;
    })

    for(let key in source) {
        if(!!propNameMap[key]) {
            target[key] = source[key];
        }
    }

    return target;
}