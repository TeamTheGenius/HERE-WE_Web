export const routePaths = {
  auth: '/auth',
  signIn: '/',
  signUp: '/signup',
  main: '/main',
  createCrew: '/crew/create',
  member: '/member/:crewId',
  memberJoin: '/invite',
  home: {
    path: '/home/:crewId',
    getPath: (crewId: number) => `/home/${crewId}`,
  },
  moment: '/moment/:crewId',
  momentCreate: {
    path: '/crew/:crewId/moment/create',
    getPath: (crewId: number) => `/crew/${crewId}/moment/create`,
  },
  momentEdit: {
    path: '/crew/:crewId/moment/edit/:momentId',
    getPath: (crewId: number, momentId: number) => `/crew/${crewId}/moment/edit/${momentId}`,
  },
  momentDetail: {
    path: '/crew/:crewId/moment/:momentId',
    getPath: (crewId: number, momentId: number) => `/crew/${crewId}/moment/${momentId}`,
  },
  momentPlace: {
    path: '/crew/:crewId/moment/:momentId/place',
    getPath: (crewId: number, momentId: number) => `/crew/${crewId}/moment/${momentId}/place`,
  },
  upcomingMoment: '/moment/upcoming',
  chat: '/chat/:crewId',
};
