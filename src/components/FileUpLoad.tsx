import * as React from 'react';

interface FilePreViewProps {
    files: Array<string>;
}
interface FileUpLoadProps {
    files: Array<string>;
}

class FilePreview extends React.Component<FilePreViewProps> {
    render() {
        let { files } = this.props;
        return (
        <ul className="vma-upload-list">
            {files.map((file, index) => (
            <li className="vma-upload-item" key={index}>
                <img src={file} alt=""/>
                <label className="vma-upload-item-status"><i className="icon-checkmark"/></label>
                <span className="vma-upload-item-action">
                    <span className="vma-upload-item-preview"><i className="icon-image"/></span>
                    &nbsp;&nbsp;
                    <span className="vma-upload-item-delete"><i className="icon-cross"/></span>
                </span>
            </li>
        ))
            }
        </ul>
        );
    }
}
export class FileUpLoad extends React.Component<FileUpLoadProps & React.InputHTMLAttributes<HTMLInputElement>> {
    inputFile: HTMLInputElement|null;
    render() {
        let { files, multiple, accept } = this.props;
        return (
        <div>
            <FilePreview files={files}/>
            <div className="vma-upload" onClick={this.upload}>
                <i className="icon-plus"/>
                <input 
                    type="file" 
                    style={{display: 'none'}} 
                    multiple={multiple} 
                    accept={accept} 
                    ref={(input) => {this.inputFile = input; }}
                    onChange={this.onChange}
                />
            </div> 
        </div>                 
        );
    }

    upload = () => {
        if (this.inputFile) {
            this.inputFile.click();
        }
    }

    onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        let files: Array<File> = [];
        if (event.target.files !== null) {
            for (let i = 0; i < event.target.files.length; i++) {
                files.push(event.target.files.item(i));
                // tslint:disable-next-line:no-console
                console.log(event.target.files.item(i));
            }
        }
    }
}