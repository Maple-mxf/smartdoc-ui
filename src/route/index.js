import Loadable from '@loadable/component'
import {Group, MenuBook, Person, ScreenShare, Settings, Widgets} from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import React from "react";
import DocumentComponent from '../main/document'
import EcoIcon from '@material-ui/icons/Eco';

// Project
const ProjectIconComponent = () => (<ListItemIcon><Widgets /></ListItemIcon>)
const ProjectComponent = Loadable(() => import('../main/project'))

const MemberIconComponent = () => (<ListItemIcon><Person /></ListItemIcon>)

const GroupIconComponent = () => (<ListItemIcon><Group /></ListItemIcon> )
const GroupComponent = Loadable(()=>import('../main/group'))

const DocumentIconComponent = () => (<ListItemIcon>  <MenuBook /></ListItemIcon>)
// const DocumentComponent = Loadable(()=>import('../main/document'))

const EnvironmentIconComponent = () => (<ListItemIcon><EcoIcon /></ListItemIcon>)

const ConnectionServiceIconComponent = () => (<ListItemIcon><ScreenShare /></ListItemIcon>)


const SettingsIconComponent = () => (<ListItemIcon><Settings /></ListItemIcon>)

const routeList = [
   [ {
       title: "Project",
       path :"/home/project",
       exact:true,
       iconComponent:ProjectIconComponent,
       mainComponent:ProjectComponent
   },
       {
           title: "Group",
           path :"/home/group",
           exact:true,
           iconComponent:GroupIconComponent,
           mainComponent:GroupComponent
       },
       {
           title: "Member",
           path :"/home/member",
           exact:true,
           iconComponent:MemberIconComponent,
           mainComponent:ProjectComponent
       },
   ],
    [
        {
            title: "API Document",
            path :"/home/document",
            exact:true,
            iconComponent:DocumentIconComponent,
            mainComponent:DocumentComponent
        },
        {
            title: "Environment",
            path :"/home/environment",
            exact:true,
            iconComponent:EnvironmentIconComponent,
            mainComponent:ProjectComponent
        },
        {
            title: "Connection Services",
            path :"/home/connectionServices",
            exact:true,
            iconComponent:ConnectionServiceIconComponent,
            mainComponent:ProjectComponent
        },
        {
            title: "Settings",
            path :"/home/settings",
            exact:true,
            iconComponent:SettingsIconComponent,
            mainComponent:ProjectComponent
        },
    ]
]

export default routeList