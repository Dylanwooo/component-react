Alert
---
category: Components
type: Feedback
title: Alert
---
Alert Component for feedback

#### When to use

- When you need to show alert messages to users.
- When you need a persistent static container which is closable by user actions.

#### API

| Property | Description | Type | Default |
 | --- | --- | --- | --- |
 | closable | Whether Alert can be closed | boolean | true |
 | duration | Duration of Alert | string\number | - |
 | description | Additional content of Alert | string\|ReactNode | - |
 | message | Content of Alert | string\|ReactNode | - |
 | animatedName | Animation name of Alert，options：'zoom' , 'fade' | string | 'fade' |
 | type | Type of Alert styles, options: 'success', 'info', 'warning', 'error' | string | 'info' |
 | onClose | Callback when Alert is closed | Function | - |
---
Anchor
---
category: Components
type: Other
title: Anchor
---
### When To Use

For displaying anchor hyperlinks on page and jumping between them.

### API

| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| to | The target address of Anchor | string | `#` |
| mode | The jumping mode of Anchor | string. options: `top`,`blank`,`self` & `parent` | `blank` |
| onClick | The callback of clicking the Anchor | Function | - |
---
Input
---
category: Components
type: Data Entry
title: Input
---
A basic widget for getting the user input.

Keyboard and mouse can be used for providing or changing data.

#### When to use
- A user input in a form field is needed.
- A search input is required.

#### API
| Property | Description | Type | Default |
 | --- | --- | --- | --- |
 | value | The input content value | string | - |
 | autoFocus | Auto focus to the input | boolean | false |
 | size | The size of the input box. Available: `large` `default` `small` | string | `default` |
 | width | The customized width of Input | string\number |  |
 | defaultValue | The initial input content | any |  |
 | type | Type of Input , options: `textarea`, `text`| string | `text` |
 | icon | Whether to use search icon. Available: `yes` | string |  |
 | onPressEnter | The callback function that is triggered when Enter key is pressed. | function(e) |  |
 | readOnly | To limit the input is read-only | boolean | false |
 | autoSelect | Auto focus to the input. Note: the priority is higher than autoFocus | boolean | false |
 | disabled | Whether the input is disabled. | boolean | false |
 | placeholder | The initial input content. | string |  |
 ---
Button 
 ---
 category: Components
 type: General
 title: Button
 ---
 To trigger an operation.
 
 ### When To Use
 
 A button means an operation (or a series of operations). Clicking a button will trigger corresponding action.
 
 ### API
 | Property | Description | Type | Default |
 | -------- | ----------- | ---- | ------- |
 | ghost | make background transparent and invert text and border colors| boolean | false |
 | htmlType | set the original html `type` of `button`, options: `button` `submit` `reset`| string | `button` |
 | icon | set the icon of button, see: Icon component | string | - |
 | size | can be set to `small` `large` `medium` | string | `medium` |
 | type | can be set to `primary` `ghost` `sucesse` `danger` `default` | string | `default` |
 | onClick | set the handler to handle `click` event | function | - |
 | disabled | set the button disabled | boolean | false |
---
Popover
 ---
 category: Components
 type: Data Display
 title: Popover
 ---
 The floating card popped by clicking or hovering.
 ### When To Use
 A simple popup menu to provide extra information or operations.
 
 ### API
 
 | Param | Description | Type | Default value |
 | ----- | ----------- | ---- | ------------- |
 | content | Content of the card | string\|ReactNode | - |
 | title | Title of the card | string\|ReactNode | - |
 | placement | The popup place of Popover | string | `top` |
 | trigger | the tigger action of Popover | string. options: `click`,`hover` | `click` |
 ---
 Tag
 ---
 category: Components
 type: Data Display
 title: Tag
 ---
 ### When To Use
 
 - It can be used to tag by dimension or property.
 
 - When categorizing.
 
 ### API
 #### Tag
 | Property | Description | Type | Default |
 | -------- | ----------- | ---- | ------- |
 | onClick | Callback executed when tag is clicked | (e) => void | - |
 | closable | Whether Tag can be closed | boolean | `false` |
 | color | Color of the Tag | string | - |
 | onClose | Callback executed when tag is closed | (e) => void | - |
 | style | To customize the stylesheet of tag | object | - |
 
 #### Tag.CheckableTag
 
 | Property | Description | Type | Default |
 | -------- | ----------- | ---- | ------- |
 | checked | Checked status of Tag | boolean | `false` |
 | onChange | Callback executed when Tag is checked/unchecked | (checked) => void | - |
 ---
 Tabs
 ---
 category: Components
 type: Data Display
 title: Tabs
 ---
 
 Tabs make it easy to switch between different views.
 
### When to use
- Card Tabs: for managing too many closeable views.
- Default Tabs: for functional aspects of a page.

### API

#### Tabs
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| activeKey | Current TabPane's key | string | - |
| type | Basic style of tabs. options:`card`&`default` | string | |
| style | To customize the stylesheet of Tabs | object |  |

#### Tabs.TabPane
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| style | To customize the stylesheet of TabPane | object |  |
---
Popconfirm
---
category: Components
type: Feedback
title: Popconfirm
---
A simple and compact confirmation dialog of an action.
### When To Use

A simple and compact dialog used for asking for user confirmation.

### API

| Param | Description | Type | Default value |
| ----- | ----------- | ---- | ------------- |
| cancelText | text of the Cancel button | string | `取消` |
| okText | text of the Confirm button | string | `确定` |
| placemnent | The popup place of Popconfirm | string | |
| title | title of the confirmation box | string\|ReactNode | - |
| onCancel | callback of cancel | function(e) | - |
| onOk | callback of confirmation | function(e) | - |


Collapse
---
category: Components
type: Data Display
title: Collapse
---

A content area which can be collapsed and expanded.

### When To Use

- Can be used to group or hide complex regions to keep the page clean.
- `accodion` is a special mode of Collapse, which allows only one panel expend at a time. The first panel will be opened by default
### API

####  Collapse
 | Property | Description | Type | Default |
 | -------- | ----------- | ---- | ------- |
 | activeKey | Key of the active panel | string\[]\|string | No default value. In `accordion` mode, it's the key of the first panel. |
 | defaultActiveKey | Key of the initial active panel | string | - |
 | onChange | Callback function executed when active panel is changed | Function | - |

##### Collapse.Panel
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| disabled | If `true`, panel cannot be opened or closed | boolean | `false` |
| renderHeader | Title of the panel | string\|ReactNode | - |
| _onItemClick | Callback function executed when panel is clicked | Function | - |
| style | Customize the panel style | object | |

Messages
---
category: Components
type: Feedback
title: Messages
---
Display global messages as feedback in response to user operations.

### When to use
- To provide feedback such as success, warning, error and information.
- A message is displayed at top and center and will be dismissed automatically, as a non-interrupting light-weighted prompt.

### API

This components provides some static methods, with usage and arguments as following:

- `message.success(content, duration, onClose)`
- `message.error(content, duration, onClose)`
- `message.info(content, duration, onClose)`
- `message.warning(content, duration, onClose)`

| Argument | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
| content | content of the message | string\|ReactNode | - |
| duration | time before auto-dismiss, in seconds | number | 1.5 |
| onClose | Specify a function that will be called when the message is closed | Function | - |

Dropdowm
---
category: Components
type: Navigation
title: Dropdown
---

A dropdown list.

## When To Use

When you want to display a great number of data in a more structured way.

### API

#### Dropdown
| Property | Description | Type | Default |
| -------- | ----------- | ---- | ------- |
