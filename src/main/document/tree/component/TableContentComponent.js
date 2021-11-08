import * as React from "react";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView from "@mui/lab/TreeView";
import TreeItem, {treeItemClasses} from "@mui/lab/TreeItem";
import Typography from "@mui/material/Typography";
import Description from "@mui/icons-material/Description";
import Api from "@mui/icons-material/Api";
import FolderOpen from "@mui/icons-material/FolderOpen";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {NAV_TREE_REDUCER_NAMESPACE} from "../../../../util/constants";
import {getNavTreeAction, getNavTreeNodeList} from "../store/actionCreators";
import {parseResponseMsg} from "../../../../util/http";
import {LeftTreeWidth} from "../index";
import {useTheme} from "@mui/material";
import HomeIcon from '@mui/icons-material/Home';
import {NavLink, useLocation} from "react-router-dom";

const StyledTreeItemRoot = styled(TreeItem)(({theme}) => ({
    color: theme.palette.text.primary,

    // 设置样式
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        paddingRight: theme.spacing(2),
        "&:hover": {
            color: theme.palette.primary.main,
            backgroundColor: theme.palette.action.hover,
            transform: `scale(1.01)`
        },
        "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
            backgroundColor: `${theme.palette.action.selected}`,
            color: "var(--tree-view-color)",
            borderLeftStyle: 'solid',
            borderWidth: '5px'
        },
        [`& .${treeItemClasses.label}`]: {
            fontWeight: "inherit",
            color: "inherit"
        }
    },
    [`& .${treeItemClasses.group}`]: {
        marginLeft: 10,
        [`& .${treeItemClasses.content}`]: {
            paddingLeft: theme.spacing(2)
        }
    },
}));


function StyledTreeItem(props) {
    const {
        bgColor,
        color,
        id,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{display: "flex", alignItems: "center", p: 0.8, pr: 10}}>
                    <Box component={LabelIcon} sx={{mr: 1}}/>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: "inherit", flexGrow: 1}}
                    >
                        {id === 'root' ? 'Workspace' : labelText}
                    </Typography>
                </Box>
            }
            style={{
                "--tree-view-color": "#1a73e8",
                "--tree-view-bg-color": "#e8f0fe"
            }}
            {...other}
        />
    );
}

StyledTreeItem.propTypes = {
    bgColor: PropTypes.string,
    color: PropTypes.string,
    id: PropTypes.string,
    labelIcon: PropTypes.elementType.isRequired,
    labelText: PropTypes.string.isRequired
};


function TableContentTreeComponent(props) {
    const {nodes} = props;
    return (
        <div>
            {
                nodes.map((node, index) => {
                        let path = `/home/document?id=${node.id}`
                        return (
                            node.type === 'RESOURCE' ?
                                <StyledTreeItem
                                    key={node.id}
                                    nodeId={node.id}
                                    id={node.id}
                                    labelIcon={node.id === 'root' ? HomeIcon : FolderOpen}
                                    labelText={node.title}
                                    color="#1a73e8"
                                    bgColor="#e8f0fe"
                                >
                                    <TableContentTreeComponent
                                        key={index}
                                        nodes={node.children}
                                    />
                                </StyledTreeItem>
                                :
                                <NavLink to={path} key={node.id} style={{textDecoration: 'none'}}>
                                    <StyledTreeItem
                                        key={node.id}
                                        nodeId={node.id}
                                        id={node.id}
                                        labelIcon={(node.type === 'API' ? Api : Description)}
                                        labelText={node.title}
                                        color="#1a73e8"
                                        bgColor="#e8f0fe"
                                    />
                                </NavLink>
                        )
                    }
                )
            }
        </div>
    )
}

// A custom hook that builds on useLocation to parse
// the query string for you.
function useQuery() {
    const {search} = useLocation();
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function TableContentTreeViewComponent(props) {
    const dispatch = useDispatch();
    const theme = useTheme();

    let query = useQuery();

    let selectedDocId = query.get("id");

    useEffect(() => {
        FetchNodeList("802736426121695232", dispatch)
        return () => {
        }
    }, [])
    const {nodes} = useSelector(state => state[NAV_TREE_REDUCER_NAMESPACE]);

    return (
        <TreeView
            aria-label="gmail"
            defaultExpanded={["root"]}
            defaultCollapseIcon={<ArrowDropDownIcon/>}
            defaultExpandIcon={<ArrowRightIcon/>}
            defaultEndIcon={<div style={{width: 24}}/>}
            selected={selectedDocId}
            sx={{
                height: 700,
                flexGrow: 1,
                maxWidth: LeftTreeWidth,
                overflowY: "auto",
                backgroundColor: theme.palette.background.paper,
            }}
        >
            <TableContentTreeComponent nodes={nodes}/>
        </TreeView>

    );
}

const FetchNodeList = (projectId, dispatch) => {
    getNavTreeNodeList(projectId)
        .then(
            res => {
                let {succ, errorMsg, data} = parseResponseMsg(res)
                dispatch(getNavTreeAction(data))
            },
            err => {
                console.info(err)
            }
        )
}