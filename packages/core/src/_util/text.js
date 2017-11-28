export const ERROR = {
    TIMEOUT: '网络跑累了，请稍后再试。',
    SCRIPT_LOAD_ERROR: '脚本读取失败，请稍后再试。',
    NETWORK_ERROR: '网络异常，请稍后再试。',
    API_NOT_EXIST: '接口不存在，请联系管理人员。',
    API_ERROR: '接口异常，请联系管理人员。',
    BI_SAVE_ERROR: 'BI配置保存失败',
    UNKNOWN: '页面有异常发生，请联系管理人员。',
    INSTANCE_ERROR: '楼层模版有异常发生，请联系管理人员。'
}

export const GENERAL = {
    SAVE_SUCCESS: '保存成功',
    SAVE_FAILED: '保存失败',
    SAVE_HINT: '保存提示',
    RELEASE_SUCCESS: '发布成功',
    RELEASE_FAILED: '发布失败',
    RELEASE_HINT: '发布提示',
    CONFIRM: '确认',
    CANCEL: '取消',
    LOADING: '加载中。。。',
    SAVING: '保存中。。。',
    RELEASING: '发布中。。。',
    SELECT: '请选择',
    COLOR_PICKER: '读取页面背景色',
    COPIED_SUCCESS: '复制成功！'
}

export const TAB = {
    BI_BLOCK_CONFIG: 'BI区块配置',
    BI_BLOCK_PROP_CONFIG: '区块属性配置',
    STYLE: '样式配置',
    DATA: '数据配置',
    SORT_ATTRIBUTES: '使用智能排序',
    CONFIG_ORIENTATION: '配置定向投放',
    ADD_CATEGORY: '增加品类属性',
    USERTYPE: '按用户级别',
    LOCATION: '按地区属性',
    YE_MIAN_BIAO_TI: '设置页面标题',
    YE_MIAN_FEN_XIANG: '设置页面分享'
}

