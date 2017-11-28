import React from 'react';
import PropTypes from 'prop-types';
// import { uploadImg } from 'services/uploadService';

class Uploader extends React.PureComponent {
    constructor(props) {
        super(props);
        this.state = {
            accept: '*'
        };
    }

    render() {
        const {accept, multiple, uploadLabel} = this.props;
        const basename = 'jd';
        return (
            <div className={`${basename}-file-upload`}>
                <label className={`${basename}-button  ${basename}-button--normal ${basename}-button--primary`}>{uploadLabel}
                    <form ref="form" className={`${basename}-file-upload__form`}>
                        <input onChange={this._onChange.bind(this)} multiple={multiple} type="file" accept={accept} className={`${basename}-file-upload__input`}/>
                    </form>
                </label>
            </div>
        )
    }

    _onChange(e) {
        const {beforeUpload, multiple} = this.props;
        const fileList = e.target.files;
        if (!fileList.length)
            return;

        const file = multiple
            ? fileList
            : fileList[0],
            upload = this.props.upload ? this.props.upload : this._upload.bind(this);

        if (beforeUpload) {
            let before = beforeUpload(file);
            if (before && !!before.then) {
                before.then(file => {
                    if(file) {
                        upload(file);
                    }
                }).catch(err => {
                    throw err;
                });
            } else if (!!before) {
                upload(file);
            }
        } else {
            upload(file);
        }
    }

    _upload(file) {
        const { uploadType, uploadData, onStart, onSuccess, onError } = this.props;
        if (uploadType === 'file') {

        } else if (uploadType === 'img') {
            onStart && onStart();
            uploadImg(uploadData, file).then(res => {
                onSuccess && onSuccess(res);
            }).catch(err => {
                onError && onError(err);
            });
        } else {
            throw new Error('uploader: invalid upload type');
        }
    }
}

Uploader.defaultProps = {
    accept: '*',
    multiple: false,
    uploadData: {},
    uploadType: 'file',
    uploadLabel: '上传'
}

Uploader.propTypes = {
    /**
     * 允许上传的文件类型
     */
    accept: PropTypes.string,
    /**
     * 是否多文件上传
     */
    multiple: PropTypes.bool,
    /**
     * 上传种类
     */
    uploadType: PropTypes.string,
    uploadData: PropTypes.object,
    beforeUpload: PropTypes.func,
    upload: PropTypes.func,
    onStart: PropTypes.func,
    onSuccess: PropTypes.func,
    onError: PropTypes.func,
    uploadLabel: PropTypes.string
}

export default Uploader;
