import * as React from "react";
import PropTypes from "prop-types";
import {styled} from "@mui/material/styles";
import Box from "@mui/material/Box";
import TreeView, {treeViewClasses} from "@mui/lab/TreeView";
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



// [`& .${treeItemClasses.content}`]:
const StyledTreeItemRoot = styled(TreeItem)(({theme}) => ({
    color: theme.palette.text.primary,
    [`& .${treeItemClasses.content}`]: {
        color: theme.palette.text.secondary,
        borderTopRightRadius: theme.spacing(2),
        borderBottomRightRadius: theme.spacing(2),
        paddingRight: theme.spacing(2),
        fontWeight: theme.typography.fontWeightMedium,
        "&.Mui-expanded": {
            fontWeight: theme.typography.fontWeightRegular
        },
        "&:hover": {
            backgroundColor: theme.palette.primary.main
        },
        "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
            backgroundColor: `var(--tree-view-bg-color, ${theme.palette.action.selected})`,
            color: "var(--tree-view-color)"
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
    }
}));


function StyledTreeItem(props) {
    const {
        bgColor,
        color,
        labelIcon: LabelIcon,
        labelInfo,
        labelText,
        ...other
    } = props;

    return (
        <StyledTreeItemRoot
            label={
                <Box sx={{display: "flex", alignItems: "center", p: 0.8, pr: 10}}>
                    <Box component={LabelIcon} color="inherit" sx={{mr: 1}}/>
                    <Typography
                        variant="body2"
                        sx={{fontWeight: "inherit", flexGrow: 1}}
                    >
                        {labelText}
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
    labelIcon: PropTypes.elementType.isRequired,
    labelText: PropTypes.string.isRequired
};

function TableContentTreeComponent(props) {
    const {nodes} = props;
    return (
        <div>
            {
                nodes.map((node, index) =>
                    <StyledTreeItem
                        key={node.id}
                        nodeId={node.id}
                        labelIcon={node.type === 'RESOURCE' ? FolderOpen : (node.type === 'API' ? Api : Description)}
                        labelText={node.title}
                        color="#1a73e8"
                        bgColor="#e8f0fe"
                    >
                        {
                            node.type === 'RESOURCE' ? <TableContentTreeComponent
                                key={index}
                                nodes={node.children}
                            /> : null
                        }
                    </StyledTreeItem>
                )
            }
        </div>
    )
}

export default function TableContentTreeViewComponent() {
    const dispatch = useDispatch();

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
            sx={{
                height: 700,
                flexGrow: 1,
                maxWidth: 450,
                overflowY: "auto",
                backgroundColor: "#fff3e0"
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