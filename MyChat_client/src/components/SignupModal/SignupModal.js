import * as React from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import { styled, css, border } from '@mui/system';
import { Modal as BaseModal } from '@mui/base/Modal';
import { Button, Input } from '@mui/base';
import './SignupModal.css';
import socket from '../../server';

export default function SignupModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [userName, setUserName] = React.useState('');

  const handleSignup = (event) => {
    event.preventDefault();
    console.log('handleSignup called', email);

    socket.emit('signup', email, password, userName, (res) => {
      console.log('signup res : ', res);
      if (res?.ok) {
        alert('등록 성공 !\n', res.user);
        console.log('등록 성공 !', res.user);
      } else {
        alert('등록에 실패했습니다 ! 관리자에게 문의해주세요..');
      }
    });

    handleClose();
  };

  return (
    <div>
      <Button type="button" onClick={handleOpen} className="signup-button">
        등록하기
      </Button>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={open}
        onClose={handleClose}
        slots={{ backdrop: StyledBackdrop }}
      >
        <ModalContent sx={{ width: 400 }} className="modalContent">
          <h2 id="unstyled-modal-title" className="modal-title">
            등록하기
          </h2>
          <form onSubmit={handleSignup} className="login-container">
            <Input
              placeholder="이메일"
              className="login-input"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value);
              }}
              multiline={false}
              rows={1}
            />
            <Input
              placeholder="비밀번호"
              className="login-input"
              value={password}
              onChange={(event) => {
                setPassword(event.target.value);
              }}
              multiline={false}
              rows={1}
            />
            <Input
              placeholder="닉네임"
              className="login-input"
              value={userName}
              onChange={(event) => {
                setUserName(event.target.value);
              }}
              multiline={false}
              rows={1}
            />
            <Button
              className="login-button"
              disabled={email === '' || password === '' || userName === ''}
              type="submit"
            >
              등록
            </Button>
          </form>
        </ModalContent>
      </Modal>
    </div>
  );
}

const Backdrop = React.forwardRef((props, ref) => {
  const { open, className, ...other } = props;
  return (
    <div
      className={clsx({ 'MuiBackdrop-open': open }, className)}
      ref={ref}
      {...other}
    />
  );
});

Backdrop.propTypes = {
  className: PropTypes.string.isRequired,
  open: PropTypes.bool,
};

const blue = {
  200: '#99CCFF',
  300: '#66B2FF',
  400: '#3399FF',
  500: '#007FFF',
  600: '#0072E5',
  700: '#0066CC',
};

const grey = {
  50: '#F3F6F9',
  100: '#E5EAF2',
  200: '#DAE2ED',
  300: '#C7D0DD',
  400: '#B0B8C4',
  500: '#9DA8B7',
  600: '#6B7A90',
  700: '#434D5B',
  800: '#303740',
  900: '#1C2025',
};

const Modal = styled(BaseModal)`
  position: fixed;
  z-index: 1300;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledBackdrop = styled(Backdrop)`
  z-index: -1;
  position: fixed;
  inset: 0;
  background-color: rgb(0 0 0 / 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const ModalContent = styled('div')(
  ({ theme }) => css`
    background-color: ${theme.palette.mode === 'dark' ? grey[900] : '#fff'};

    border: 1px solid ${theme.palette.mode === 'dark' ? grey[700] : grey[200]};
    box-shadow: 0 4px 12px
      ${theme.palette.mode === 'dark' ? 'rgb(0 0 0 / 0.5)' : 'rgb(0 0 0 / 0.2)'};
    padding: 24px;
    color: ${theme.palette.mode === 'dark' ? grey[50] : grey[900]};

    & .modal-title {
      margin: 0;
      line-height: 1.5rem;
      margin-bottom: 8px;
    }

    & .modal-description {
      margin: 0;
      line-height: 1.5rem;
      font-weight: 400;
      color: ${theme.palette.mode === 'dark' ? grey[400] : grey[800]};
      margin-bottom: 4px;
    }
  `
);
