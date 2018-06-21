import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';

const styles = (theme) => ({

  media: {
    height: 0,
    // paddingTop: '56.25%', // 16:9
    paddingTop: '70%', // 16:9
  },

  caption: {
    height: 40,
    overflow: "hidden"
  }

});

class ActivityCard extends Component {

  getMediaInfo(data) {console.log(data);
    let title = "", description = "", media = "", url = "";
    if(data.action === "liked"){
      media = data.data.media.images.length ? data.data.media.images[0].url : "";
      title = "❤ Liked";
      description = data.data.media.caption;
      url = data.data.media.webLink;
    }
    return { title, description, media, url };
  }

  render() {
    let { classes, log, className = "" } = this.props;
    let { data, date } = log;
    let { title, description, media, url } = this.getMediaInfo(data);

    return (
      <Card className={className}>
        <CardMedia
          className={classes.media}
          image={media}
          title={title}
        />
        <CardContent>
          <Typography gutterBottom variant="headline" component="h2">
            {title}
          </Typography>
          <Typography component="p" className={classes.caption}>
            {description}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" color="primary" href={url} target="_blank">
            Open in new Tab
          </Button>
        </CardActions>
      </Card>
    );
  }
}

export default withStyles(styles)(ActivityCard);
