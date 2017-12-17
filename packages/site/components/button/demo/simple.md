---
order: 0
title: 简单的例子
---

```jsx
import {Button} from '@jmfe/jdesign-core';

class Test extends React.Component{
  
  render(){
    return (
      <div className="code-box-demo-wrapper">
                <Button type="primary" size="large">主按钮</Button>
                <Button type="primary" size="large" disabled={true}>主按钮</Button>
                <Button type="primary" size="medium">中按钮</Button>
                <Button type="primary" size="medium" disabled={true}>中按钮</Button>

        
      </div>
    );
  }
}
ReactDOM.render(<Test />, mountNode);
```

```css
.jd-button {
    display: inline-block;
    padding: 3px 10px;
    background: #fff;
    border: 1px solid #ddd;
    border-bottom-color: #c7c7c7;
    cursor: pointer;
    border-radius: 3px;
    font-size: 14px;
    letter-spacing: 1px
}

.jd-button color #555:hover {
    -webkit-transform: translate(0, -1px);
    transform: translate(0, -1px)
}

.jd-button + .jd-button {
    margin-left: 10px
}

.jd-button--primary {
    background: #209cff;
    border: none;
    border-bottom: 1px solid #038fff;
    color: #fff
}

.jd-button--small {
    font-size: 12px
}

.jd-button--large {
    font-size: 16px
}

.jd-button--disabled {
    cursor: not-allowed;
    color: rgba(0, 0, 0, .25);
    background-color: #f7f7f7;
    border: 1px solid #d9d9d9
}


```
