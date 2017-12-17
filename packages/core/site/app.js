import React, { Component, PureComponent } from 'react';

import CheckBoxTest from './components/checkbox_test';
import CheckBoxGroupTest from './components/checkboxGroup_test';
import SwitchTest from './components/switch_test';
import SpinTest from './components/spin_test';
import RadioTest from './components/radio_test';
import CheckableTagTest from './components/checkableTag_test';
import EditableTagGroup from './components/editableTagGroup_test';
import DropdownTest from './components/dropdown_test';

import {
    Alert,
    Anchor,
    Button,
    Cascader,
    Checkbox,
    Collapse,
    Confirm,
    ErrorBoundary,
    Grid,
    Icon,
    Input,
    Layout,
    Mask,
    Messages,
    Modal,
    Modalless,
    Move,
    Notification,
    Pagination,
    PagingTable,
    Popconfirm,
    Popover,
    RawHtml,
    Section,
    Slider,
    Spin,
    Switch,
    Table,
    Tabs,
    Tag,
    Tooltip,
    Transfer,
    Uploader,
    DropDown
} from '../src'
// } from '@jmfe/jdesign-core'
/*test from node_modules*/
/*require the whole theme*/
let css = require('../../theme-babel/src/index.styl')
/*require on demand*/
// var css = require('../../theme-babel/src/button.styl')

