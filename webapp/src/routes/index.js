import React, { lazy } from 'react'

import {
  Grid as GridIcon,
  Info as InfoIcon,
  GitHub as GitHubIcon,
  Send as TelegramIcon
} from 'react-feather'

const Home = lazy(() => import('./Home'))
const Results = lazy(() => import('./Results'))
const Page404 = lazy(() => import('./Route404'))

const routes = [
  {
    name: 'home',
    icon: <GridIcon />,
    component: Home,
    path: '/',
    exact: true
  },
  {
    header: 'docs',
    name: 'result',
    icon: <InfoIcon />,
    component: Results,
    path: '/result',
    exact: true
  },
  {
    header: 'community',
    name: 'github',
    path: 'https://github.com/eoscostarica/full-stack-boilerplate',
    icon: <GitHubIcon />
  },
  {
    name: 'telegram',
    path: 'https://t.me/eoscr',
    icon: <TelegramIcon />
  },
  {
    component: Page404
  }
]

export default role => {
  const routesForRole = routes.filter(
    route => !route.roles || route.roles.includes(role)
  )

  return {
    sidebar: routesForRole.filter(route => !!route.name),
    browser: routesForRole
      .reduce(
        (routes, route) => [
          ...routes,
          ...(route.childrens ? route.childrens : [route])
        ],
        []
      )
      .filter(route => !!route.component)
  }
}
