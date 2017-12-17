import React, {Component, PureComponent} from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Trigger from 'rc-trigger';
import placements from './placements';
import Icon from '../_icon/index'

export default class Dropdown extends (PureComponent || Component) {
  static propTypes = {
      minOverlayWidthMatchTrigger: PropTypes.bool,
      onVisibleChange: PropTypes.func,
      onOverlayClick: PropTypes.func,
      prefixCls: PropTypes.string,
      children: PropTypes.any,
      transitionName: PropTypes.string,
      overlayClassName: PropTypes.string,
      animation: PropTypes.any,
      align: PropTypes.object,
      overlayStyle: PropTypes.object,
      placement: PropTypes.string,
      overlay: PropTypes.node,
      trigger: PropTypes.array,
      showAction: PropTypes.array,
      hideAction: PropTypes.array,
      getPopupContainer: PropTypes.func,
      visible: PropTypes.bool,
      defaultVisible: PropTypes.bool,
  };

  static defaultProps = {
    minOverlayWidthMatchTrigger: true,
    prefixCls: 'jd-dropdown_back',
    trigger: ['hover'],
    showAction: [],
    hideAction: [],
    overlayClassName: '',
    overlayStyle: {},
    defaultVisible: false,
    onVisibleChange() {
    },
    placement: 'bottomLeft',
  }

  constructor(props) {
    super(props);
    if ('visible' in props) {
      this.state = {
        visible: props.visible,
      };
    } else {
      this.state = {
        visible: props.defaultVisible,
      };
    }
  }


  componentWillReceiveProps({ visible }) {
    if (visible !== undefined) {
      this.setState({
        visible,
      });
    }
  }

  onClick = (e) => {
    const props = this.props;
    const overlayProps = props.overlay.props;
    // do no call onVisibleChange, if you need click to hide, use onClick and control visible
    if (!('visible' in props)) {
      this.setState({
        visible: false,
      });
    }
    if (props.onOverlayClick) {
      props.onOverlayClick(e);
    }
    if (overlayProps.onClick) {
      overlayProps.onClick(e);
    }
  }

  onVisibleChange = (visible) => {
    const props = this.props;
    if (!('visible' in props)) {
      this.setState({
        visible,
      });
    }
    props.onVisibleChange(visible);
  }

  getMenuElement() {
    const { overlay, prefixCls } = this.props;
    const extraOverlayProps = {
      prefixCls: `${prefixCls}-menu`,
      onClick: this.onClick,
    };
    if (typeof overlay.type === 'string') {
      delete extraOverlayProps.prefixCls;
    }
    return React.cloneElement(overlay, extraOverlayProps);
  }

  getPopupDomNode() {
    return this.trigger.getPopupDomNode();
  }

  afterVisibleChange = (visible) => {
    if (visible && this.props.minOverlayWidthMatchTrigger) {
      const overlayNode = this.getPopupDomNode();
      const rootNode = ReactDOM.findDOMNode(this);
      if (rootNode && overlayNode && rootNode.offsetWidth > overlayNode.offsetWidth) {
        overlayNode.style.width = `${rootNode.offsetWidth}px`;
        if (this.trigger &&
            this.trigger._component &&
            this.trigger._component.alignInstance) {
          this.trigger._component.alignInstance.forceAlign();
        }
      }
    }
  }

  saveTrigger = (node) => {
    this.trigger = node;
  }

    _getInput = () => {
        const { placeholder,prefix } = this.props;
        const { value, popupVisible, inputValue } = this.state;

        const clearIcon = ( value.length > 0) || inputValue ? (
            <Icon
                name="close-O"
                className={`${prefix}-dropdown-picker--clear`}
                onClick={this._clearSelection}
            />
        ) : null;

        const label = this._getLabel();
        const input = (
            <span className={`${prefix}-dropdown-picker`}  style={this.props.style}>
                <span className={`${prefix}-dropdown-picker__label`}>
                    { label }
                </span>
                <input
                    type="text"
                    readOnly={true}
                    className={`${prefix}-dropdown-picker__input`}
                    autoComplete="off"
                    placeholder={ value.length === 0 || !label ? placeholder : ""}
                    onClick={this._onIputClick} />

                { clearIcon }

                <Icon
                    name={ popupVisible ? "arrow-up" : "arrow-down"}
                    className={`${prefix}-dropdown-picker--arrow`} />
            </span>
        )

        return input;
    }

  render() {
    const {
        prefixCls,
        children,
        transitionName,
        animation,
        align,
        placement,
        getPopupContainer,
        showAction,
        hideAction,
        overlayClassName,
        overlayStyle,
        trigger,
        ...otherProps,
    } = this.props;

    return (
      <div>
        <Trigger
            {...otherProps}
            prefixCls={prefixCls}
            ref={this.saveTrigger}
            popupClassName={overlayClassName}
            popupStyle={overlayStyle}
            builtinPlacements={placements}
            action={trigger}
            showAction={showAction}
            hideAction={hideAction}
            popupPlacement={placement}
            popupAlign={align}
            popupTransitionName={transitionName}
            popupAnimation={animation}
            popupVisible={this.state.visible}
            afterPopupVisibleChange={this.afterVisibleChange}
            popup={this.getMenuElement()}
            onPopupVisibleChange={this.onVisibleChange}
            getPopupContainer={getPopupContainer}
        >
            {children}
        </Trigger>
      </div>
    );
  }
}
