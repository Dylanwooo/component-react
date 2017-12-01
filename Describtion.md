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
 