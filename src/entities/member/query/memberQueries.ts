export const crewMemberQueries = {
  allKeys: ['crewMember'] as const,
  crewMembers: ({ crewId }: { crewId: number }) => [...crewMemberQueries.allKeys, crewId],
};
