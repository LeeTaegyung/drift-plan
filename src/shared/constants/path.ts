export const PATH = {
  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
    forgotPassword: '/forgot-password',
    forgotPasswordSuccess: '/forgot-password/send-success',
    resetPassword: '/reset-password',
    error: '/auth/error',
    confirm: '/auth/confirm',
  },
  global: {
    main: '/',
    trips: {
      list: '/trips',
      create: '/trips/create',
      detail: '/trips/:trimId',
      edit: '/trips/:trimId/edit',
      days: '/trips/:trimId/days/:date',
    },
  },
};
