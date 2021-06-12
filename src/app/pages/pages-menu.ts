import {NbMenuItem} from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Dashboard',
    icon: 'home-outline',
    link: '/pages/dashboard',
  },
  {
    title: 'Customer',
    icon: 'person-outline',
    link: '/pages/customer',
  },
  {
    title: 'Products',
    icon: 'shopping-bag-outline',
    link: '/pages/products',
  },
  {
    title: 'Category',
    icon: 'shopping-bag-outline',
    link: '/pages/categories',
  },
  // {
  //   title: 'Options',
  //   icon: 'cube-outline',
  //   children: [
  //     {
  //       title: 'Size',
  //       icon: 'activity-outline',
  //       link: '/pages/options/size',
  //     },
  //     {
  //       title: 'Ice',
  //       icon: 'droplet-outline',
  //       link: '/pages/options/ice',
  //     },
  //     {
  //       title: 'Topping',
  //       icon: 'grid-outline',
  //       link: '/pages/options/topping',
  //     },
  //   ],
  // },
  {
    title: 'FEATURES',
    group: true,
  },
];
