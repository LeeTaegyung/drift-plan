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
      detail: (tripId: string) => `/trips/${tripId}`,
      checklist: (tripId: string) => `/trips/${tripId}/checklist`,
      edit: (tripId: string) => `/trips/${tripId}/edit`,
      schedule: (tripId: string, dateId: string) =>
        `/trips/${tripId}/schedule/${dateId}`,
    },
  },
};
