export const PATH = {
  auth: {
    signIn: '/sign-in',
    signUp: '/sign-up',
    forgotPassword: '/forgot-password',
    resetPassword: '/reset-password',
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
