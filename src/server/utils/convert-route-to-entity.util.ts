const mapping: Record<string, string> = {
  deposits: 'deposit',
  minings: 'mining',
  organizations: 'organization',
  profiles: 'profile',
  profits: 'profit',
  users: 'user',
};

export function convertRouteToEntityUtil(route: string) {
  return mapping[route] || route;
}
