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
      detail: (tripId: number) => `/trips/${tripId}`,
      edit: (tripId: number) => `/trips/${tripId}/edit`,
      days: (tripId: number, dateId: string) =>
        `/trips/${tripId}/days/${dateId}`,
    },
  },
};