export const EDITOR = {
    CHECK_UNRELEASE_FAILED: '系统消息：有楼层未发布，发布下防丢失！',
    RELEASE_FAILED_FOR_UNSAVED: '发布失败，楼层还未保存，请检查！',
    UNSAVED_ORDER: '未保存楼层',
    RELEASE_FAILED_FOR_UNGENERATED_PAGE: '页面生成失败，请稍后重试。',
    RELEASE_FAILED: '发布失败，请稍后重试',
    RELEASE_FAILED_FOR_TOO_MUCH_HOTZONE: '图片热区总数大于100个，请去掉一些',
    RELEASE_FAILED_FOR_TOO_MUCH_ID: '关联的选品池ID过多，请去掉一些',
    RELEASE_FAILED_FOR_TOO_MUCH_INSTANCE: '楼层总数不能大于100个',
    RELEASE_FAILED_FOR_DUPLICATE_LINK: '顶部导航的子页面配置了重复的活动链接，请检查配置项！',
    RELEASE_FAILED_FOR_ERRORMAP: (errorMap) => {
        const messages = [];
        messages.push(`<p>错误楼层号：${errorMap.floorId}</p>`);
        messages.push(`<p>错误广告组名称：${errorMap.advertGroupName}(id:${errorMap.advertGroupId})</p>`);
        messages.push(`<p>错误分期名称：${errorMap.errorStageName}(id:${errorMap.errorStageId})</p>`);
        if(errorMap.minNum) {
            messages.push(`<p>错误信息：至少需要${errorMap.minNum}个广告</p>`);
        } else if(errorMap.errorAdvertId) {
            messages.push(`<p>错误广告id：${errorMap.errorAdvertId}</p>`);
            messages.push(`<p>错误信息：图片尺寸应为${errorMap.standardSize}</p>`);
        }
        return messages.join('');
    },
    RELEASE_FAILED_FOR_INCONSISTENT: () => {
        const content = [];
        content.push('<p>该页面已被其他操作者编辑，建议刷新页面获取最新配置信息<p>');
        content.push('<p>选择“继续发布”，则页面会以您当前配置为准，其他操作者的配置不会同步发布</p>');
        return content.join('');
    },
    UNRELEASE: '尚未发布',
    SAVE_FAILED_FOR_ERRORS: '配置信息有错误，请检查！',
    SAVE_FAILED_ERRORS_CONTENT: (viewInstanceInfo, subViewInstanceInfo, errMessage, subErrMessage) => {
        const messages = [];
        messages.push(`<p>错误楼层：${viewInstanceInfo.name}</p>`);

        if(subViewInstanceInfo.length > 0) {
            const msg = subViewInstanceInfo.map((info)=>info.name).join(',');
            messages.push(`<p>错误子楼层：${msg}</p>`);
        }else {
            if(!!errMessage) {
                messages.push(`<p>错误：${errMessage}</p>`);
            } else if(!!subErrMessage) {
                messages.push(`<p>子楼层错误：${subErrMessage}</p>`);
            }
        }

        return messages.join('');
    },
    EXISTED_UNRELEASE_CONTENT: (lastUpdateErpNo,lastUpdateTime) => {
        const messages = [];
        messages.push('<p>该楼层存在未发布内容</p>');
        messages.push(`<p>最后一次保存时间：${lastUpdateErpNo} 操作人：${lastUpdateTime}</p>`);
        messages.push('<p>可视化后台为您展示最后一次保存的配置，该配置尚未同步线上</p>');
        return messages.join('');
    },
    FORBID_INSERT_VIEW_INSTANCE_IN_BIVIEWMODE: '在BI配置界面不能新增楼层',
    SAVE_VIEW_INSTANCE_FIRST: '请先保存新增加的楼层',
    RELEASE_FAILED_FOR_BI: '发布失败，BI区块配置有错误，请检查！',
    RELEASE_FAILED_FOR_BLOCK_NAME_EMPTY: '区块名称不能为空',
    RELEASE_FAILED_FOR_LABELLIST_EMPTY: '区块中标签数量不能为0',
    RELEASE_FAILED_FOR_ANCHOR: '锚点导航上、下方的区块不可以同时开启BI',
    RELEASE_FAILED_FOR_INCONTINUOUS: (names) => {
        const messages = [];
        messages.push(`<p>区块【${names.join(',')}】</p>`);
        messages.push(`<p>楼层序号不连续</p>`);
        return messages.join('');
    },
    RELEASE_FAILED_FOR_NO_BI: (name) => {
        const messages = [];
        messages.push(`<p>区块【${name}】没有配置定投或排序，请完成配置或解除区块</p>`);
        return messages.join('');
    },
    RELEASE_FAILED_FOR_NOT_COMPLETE: (name) => {
        const messages = [];
        messages.push(`<p>区块【${name}】配置信息不完善，请完成配置或解除区块</p>`);
        return messages.join('');
    },
    RELEASE_FAILED_FOR_SORT: (name) => {
        const messages = [];
        messages.push(`<p>单个区块无法参与BI排序</p>`);
        messages.push(`<p>目前仅区块【${name}】配置了智能排序）</p>`);
        return messages.join('');
    },
    RELEASE_FAILED_FOR_BI_ERROR: '区块BI发布失败，点击确认重新发布'
}

export const OPERATION = {
    ADD: '添加',
    DEL: '删除',
    ISDEL: '是否删除？',
    CONFIG: '去配置',
    COPY: '复制项目链接',
    UNRELATE: '是否取消关联？',
    ORDER: '调整顺序'
}

export const TABLE = {
    ADVERT_SEARCH_PLACEHOLDER: '搜索广告组ID、广告组名称、ERP账号',
    PRODUCT_SEARCH_PLACEHOLDER: '搜索商品ID、商品组名称、ERP账号'
}

export const YEMIANBIAOTI = {
    SHARE_INFO: '页面分享',
    GIFT_LABEL: '配置分享有礼',
    GIFT_LABEL_INFO: '(分享有礼不能与静态浮层或动态浮层同时配置)',
}

export const BABEL_COMMON = {
    ADVERT: '广告',
    ADVERTGROUP: '广告组',
    PRODUCT: '商品',
    PRODUCTGROUP: '商品组',
    RELATE: '关联',
    CANCEL_RELATE: '取消关联'
}
