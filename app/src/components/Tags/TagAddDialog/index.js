import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default class TagAddDialog extends React.Component {

    state = {
        tag: ""
    }

    onTextChange = (e) => {
        this.setState({ tag: e.target.value })
    }

    onAdd = () => {
        let { tag } = this.state;
        this.setState({ tag: "" });
        this.props.onAdd(tag);
    }

    render() {
        return (
            <Dialog
                open={this.props.open}
                onClose={this.props.onCancel}
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle id="form-dialog-title">Add Tag</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        label="Tag"
                        type="text"
                        fullWidth
                        value={this.state.tag}
                        onChange={this.onTextChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={this.onAdd} color="primary">
                        Add
                    </Button>
                </DialogActions>
            </Dialog>
        );
    }
}