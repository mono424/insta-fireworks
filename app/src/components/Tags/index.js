import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import Paper from '@material-ui/core/Paper';
import LabelIcon from '@material-ui/icons/Label';

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        padding: theme.spacing.unit / 2,
    },
    chip: {
        margin: theme.spacing.unit / 2,
    },
});

class Tags extends React.Component {

    render() {
        const { classes, tags } = this.props;

        return (
            <Paper className={classes.root}>
                {tags.map(tag => {
                    return (
                        <Chip
                            key={tag}
                            label={tag}
                            onDelete={() => this.props.onDelete(tag)}
                            className={classes.chip}
                        />
                    );
                })}
            </Paper>
        );
    }
}

export default withStyles(styles)(Tags);