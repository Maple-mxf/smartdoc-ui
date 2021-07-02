import Loadable from '@loadable/component'
import {Group, MenuBook, Person, ScreenShare, Settings, Widgets} from "@material-ui/icons";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import React from "react";

// Project
const ProjectIconComponent = () => {
    return (<ListItemIcon><Widgets /></ListItemIcon>)
}
const ProjectComponent = Loadable(() => import('../main/project'))

const MemberIconComponent = () => {
    return (<ListItemIcon><Person /></ListItemIcon>)
}

const GroupIconComponent = () => {
    return (<ListItemIcon><Group /></ListItemIcon> )
}
const GroupComponent = Loadable(()=>import('../main/group'))

const DocumentIconComponent = () => {
    return (<ListItemIcon>  <MenuBook /></ListItemIcon>)
}
const ConnectionServiceIconComponent = () => {
    return (<ListItemIcon><ScreenShare /></ListItemIcon>)
}

const SettingsIconComponent = () => {
    return (<ListItemIcon><Settings /></ListItemIcon>)
}

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