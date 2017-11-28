import React  from 'react';
import PropTypes from 'prop-types';

class Mask extends React.PureComponent{
    render(){
        const baseName = 'jd-mask';
        const { className, style, onClick } = this.props;
        const cls = `${baseName}-${className}`;
      
        return (
            <div className={cls} style={style} onClick={onClick}></div>
        )
    }
}

Mask.defaultProps = {
    className: 'default',
}

Mask.propTypes = {
    /**
    * 类名
    */
    className: PropTypes.string,  
    /**
    * 样式
    */
    style: PropTypes.object
}

export default Mask;