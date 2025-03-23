export const routePaths = {
  auth: '/auth',
  main: '/main',
  signIn: '/signin',
  signUp: '/signup',
  member: '/member/:crewId',
  memberJoin: '/invite',
  home: '/home/:crewId',
  moment: '/moment/:crewId',
  chat: '/chat/:crewId',
  createCrew: '/crew/create',
  momentCreate: {
    path: '/crew/:crewId/moment/create',
    getPath: (crewId: number) => `/crew/${crewId}/moment/create`,
  },
};
