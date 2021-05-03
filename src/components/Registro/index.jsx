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
import {
  registerUser
} from '../../redux/projects/duck'
import { notification } from 'antd'

var bg = require('../../static/background_signing.png')

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

export default function RegisterScreen(history) {

  const classes = useStyles();
  const dispatch = useDispatch()
  const token = useSelector(state => state.projects.token)
  const registerResponse = useSelector(state => state.projects.registerResponse)

  const handleSubmit = e => {
    e.preventDefault()

    console.log('e', e)
  }

  useEffect(() => {
    if(token) {
      notification.success({
        placement: 'bottomRight',
        message: 'Oh yes!',
        description:
          `You're logged in!`,
        duration: 5
      });

      setTimeout(() => {
        window.location = '/'
      }, 5000)
    }
  }, [token])

  useEffect(() => {
    if(registerResponse === 'email_exists') {
      notification.error({
        placement: 'bottomRight',
        message: 'Oh no!',
        description:
          `The email is already in use`,
        duration: 5
      });
    }
  }, [registerResponse])

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
            Regístrate
          </Typography>
          <Formik
            className={classes.form}
            initialValues={{ 
              name: '', 
              last_name: '',
              email: '',
              password: '',
              password_repeat: ''
            }}
            validate={values => {
              const errors = {};

              if(values.name.length === 0) errors.name = 'Debe ingresar su nombre'
              if(values.last_name.length === 0) errors.last_name = 'Debe ingresar su apellido'

              if (!values.email) {
                errors.email = 'Email obligatorio';
              } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
              ) {
                errors.email = 'Email inválido';
              }

              if(values.password.length === 0) errors.password = 'Debe ingresar su contraseña'
              if(values.password.length === 0) {
                errors.password_repeat = 'Debe reingresar su contraseña'
              }else if(values.password !== values.password_repeat) {
                errors.password_repeat = 'Las contraseñas no son iguales'
              }

              return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
              
              setSubmitting(false)
              dispatch(registerUser(values))

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

              <form onSubmit={handleSubmit}>
  
                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  id="name"
                  label="Nombre"
                  name="name"
                  autoComplete="off"
                  autoFocus
                  onChange={handleChange}
                  value={values.name}
                />
                {errors.name && touched.name && (
                  <span style={{ color: 'red' }}>{errors.name}</span>
                )}

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="last_name"
                  label="Apellido"
                  id="last_name"
                  autoComplete="off"
                  onChange={handleChange}
                  value={values.last_name}
                />
                {errors.last_name && touched.last_name && (
                  <span style={{ color: 'red' }}>{errors.last_name}</span>
                )}

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="email"
                  label="Email"
                  id="email"
                  autoComplete="off"
                  onChange={handleChange}
                  value={values.email}
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
                  id="password"
                  type="password"
                  autoComplete="off"
                  onChange={handleChange}
                  value={values.password}
                />
                {errors.password && touched.password && (
                  <span style={{ color: 'red' }}>{errors.password}</span>
                )}

                <TextField
                  variant="outlined"
                  margin="normal"
                  fullWidth
                  name="password_repeat"
                  label="Repetir contraseña"
                  id="password_repeat"
                  type="password"
                  autoComplete="off"
                  onChange={handleChange}
                  value={values.password_repeat}
                />
                {errors.password_repeat && touched.password_repeat && (
                  <span style={{ color: 'red' }}>{errors.password_repeat}</span>
                )}
  
                <Button
                  className={classes.submit}
                  type="submit"
                  fullWidth
                  variant="contained"
                  color="primary"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? 'Registrando..' : 'Registrarme'}
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