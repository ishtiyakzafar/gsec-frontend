
import Dashboard from './views/Dashboard.js'
import IssuesForm from './views/adminViews/Issues/IssuesForm.js'
import IssuesTable from './views/adminViews/Issues/IssuesTable.js'
import BannerTable from './views/adminViews/BannerTable.js'
import BannerForm from './views/adminViews/BannerForm.js'
import IssuesDetailPage from './views/adminViews/Issues/IssuesDetailPage.js'
import Gsec from 'views/adminViews/Gsec/Gsec.js'
import CreateGsec from 'views/adminViews/Gsec/CreateGsec.js'

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
  {
    path: "/create-gsec",
    name: "Create G-Secs",
    icon: "nc-icon nc-simple-add",
    component: CreateGsec,
    layout: "/admin",
  },
  {
    path: "/gsec",
    name: "G-Secs",
    icon: "nc-icon nc-bank",
    component: Gsec,
    layout: "/admin",
  },



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
  {
    path: "/create-gsec",
    name: "Create G-Secs",
    icon: "nc-icon nc-simple-add",
    component: CreateGsec,
    layout: "/admin",
  },
  {
    path: "/gsec",
    name: "G-Secs",
    icon: "nc-icon nc-bank",
    component: Gsec,
    layout: "/admin",
  },


]
