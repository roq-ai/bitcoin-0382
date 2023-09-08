interface AppConfigInterface {
  ownerRoles: string[];
  customerRoles: string[];
  tenantRoles: string[];
  tenantName: string;
  applicationName: string;
  addOns: string[];
  ownerAbilities: string[];
  customerAbilities: string[];
}
export const appConfig: AppConfigInterface = {
  ownerRoles: ['Financial Manager'],
  customerRoles: [],
  tenantRoles: ['Account Owner', 'Team Member', 'Financial Manager'],
  tenantName: 'Organization',
  applicationName: 'BITCOIN',
  addOns: ['file upload', 'chat', 'notifications', 'file'],
  customerAbilities: [],
  ownerAbilities: [
    "Manage organization's registration",
    'Manage cryptocurrency deposits',
    'View daily percentage gain from cryptocurrency',
    'Manage Account Owners and Team Members',
    "Update organization's information",
  ],
};
