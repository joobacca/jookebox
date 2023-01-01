import React, { useEffect } from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import { useSocket } from '../../contexts/SocketProvider';
import { useAppState } from '../../contexts/AppStateProvider';
import { Box } from '@mui/material';

const UserList = () => {
  const { userList } = useAppState();
  const socket = useSocket();

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
    <Box sx={{ padding: 2 }}>
      <Typography variant="h5" component="h2" color="secondary">
        UserList
      </Typography>
      <List
        sx={{
          height: '50%',
          maxHeight: '50vh',
          overflow: 'auto',
        }}
      >
        {userList.current.length === 0 ? (
          <Typography>Empty...</Typography>
        ) : (
          userList.current.map((el, i) => (
            <React.Fragment key={`${el}-${i}`}>
              {i !== 0 && <Divider />}
              <ListItem button sx={{ padding: 1 }}>
                <ListItemText primary={el} />
              </ListItem>
            </React.Fragment>
          ))
        )}
      </List>
    </Box>
  );
};

export default UserList;
