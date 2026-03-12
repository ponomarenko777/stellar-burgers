import { ProfileUI } from '@ui-pages';
import { FC, SyntheticEvent, useEffect, useState, ChangeEvent } from 'react';

import { useDispatch, useSelector } from '../../services/store';
import type { RootState } from '../../services/store';

import { updateUserThunk } from '@slices/authSlice';

export const Profile: FC = () => {
  const dispatch = useDispatch();

  const user = useSelector((s: RootState) => s.auth.user);

  const [formValue, setFormValue] = useState({
    name: user?.name || '',
    email: user?.email || '',
    password: ''
  });

  useEffect(() => {
    setFormValue((prev) => ({
      ...prev,
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    }));
  }, [user]);

  const isFormChanged =
    formValue.name !== (user?.name || '') ||
    formValue.email !== (user?.email || '') ||
    !!formValue.password;

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();

    const payload: { name?: string; email?: string; password?: string } = {};

    if (formValue.name !== (user?.name || '')) payload.name = formValue.name;
    if (formValue.email !== (user?.email || ''))
      payload.email = formValue.email;
    if (formValue.password) payload.password = formValue.password;

    dispatch(updateUserThunk(payload));
  };

  const handleCancel = (e: SyntheticEvent) => {
    e.preventDefault();
    setFormValue({
      name: user?.name || '',
      email: user?.email || '',
      password: ''
    });
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormValue((prev) => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <ProfileUI
      formValue={formValue}
      isFormChanged={isFormChanged}
      handleCancel={handleCancel}
      handleSubmit={handleSubmit}
      handleInputChange={handleInputChange}
    />
  );
};
