import React, { useEffect } from 'react';
import { Formik } from 'formik';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser } from '../redux/projects/duck'
import { notification } from 'antd';

var bg = require('../static/background_signing.png')

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: `url(${bg})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: '170%',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(10, 10),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(3),
    backgroundColor: theme.palette.secondary.light,
  },
  form: {
    width: '85%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function LoginScreen() {
  const classes = useStyles();
  const dispatch = useDispatch()
  const token = useSelector(state => state.projects.token)
  const loginResponse = useSelector(state => state.projects.loginResponse)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if(token) window.location = '/'
  }, [])

  useEffect(() => {
    if(token) localStorage.setItem('token', token)
  }, [token])

  useEffect(() => {
    if(loginResponse === 'invalid_credentials') {
      notification.error({
        placement: 'bottomRight',
        message: 'Oh no!',
        description:
          'Invalid login data',
        duration: 5
      })
    }else if(loginResponse === 'logged_in') {
      notification.success({
        placement: 'bottomRight',
        message: 'Oh yes!',
        description:
          'Logged In!',
        duration: 5
      })

      setTimeout(() => {
        window.location = '/'
      }, 5000)
    }
  }, [loginResponse])

  return (

    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Entrar al sistema
          </Typography>

          <Formik
            initialValues={{ 
              email: '', 
              password: '',
            }}
            validate={values => {
              const errors = {};

              if(values.email.length === 0) errors.email = 'Debe ingresar su email'

              if (!values.email) {
                errors.email = 'Email obligatorio';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Email inválido';
              }

              if(values.password.length === 0) errors.password = 'Debe ingresar su contraseña'

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              
              setSubmitting(false)
              dispatch(loginUser(values))

            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
              /* and other goodies */
            }) => (
              <form onSubmit={handleSubmit} className={classes.form}>
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="email"
                  label="Email"
                  name="email"
                  autoComplete="off"
                  autoFocus
                  value={values.email}
                  onChange={handleChange}
                />
                {errors.email && touched.email && (
                  <span style={{ color: 'red' }}>{errors.email}</span>
                )}

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password"
                  label="Contraseña"
                  type="password"
                  id="password"
                  autoComplete="off"
                  value={values.password}
                  onChange={handleChange}
                />
                {errors.password && touched.password && (
                  <span style={{ color: 'red' }}>{errors.password}</span>
                )}

                <Button
                  className={classes.submit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  Iniciar Sesion
                </Button>
                <Grid container>
                  <Grid item xs>
                    <Link href="#" variant="body2">
                      Olvidó la contraseña?
                    </Link>
                  </Grid>
                  <Grid item>
                    <Link href="#" variant="body2">
                      {"¿No tienes una cuenta? Registrate!"}
                    </Link>
                  </Grid>
                </Grid>
                <Box mt={5}>
                </Box>
              </form>
            )}
          </Formik>

        </div>
      </Grid>
    </Grid>
  );
}