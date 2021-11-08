import Loadable from '@loadable/component'
import React from "react";
import DocumentComponent from '../main/document'
import WidgetsOutlinedIcon from '@mui/icons-material/WidgetsOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import PersonIcon from '@mui/icons-material/Person';
import DocumentScannerOutlinedIcon from '@mui/icons-material/DocumentScannerOutlined';
import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import SettingsSystemDaydreamIcon from '@mui/icons-material/SettingsSystemDaydream';
import SettingsSystemDaydreamOutlinedIcon from '@mui/icons-material/SettingsSystemDaydreamOutlined';
import DeveloperModeOutlinedIcon from '@mui/icons-material/DeveloperModeOutlined';
import DeveloperModeIcon from '@mui/icons-material/DeveloperMode';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import {Groups, Settings, Widgets} from "@mui/icons-material";

// Project
const ProjectOutlinedIconComponent = () => (<WidgetsOutlinedIcon/>)
const ProjectFilledIconComponent = () => (<Widgets color="primary"/>)
const ProjectComponent = Loadable(() => import('../main/project'))

// Member
const MemberFilledIconComponent = () => (<PersonIcon color="primary"/>)
const MemberOutlinedIconComponent = () => (<PersonOutlineOutlinedIcon/>)

// Group
const GroupFilledIconComponent = (theme) => (<Groups color='primary'/>)
const GroupOutlinedIconComponent = () => (<GroupsOutlinedIcon/>)
const GroupComponent = Loadable(() => import('../main/group'))

// Document
const DocumentFilledIconComponent = () => (<DocumentScannerIcon color='primary'/>)
const DocumentOutlineIconComponent = () => (<DocumentScannerOutlinedIcon/>)

const EnvironmentFilledIconComponent = () => (<SettingsSystemDaydreamIcon color='primary'/>)
const EnvironmentOutlinedIconComponent = () => (<SettingsSystemDaydreamOutlinedIcon/>)

const ConnectionServiceFilledIconComponent = () => (<DeveloperModeIcon color='primary'/>)
const ConnectionServiceOutlinedIconComponent = () => (<DeveloperModeOutlinedIcon/>)


const SettingsOutlinedIconComponent = () => (<SettingsOutlinedIcon/>)
const SettingsFilledIconComponent = () => (<Settings color='primary'/>)

const routeList = [
    [{
        id: "Project1",
        title: "Project",
        path: "/home/project",
        exact: true,
        filledIcon: ProjectFilledIconComponent,
        outlinedIcon: ProjectOutlinedIconComponent,
        iconComponent: ProjectOutlinedIconComponent,
        mainComponent: ProjectComponent
    },
        {
            id: "Group1",
            title: "Group",
            path: "/home/group",
            exact: true,
            iconComponent: GroupOutlinedIconComponent,
            filledIcon: GroupFilledIconComponent,
            outlinedIcon: GroupOutlinedIconComponent,
            mainComponent: GroupComponent
        },
        {
            id: "Member1",
            title: "Member",
            path: "/home/member",
            exact: true,
            iconComponent: MemberFilledIconComponent,
            filledIcon: MemberFilledIconComponent,
            outlinedIcon: MemberOutlinedIconComponent,
            mainComponent: ProjectComponent
        },
    ],
    [
        {
            id: "Document2",
            title: "Document",
            path: "/home/document",
            exact: false,
            iconComponent: DocumentOutlineIconComponent,
            filledIcon: DocumentFilledIconComponent,
            outlinedIcon: DocumentOutlineIconComponent,
            mainComponent: DocumentComponent
        },
        {
            id: "Environment2",
            title: "Environment",
            path: "/home/environment",
            exact: true,
            iconComponent: EnvironmentOutlinedIconComponent,
            filledIcon: EnvironmentFilledIconComponent,
            outlinedIcon: EnvironmentOutlinedIconComponent,
            mainComponent: ProjectComponent
        },
        {
            id: "Services2",
            title: "Services",
            path: "/home/connectionServices",
            exact: true,
            iconComponent: ConnectionServiceOutlinedIconComponent,
            filledIcon: ConnectionServiceFilledIconComponent,
            outlinedIcon: ConnectionServiceOutlinedIconComponent,
            mainComponent: ProjectComponent
        },
        {
            id: "Settings2",
            title: "Settings",
            path: "/home/settings",
            exact: true,
            iconComponent: SettingsOutlinedIconComponent,
            filledIcon: SettingsFilledIconComponent,
            outlinedIcon: SettingsOutlinedIconComponent,
            mainComponent: ProjectComponent
        },
    ]
]

//var str = "js实现用{two}自符串替换占位符{two} {three}  {one} ".format({one: "I",two: "LOVE",three: "YOU"});
//var str2 = "js实现用{1}自符串替换占位符{1} {2}  {0} ".format("I","LOVE","YOU");
String.prototype.format = function () {
    if (arguments.length == 0) return this;
    var param = arguments[0];
    var s = this;
    if (typeof (param) == 'object') {
        for (var key in param)
            s = s.replace(new RegExp("\\{" + key + "\\}", "g"), param[key]);
        return s;
    } else {
        for (var i = 0; i < arguments.length; i++)
            s = s.replace(new RegExp("\\{" + i + "\\}", "g"), arguments[i]);
        return s;
    }
}

export function getRouteItemByPath(path) {
    for (let i = routeList[0].length - 1; i >= 0; i--) {
        var pattern = new RegExp(routeList[0][i].path + "(/.*)?")
        if (pattern.test(path)){
            return routeList[0][i]
        }
    }
    for (let i = routeList[1].length - 1; i >= 0; i--) {
        var pattern = new RegExp(routeList[1][i].path + "(/.*)?")
        if (pattern.test(path)){
            return routeList[1][i]
        }
    }
}

export default routeList