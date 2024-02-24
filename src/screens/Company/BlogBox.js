import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
    blogBox: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: theme.spacing(2),
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.1)', // Adding a shadow
        maxWidth: 600,
        margin: '0 auto',
        marginBottom: theme.spacing(2),
        borderRadius: 10,
    },
    image: {
        width: 150,
        height: 150,
        marginRight: theme.spacing(2),
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: theme.spacing(1),
    },
    date: {
        fontSize: 14,
        color: '#555',
    },
    readTime: {
        fontSize: 14,
        color: '#555',
        marginLeft: theme.spacing(2),
    },
}));

const BlogBox = ({ image, title, date, readTime }) => {
    const classes = useStyles();

    return (
        <Paper elevation={3} className={classes.blogBox}>
            <img src={image} alt={title} className={classes.image} />
            <div>
                <Typography variant="h3" component="h2" className={classes.title}>
                    {title}
                </Typography>

                <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="textSecondary" className={classes.date}>
                        {date}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" className={classes.readTime}>
                        {readTime}
                    </Typography>
                </div>
            </div>
        </Paper>
    );
};

export default BlogBox;