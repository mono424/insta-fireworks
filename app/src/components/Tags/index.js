import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import LabelIcon from '@material-ui/icons/Label';
import Button from '@material-ui/core/Button';

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

    onDelete = (tag) => {
        this.props.onChange(this.props.tags.filter(t => t !== tag));
    }

    render() {
        const { classes, tags } = this.props;

        return (
            <Paper className={classes.root}>
                <div className={classes.flex}>
                    {tags.map(tag => {
                        return (
                            <Chip
                                key={tag}
                                label={tag}
                                onDelete={() => this.onDelete(tag)}
                                className={classes.chip}
                            />
                        );
                    })}
                </div>
                <Button color="primary" className={classes.button}>
                    Add
                </Button>
            </Paper>
        );
    }
}

export default withStyles(styles)(Tags);