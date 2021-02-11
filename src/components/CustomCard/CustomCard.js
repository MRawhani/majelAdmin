import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import Edit from '@material-ui/icons/Edit';
import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Info from '../Typography/Info';
import Primary from 'components/Typography/Primary';
import Warning from '../Typography/Warning';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
    marginBottom:'10px'
  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeReviewCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);
const {product,children}= props;
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card className={classes.root}>
      {/* <CardHeader
        avatar={
          <Avatar aria-label="recipe" className={classes.avatar}>
            R
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title="Shrimp and Chorizo Paella"
        subheader="September 14, 2016"
      /> */}
      <CardMedia
        className={classes.media}
       image={product.photos[0]}
        title="منتج"
      />
      <CardContent>
        <Typography variant="h5" color="textPrimary" component="h3">
         {product.name}
        </Typography>
        <Info> تم حجزه {product.bookings.length} مرات</Info>
        <Primary>صنف : {product.categoryName.name} </Primary>
        <Warning>السعر : {product.price} </Warning>
      </CardContent>
      <CardActions disableSpacing>
        <IconButton onClick={props.editProduct} aria-label="edit">
          <Edit />
        </IconButton>
        <IconButton onClick={props.deleteProduct} aria-label="delete">
          <Delete />
        </IconButton>
      
        <IconButton 
          className={clsx(classes.expand, {
            [classes.expandOpen]: expanded,
          })}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </IconButton>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
       {children}
        </CardContent>
      </Collapse>
    </Card>
  );
}
