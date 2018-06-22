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
  },

  date: {
    position: "absolute",
    top: 10,
    left: 10,
    background: "rgb(115, 115, 114)",
    color: "white",
    padding: "5px 10px",
    borderRadius: 20
  },

  card: {
    position: "relative"
  }

});

class ActivityCard extends Component {

  formatDate(date) {
    let d = new Date(date);
    return d.getHours().toString().padStart(2, "0") + ":" + d.getMinutes().toString().padStart(2, "0");
  }

  getMediaInfo(data) {
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
    className = className ? classes.card + " " + className : classes.card;

    return (
      <Card className={className}>
        <CardMedia
          className={classes.media}
          image={media}
          title={title}
        />
        <span className={classes.date}>{this.formatDate(date)}</span>
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
