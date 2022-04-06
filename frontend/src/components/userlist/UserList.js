import React, { useEffect } from 'react';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import makeStyles from '@material-ui/core/styles/makeStyles';
import Divider from '@material-ui/core/Divider';
import { useSocket } from '../../contexts/SocketProvider';
import { useAppState } from '../../contexts/AppStateProvider';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(2),
  },
  userList: {
    height: '50%',
    maxHeight: '50vh',
    overflow: 'auto',
  },
  item: {
    padding: theme.spacing(1),
  },
}));

const UserList = () => {
  const { userList } = useAppState();
  const socket = useSocket();
  const classes = useStyles();

  useEffect(() => {
    socket.emit('getUserList');
  }, [socket]);

  useEffect(() => {
    const setUserList = (newList) => userList.set(newList);
    socket.on('synchronizeUserList', setUserList);
    
    return () => {
      socket.off('synchronizeUserList', setUserList);
    };
  }, [socket, userList]);

  return (
    <div className={classes.root}>
      <Typography variant="h5" component="h2" color="secondary">
        UserList
      </Typography>
      <List className={classes.userList}>
        {userList.current.length === 0 ? (
          <Typography>Empty...</Typography>
        ) : (
          userList.current.map((el, i) => (
            <React.Fragment key={`${el}-${i}`}>
              {i !== 0 && <Divider />}
              <ListItem button className={classes.item}>
                <ListItemText primary={el} />
              </ListItem>
            </React.Fragment>
          ))
        )}
      </List>
    </div>
  );
};

export default UserList;
