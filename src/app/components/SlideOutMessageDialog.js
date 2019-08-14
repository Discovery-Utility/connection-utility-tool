import React, {Component} from 'react';
import t from './../locales/translation'
import Button from './../components/Button';

import './../../scss/components/_slideoutdialog.scss';

/**
 * SlideOutMessageDialog displayed title and body text message.
 */
class SlideOutMessageDialog extends Component {
    render() {
        return (
            <div>
                <div className="modal fade" id="modal" tabIndex="-1" role="dialog"
                     aria-labelledby="exampleModalLabel4" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-slideout modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title" id="exampleModalLabel">{this.props.title}</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">×</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                {this.props.body}
                            </div>
                            <div className="modal-footer">
                                <Button data-dismiss="modal" aria-label="Close" text={t.ACTION_OK.toUpperCase()} available={true}
                                        onClick={() => {}}/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default SlideOutMessageDialog;
