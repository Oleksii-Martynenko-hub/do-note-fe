import { selectUser } from '@/store/selectors/user';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Btn from '@/components/common/Btn';
import { addNotesAsync, logoutAsync } from '@/store/actions/user';

const Notes: React.FC = () => {
  const {
    uid, username, email, avatar_url,
  } = useSelector(selectUser);

  const dispatch = useDispatch();

  return (
    <>
      <h2>{uid}</h2>
      <h2>{username}</h2>
      <h2>{email}</h2>
      <img src={avatar_url || ''} alt="avatar" />

      <Btn onClick={() => dispatch(addNotesAsync())} type="button">
        add notes
      </Btn>

      <Btn onClick={() => dispatch(logoutAsync())} type="button">
        Log Out
      </Btn>
    </>
  );
};

export default Notes;
