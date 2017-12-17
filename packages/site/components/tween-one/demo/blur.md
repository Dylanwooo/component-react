---
order: 3
title: 模糊效果
mouseEnter: true
---

鼠标经过或手指按下可查看模糊效果。


```jsx
import TweenOne from 'rc-tween-one';
import PropTypes from 'prop-types';

class Demo extends React.Component {

  constructor(props) {
    super(props);
    this.animation = { blur: '10px', yoyo: true, repeat: -1, duration: 1000 };
  }

  render() {
    return (
      <TweenOne
        animation={this.animation}
        paused={this.props.paused}
        className="code-box-shape"
      />
    );
  }
}
Demo.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string,
  paused: PropTypes.bool,
};
ReactDOM.render(<Demo/>, mountNode);

```
