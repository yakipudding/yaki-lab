import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { auth } from '../../config/FirebaseConfig'
import { RouteComponentProps } from 'react-router-dom'

interface Props extends RouteComponentProps<{}> {
}

export default function SignInDialog(props: Props) {
  const [values, setValues] = React.useState({
    email: '',
    password: ''
});

const handleChange = (name: string) => (event: React.ChangeEvent<{ value: unknown }>) => {
  setValues({ ...values, [name]: event.target.value });
};

const handleSubmit = (event: React.MouseEvent<HTMLElement>) => {
  event.preventDefault();
  auth.signInWithEmailAndPassword(values.email,values.password).then(() => {
    // props.history.push('/AdminDashboard')
  })
};

  return (
    <div>
      <Dialog open={true} aria-labelledby="signin-title">
        <DialogTitle id="signin-title">管理者用ログイン</DialogTitle>
        <DialogContent>
          <DialogContentText>
            ここは管理者用ページです。ログインしてください。
          </DialogContentText>
          <TextField
            autoFocus
            margin="dense"
            id="mail"
            label="Email Address"
            type="email"
            fullWidth
            onChange={handleChange('email')}
          />
          <TextField
            margin="dense"
            id="password"
            label="Password"
            type="password"
            fullWidth
            onChange={handleChange('password')}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSubmit} color="primary">
            SignIn
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
