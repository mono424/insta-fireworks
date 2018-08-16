import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import LabelIcon from '@material-ui/icons/Label';
import Button from '@material-ui/core/Button';
import TagAddDialog from './TagAddDialog';

const styles = theme => ({
    root: {
        textAlign: "center",
        padding: "20px 10px"
    },
    flex: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
        marginBottom: 20
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
    button: {

    }
});

class Tags extends React.Component {

    state = {
        tagDialogOpen: false,
    };

    openTagDialog = () => {
        this.setState({ tagDialogOpen: true });
    };

    onTagAdd = (tag) => {
        this.props.tags.push(tag);
        this.props.onChange(this.props.tags);
        this.setState({ tagDialogOpen: false });
    };

    onTagCancel = () => {
        this.setState({ tagDialogOpen: false });
    };

    onTagDelete = (tag) => {
        this.props.onChange(this.props.tags.filter(t => t !== tag));
    }

    render() {
        const { tagDialogOpen } = this.state;
        const { classes, tags } = this.props;

        return (
            <Paper className={classes.root}>
                <div className={classes.flex}>
                    {tags.map(tag => {
                        return (
                            <Chip
                                key={tag}
                                label={tag}
                                onDelete={() => this.onTagDelete(tag)}
                                className={classes.chip}
                            />
                        );
                    })}
                </div>
                <Button onClick={this.openTagDialog} color="primary" className={classes.button}>
                    Add
                </Button>
                <TagAddDialog open={tagDialogOpen} onAdd={this.onTagAdd} onCancel={this.onTagCancel} />
            </Paper>
        );
    }
}

export default withStyles(styles)(Tags);