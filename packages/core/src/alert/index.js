import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../_icon'

class Alert extends React.PureComponent {
    constructor(props) {
        super(props);
        const {animatedName} = props;
        this.animatedIn = animatedName + 'In';
        this.animatedOut = animatedName + 'Out';
        this.state = {
            animatedOut: ''
        }
    }

    componentDidMount() {
        if (this.props.duration) {

            this._animatedOutFunc = setTimeout(() => {
                this.setState({
                    animatedOut: this.animatedOut,
                });
            }, this.props.duration);
        }
    }

    componentWillUnmount() {
        if (this._animatedOutFunc) {
            clearTimeout(this._animatedOutFunc);
            this._animatedOutFunc = null
        }
    }

    render() {
        const baseName = 'jd-alert';
        const {type, message, style} = this.props;
        const cls = `${baseName} ${baseName}--${type} animated ${this.animatedIn} ${this.state.animatedOut}`;
        return (
            <div>
                <div className={cls}
                     style={style}
                     onAnimationEnd={this._animatedOut}>
                    {this._getCloseIcon()}
                    {this._getIconType()}
                    <div className="jd-alert__msg-wrap">
                        <div className="jd-alert__msg">
                            {message}
                        </div>
                        {this._getDescription()}
                    </div>
                </div>
            </div>
        )
    }

    _getIconType = () => {
        const {type} = this.props;
        if (type) {
            let iconName;
            switch (type.toLowerCase()) {
                case 'info':
                    iconName = 'warning-up-O';
                    break;
                case 'success':
                    iconName = 'check-O';
                    break;
                case 'warning':
                    iconName = 'warning-down-O';
                    break;
                case 'error':
                    iconName = 'close-O';
                    break;
                default:
                    break;
            }
            if (iconName) {
                return <Icon name={iconName} className="jd-alert__icon"/>
            }
        }
    }

    _getCloseIcon = () => {
        const {closable} = this.props;
        if (closable) {
            return (
                <a className="jd-alert__close" onClick={this._handleClose}>
                    <Icon name="close"/>
                </a>
            )
        }
    }

    _getDescription = () => {
        const {description} = this.props;
        if (description) {
            return (
                <div className="jd-alert__description">
                    {description}
                </div>
            )
        }
    }

    _handleClose = (e) => {
        this.setState({
            animatedOut: this.animatedOut
        })
    };

    _animatedOut = (e) => {
        const {onClose} = this.props;
        const component = e.target;
        /* 动画结束移除组件 */
        if (component.className.indexOf(this.animatedOut) > -1) {
            component.parentNode.removeChild(component);
            if (onClose) {
                onClose();
            }
        }
    }
}

Alert.defaultProps = {
    closable: true,
    animatedName: 'fade',
}

Alert.propTypes = {
    /**
     * 指定警告提示的样式
     *有四种选择 success、info、warning、error
     */
    type: PropTypes.string,
    /**
     * 是否显示关闭按钮
     */
    closable: PropTypes.bool,
    /**
     * 关闭时触发的回调函数
     */
    onClose: PropTypes.func,
    /**
     * 自动关闭
     */
    duration: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * 样式
     */
    style: PropTypes.object,
    /**
     * 警告提示内容
     */
    message: PropTypes.oneOfType([PropTypes.element, PropTypes.string]).isRequired,
    /**
     * 警告提示的辅助性文字介绍
     */
    description: PropTypes.oneOfType([PropTypes.element, PropTypes.string]),
    /**
     * 动画名称
     */
    animatedName: PropTypes.string

};

export default Alert;