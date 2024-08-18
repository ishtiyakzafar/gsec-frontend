
import Dashboard from './views/Dashboard.js'
import IssuesForm from './views/adminViews/Issues/IssuesForm.js'
import IssuesTable from './views/adminViews/Issues/IssuesTable.js'
import BannerTable from './views/adminViews/BannerTable.js'
import BannerForm from './views/adminViews/BannerForm.js'
import IssuesDetailPage from './views/adminViews/Issues/IssuesDetailPage.js'

export var routes = [

  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/issue/create",
    name: "Create Issues",
    icon: "nc-icon nc-bank",
    component: IssuesForm,
    layout: "/admin",
  },
  {
    path: "/issues",
    name: "Issues",
    icon: "nc-icon nc-bank",
    component: IssuesTable,
    layout: "/admin",
  },
  {
    path: "/issue/:id",
    name: "Issue Detail",
    icon: "nc-icon nc-bank",
    component: IssuesDetailPage,
    layout: "/admin",
  },
  // {
  //   path: "/banners",
  //   name: "Banners",
  //   icon: "nc-icon nc-album-2",
  //   component: BannerTable,
  //   layout: "/admin",
  // },  
  // {
  //   path: "/banner-create",
  //   name: "Create Banners",
  //   icon: "nc-icon nc-simple-add",
  //   component: BannerForm,
  //   layout: "/admin",
  // },


]

export var sidebarRoutes = [
  
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-app",
    component: Dashboard,
    layout: "/admin",
  },
  {
    path: "/issue/create",
    name: "Create Issues",
    icon: "nc-icon nc-simple-add",
    component: IssuesForm,
    layout: "/admin",
  },
  {
    path: "/issues",
    name: "Issues",
    icon: "nc-icon nc-bank",
    component: IssuesTable,
    layout: "/admin",
  },
  // {
  //   path: "/banners",
  //   name: "Banners",
  //   icon: "nc-icon nc-album-2",
  //   component: BannerTable,
  //   layout: "/admin",
  // },  
  // {
  //   path: "/banner-create",
  //   name: "Create Banners",
  //   icon: "nc-icon nc-simple-add",
  //   component: BannerForm,
  //   layout: "/admin",
  // },
  
]