export default () => {
    const {TabPane} = Tabs;
    const options = [{
        value: '浙江',
        label: '浙江',
        children: [{
            value: '杭州',
            label: '杭州',
            children: [{
                value: '西湖',
                label: '西湖'
            }]
        }]
    }, {
        value: '湖北',
        label: '湖北',
        children: [{
            value: '杭州',
            label: '武汉',
            children: [{
                value: '西湖',
                label: '黄鹤楼'
            }]
        }]
    }, {
        value: '湖南',
        label: '湖南',
        children: [{
            value: '杭州',
            label: '长沙',
            children: [{
                value: '西湖',
                label: '坡子街'
            }]
        }]
    }];

    const { column } = Table;
    const { CheckableTag } = Tag;
    const dataSource = [{
        key: '1',
        name: '胡彦斌',
        age: 32,
        address: '西湖区湖底公园1号'
    }, {
        key: '2',
        name: '胡彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    },{
        key: '3',
        name: '彭于晏',
        age: 33,
        address: '西湖区湖底公园1号'
    }, {
        key: '4',
        name: '吴彦祖',
        age: 42,
        address: '西湖区湖底公园1号'
    },{
        key: '5',
        name: '吴亦凡',
        age: 32,
        address: '西湖区湖底公园1号'
    }, {
        key: '6',
        name: '小沈阳',
        age: 42,
        address: '西湖区湖底公园1号'
    }];

    const columns = [{
        title: '姓名',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    }, {
    }, {
        title: '年龄',
        dataIndex: 'age',
        key: 'age',
    }, {
        title: '住址',
        dataIndex: 'address',
        key: 'address',
    }];


    const Panel = Collapse.Panel;
    const Row = Grid.Row;
    const Col = Grid.Col;
    const text = `
    A dog is a type of domesticated animal.
    Known for its loyalty and faithfulness,
    it can be found as a welcome guest in many households across the world.`;
    const {Header, Footer, Sider, Content} = Layout;

    function onChangeCheckBox(e) {
        console.log(`checked = ${e.target.checked}`);
    }

    function onChangeDatePicker(e) {
        console.log(e)
    }

    //Collapse回调函数
    function callback(key) {
        console.log(key);
        console.log('切换了')
    }

    //button确认函数
    function onBtnComfirm() {
        Confirm.show({}, () => {
        })
    }

    function onBtnInfoMsg() {
        Messages.info('这是一条提示消息');
    }

    function onBtnSuccessMsg() {
        Messages.success('这是一条正确消息');
    }

    function onBtnWarningMsg() {
        Messages.warning('这是一条注意消息');
    }

    function onBtnErrorMsg() {
        Messages.error('这是一条错误消息');
    }

    function onStopDrag() {
        Messages.warning('你停止了拖动');
    }

    function onStartDrag() {
        Messages.success('你开始拖动');
    }

    const onOpenNotification = () => {
        Notification.open({
            title: 'Notification Title',
            message: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    }
    const onOpenNotificationInfo = () => {
        Notification.info({
            title: 'Info Title',
            message: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    }
    const onOpenNotificationSuccess = () => {
        Notification.success({
            title: 'success Title',
            message: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    }
    const onOpenNotificationError = () => {
        Notification.error({
            title: 'error Title',
            message: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    }
    const onOpenNotificationWarning = () => {
        Notification.warning({
            title: 'warning Title',
            message: 'This is the content of the notification. This is the content of the notification. This is the content of the notification.',
        });
    };

    return (
        <div>
            <div className='content-border'>
                <p>RadioTest</p>
                <RadioTest/>
            </div>
            <div className='content-border'>
                <p>SwitchTest</p>
                <SwitchTest/>
            </div>
            <div className='content-border'>
                <p>弹出框</p>
                <Alert message="恭喜！你提交的信息已审核通过，如有问题，请联系客服" type="success"></Alert>
                <br/>
                <Alert message="您好！欢迎使用新版，我已增加多模块" type="info"></Alert>
                <br/>
                <Alert message="系统将于10月10日下午18:30-19:30进行升级，请注意保存" type="warning"></Alert>
                <br/>
                <Alert message="系统信息错误，请稍后再试！" type="error"></Alert>
                <br/>
                <Alert message="Alert for default occuring"></Alert>
            </div>
            <div className='content-border'>
                <p>连接</p>
                <Anchor mode="blank" onClick={() => {}} to="editor"><Button>点我</Button></Anchor>
                <Anchor mode="top">top</Anchor>
            </div>

            <div className='content-border'>
                <p>正常按钮</p>
                <Button type="primary" size="large">主按钮</Button>
                <Button type="primary" size="large" disabled={true}>主按钮</Button>
                <Button type="primary" size="medium">中按钮</Button>
                <Button type="primary" size="medium" disabled={true}>中按钮</Button>
                <Button type="primary" onClick={onBtnComfirm}>小按钮</Button>
                <Button type="primary" onClick={onBtnComfirm} disabled={true}>小按钮</Button>
                <br/>
                <p>次要按钮</p>
                <Button>默认按钮</Button>
                <Button disabled={true}>默认按钮</Button>
                <br/>
                <Button type="ghost">幽灵按钮</Button>
                <Button type="ghost" disabled={true}>幽灵按钮</Button>
                <Button type="success" >成功</Button>
                <Button type="link" >link</Button>
                <Button type="danger" >danger</Button>
                <p>带icon按钮</p>
                <Button><Icon name="save"></Icon>保存</Button>
                <Button disabled={true}><Icon name="save" ></Icon>保存</Button>
                <Button type="ghost"><Icon name="save" ></Icon>保存</Button>
                <Button type="primary"><Icon name="save" ></Icon>保存</Button>

            </div>
            <div className='content-border'>
                <p>输入框</p>
                <Input placeholder="请输入名字" autoFocus={true} icon={"yes"}/>
                <Input placeholder="只读"  readOnly={true}/>
                <Input width={500} type="password" placeholder="请输入密码" />
                <Input value="禁用" disabled={true} addonAfter="$" />
                <Input onPressEnter={()=>{alert('press enter')}} placeholder="press enter"/>
                <Input type="textarea"/>
                <Input size='large' placeholder='large input'/>
                <Input size='small' placeholder='small input'/>
            </div>

            <div className='content-border'>
                <p>级联选择</p>
                <Cascader placeholder="请选择" options={options} placemenmnt="bottomLeft"></Cascader>
                <Cascader style={{width:500}} placeholder="请选择" options={options} placemenmnt="bottomLeft"></Cascader>
            </div>

            <div className='content-border'>
                <span>单选：</span>
                <CheckBoxTest/>
                {/*<Checkbox onChange={onChangeCheckBox}></Checkbox>*/}
                <div>
                    <span>禁用：</span>
                    <Checkbox checked disabled />
                    <Checkbox disabled />
                </div>
                <div className="content-border">
                    <span>多选</span>
                    <CheckBoxGroupTest/>
                </div>
            </div>

            <div className='content-border'>
                <p>折叠面板</p>
                <Collapse defaultActiveKey={['1']} onChange={callback}>
                    <Panel renderHeader="This is panel header 1" key="1">
                        <p>{text}</p>
                    </Panel>
                    <Panel renderHeader="This is panel header 2" key="2">
                        <p>{text}</p>
                    </Panel>
                    <Panel renderHeader="This is panel header 3" key="3" disabled>
                        <p>{text}</p>
                    </Panel>
                </Collapse>
                <p>accordion</p>
                <Collapse accordion>
                    <Panel renderHeader="This is panel header 1" key="1">
                        <p>{text}</p>
                    </Panel>
                    <Panel renderHeader="This is panel header 2" key="2">
                        <p>{text}</p>
                    </Panel>
                    <Panel renderHeader="This is panel header 3" key="3" disabled>
                        <p>{text}</p>
                    </Panel>
                </Collapse>
            </div>

            {/*<div className='content-border'>*/}
                {/*<p>日期选择</p>*/}
                {/*ss<DatePicker calendarType="normal" format='YYYY-MM-DD HH:mm:ss' onChange={onChangeDatePicker}></DatePicker>*/}
            {/*</div>*/}

            <div className='content-border'>
                <p>栅格系统</p>
                <Row type="flex">
                    <Col span={12}>col-12</Col>
                    <Col span={12}>col-12</Col>
                </Row>
                <Row type="flex">
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                    <Col span={8}>col-8</Col>
                </Row>

            </div>

            <div className='content-border'>
                <p>图标</p>
                <Button><Icon name="menu"> </Icon>保存</Button>
                <Icon name="share" style={{fontSize: 20 + 'px'}}>user</Icon>
                <Icon name="more">signal</Icon>
                <Icon name="close">home</Icon>
            </div>

            <div className='content-border'>
                <p>布局展示</p>
                <div className='layout-border'>
                    <Layout>
                        <Header></Header>
                        <Layout>
                            <Sider></Sider>
                            <Content>{text}</Content>
                        </Layout>
                        <Footer></Footer>
                    </Layout>
                </div>

                <div className='layout-border'>
                    <Layout>
                        <Header></Header>
                        <Layout>
                            <Content>{text}</Content>
                            <Sider></Sider>
                        </Layout>
                        <Footer></Footer>
                    </Layout>
                </div>
                <div className='layout-border'>
                    <Layout>
                        <Header></Header>
                        <Content>{text}</Content>
                        <Footer></Footer>
                    </Layout>
                </div>
            </div>

            {/* <div className='content-border'>
                <p>蒙板</p>
                <Mask className="_mask"></Mask>
            </div> */}

            <div className='content-border'>
                <p>全局消息</p>
                <Button type="primary" size="large" onClick={onBtnInfoMsg}>Info</Button>
                <Button type="primary" size="large" onClick={onBtnSuccessMsg}>Success</Button>
                <Button type="primary" size="large" onClick={onBtnWarningMsg}>Warning</Button>
                <Button type="primary" size="large" onClick={onBtnErrorMsg}>Error</Button>
            </div>

            <div className='content-border'>
                <p>拖动组件</p>
                <Move onStart={onStartDrag} onStop={onStopDrag}></Move>
            </div>

            <div className='content-border'>
                <p>通知提醒框</p>
                <Button type="primary" size="large" onClick={onOpenNotification}>Open the notification box</Button>
                <Button type="primary" size="large" onClick={onOpenNotificationInfo}>Open the info box</Button>
                <Button type="primary" size="large" onClick={onOpenNotificationSuccess}>Open the success box</Button>
                <Button type="primary" size="large" onClick={onOpenNotificationError}>Open the error box</Button>
                <Button type="primary" size="large" onClick={onOpenNotificationWarning}>Open the warning box</Button>
            </div>

            <div className='content-border'>
                <p>分页</p>
                <Pagination pageSize={5} totalPage={10} showTotal={true} onChange={(current) => {
                    console.log(current)
                }}></Pagination>
            </div>

            <div className='content-border'>
                <p>开关</p>
                <Switch></Switch>
            </div>

            {/*<div className='content-border'>*/}
                {/*<p>可分页表格</p>*/}
                {/*<PagingTable pageSize={5} totalPage={10} dataSource={dataSource} onPageChange={(current)=>{console.log(current)}}></PagingTable>*/}
            {/*</div>*/}
            <div className='content-border'>
                <p>弹出确认框</p>
                <Popconfirm title="确定要点击我？" okText="ok" cancelText="no" animatedName="fade">
                    <Button>TL</Button>
                </Popconfirm>
                <br/>
                <Popconfirm palcement="topRight" title="确定要删除这条信息吗？" okText="确定" cancelText="取消">
                    <Button>删除</Button>
                </Popconfirm>
            </div>

            <div className='content-border'>
                <p>popover</p>
                <Popover title="title" content="这是一段很长很长很长的文字">
                    <Button>click</Button>
                </Popover>
                <br />
                <Popover title="title" content="我也是一段很长很长的文字" trigger="hover">
                    <span style={{color:'#209CFF'}}>悬浮气泡</span>
                </Popover>
            </div>

            <div className='content-border'>
                <p>section</p>
                <Section description="describtion" showSwitch={true}></Section>
            </div>

            <div className='content-border'>
                <p>Slider</p>
                <Slider min={0} max={100} ></Slider>
            </div>

            <div className='content-border'>
                <p>table</p>
                <Table  ></Table>
            </div>

            <div className='content-border'>
                <p>标签</p>
                <Tag>default</Tag>
                <Tag closable={true}>close</Tag>
                <Tag color="pink">pink</Tag>
                <Tag color="red">red</Tag>
                <Tag color="orange">orange</Tag>
                <Tag color="blue">blue</Tag>
                <CheckableTag>checkable</CheckableTag>

            </div>
            <div className='content-border'>
                <p>CheckableTagTest</p>
                <CheckableTagTest/>
            </div>
            <div className='content-border'>
                <p>EditableTagGroup</p>
                <EditableTagGroup/>
            </div>
            <div className="content-border">
                <DropdownTest/>
            </div>
            <SpinTest />

            <div className='content-border'>
                <p>标签页</p>
                <Tabs>
                    <TabPane name="Tab 1">
                        默认tab1
                    </TabPane>
                    <TabPane name="Tab 2">
                        默认tab2
                    </TabPane>
                    <TabPane name="Tab 3">
                        默认tab3
                    </TabPane>
                </Tabs>
                <Tabs style={{width:200}}>
                    <TabPane name="Tab 1">
                        自定义tab1
                    </TabPane>
                    <TabPane name="Tab 2">
                        自定义tab2
                    </TabPane>
                    <TabPane name="Tab 3">
                        自定义tab3
                    </TabPane>
                </Tabs>
                <Tabs type="card">
                    <TabPane name="Tab 1">
                        默认tab-card1
                    </TabPane>
                    <TabPane name="Tab 2">
                        默认tab-card2
                    </TabPane>
                    <TabPane name="Tab 3">
                        默认tab-card3
                    </TabPane>
                </Tabs>
                <Tabs type="card" style={{width:200,paddingTop:10,paddingBottom:10}}>
                    <TabPane name="Tab 1">
                        自定义样式tab-card1
                    </TabPane>
                    <TabPane name="Tab 2">
                        自定义样式tab-card2
                    </TabPane>
                    <TabPane name="Tab 3">
                        自定义样式tab-card3
                    </TabPane>
                </Tabs>
            </div>

            <div className="content-border">
                <Tooltip title="prompt text">
                    <span>提示文字.</span>
                </Tooltip>
            </div>

        </div>
    )
}