import * as React from 'react';
import PropTypes from 'prop-types';
import TreeView from '@mui/lab/TreeView';
import TreeItem, {treeItemClasses, useTreeItem} from '@mui/lab/TreeItem';
import clsx from 'clsx';
import Typography from '@mui/material/Typography';
import {styled, alpha} from '@mui/material/styles';
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowRightIcon from "@mui/icons-material/ArrowRight";
import {LeftTreeWidth} from "../../main/document/tree";
import {useTheme} from "@mui/material";
import Box from "@mui/material/Box";
import FolderOpen from "@mui/icons-material/FolderOpen";
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import IconButton from "@mui/material/IconButton";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {NavLink} from "react-router-dom";
import Api from "@mui/icons-material/Api";
import Description from "@mui/icons-material/Description";

const StyledTreeItemRoot = styled(TreeItem)(({theme}) => ({
        color: theme.palette.text.primary,
        // margin: theme.spacing(1),
        // padding: theme.spacing(0.5),
        cursor: 'hand',

        [`& .${treeItemClasses.label}`]: {
            fontWeight: "inherit",
            color: `${theme.palette.primary.main}`
        },

        // 设置样式
        [`& .${treeItemClasses.content}`]: {
            color: theme.palette.text.secondary,
            paddingRight: theme.spacing(2),
            "&:hover": {
                color: theme.palette.primary.main,
                backgroundColor: theme.palette.action.hover,
            },
            "&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused": {
                backgroundColor: `${theme.palette.action.selected}`,
                color: `${theme.palette.primary.main}`,
                borderLeftStyle: 'solid',
                borderWidth: '3px'
            },
            [`& .${treeItemClasses.label}`]: {
                fontWeight: "inherit",
                color: "inherit"
            }
        },
        [`& .${treeItemClasses.group}`]:
            {
                marginLeft: 8,
                [`& .${treeItemClasses.content}`]:
                    {
                        paddingLeft: theme.spacing(2)
                    }
            }
    }))
;

const options = [
    'NewDoc',
    'Atria',
];

const CustomContent = React.forwardRef(
    function CustomContent(props, ref) {

        const {
            classes,
            className,
            label,
            nodeId,
            icon: iconProp,
            expansionIcon,
            displayIcon,
            nodeicon
        } = props;

        const {
            disabled,
            expanded,
            selected,
            focused,
            handleExpansion,
            handleSelection,
            preventSelection,
        } = useTreeItem(nodeId);

        const [displayMoreBtn, setDisplayMoreBtn] = React.useState(false)

        // 当当前节点选中时，则显示more按钮，如果未选中，则不显示more按钮
        React.useEffect(() => {
            setDisplayMoreBtn(selected);
            return () => {
                setDisplayMoreBtn(false);
            }
        }, [selected])

        const [anchorEl, setAnchorEl] = React.useState(null);
        const open = Boolean(anchorEl);
        const handleClick = (event) => {
            setAnchorEl(event.currentTarget);
            handleSelectionClick(event)
        };
        const handleClose = () => {
            setAnchorEl(null);
        };

        const theme = useTheme();

        const icon = iconProp || expansionIcon || displayIcon;

        const handleMouseDown = (event) => {
            preventSelection(event);
        };

        const handleExpansionClick = (event) => {
            handleExpansion(event);
        };

        const handleSelectionClick = (event) => {
            handleSelection(event);
        };

        return (
            <Box sx={{display: "flex", alignItems: "center", p: 0.9, pr: 100, position: 'relative'}}
                 className={clsx(classes.root, {
                     [classes.expanded]: expanded,
                     [classes.selected]: selected,
                     [classes.focused]: focused,
                     [classes.disabled]: disabled,
                 })}

                 onMouseDown={handleMouseDown}

                 ref={ref}

                 onMouseEnter={() => {
                     setDisplayMoreBtn(true)
                 }}

                 onMouseLeave={() => {
                     setDisplayMoreBtn(false)
                 }}
            >
                <div onClick={handleExpansionClick} className={classes.iconContainer}>
                    {icon}
                </div>

                <Box component={nodeicon} sx={{mr: 0.8}}/>
                <Typography
                    onClick={handleSelectionClick}
                    variant="body2"
                    sx={{fontWeight: "inherit", flexGrow: 1, color: theme.palette.text.primary}}>
                    {label}
                </Typography>

                {
                    displayMoreBtn ? (
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls="long-menu"
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            size="small"
                            onClick={handleClick}
                            sx={{position: 'absolute', right: '2%', top: '15%'}}
                        >
                            <MoreHorizIcon  fontSize="inherit"/>
                        </IconButton>
                    ) : null
                }

                <Menu
                    id="long-menu"
                    MenuListProps={{
                        'aria-labelledby': 'demo-customized-button',
                    }}
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    PaperProps={{
                        style: {
                            maxHeight: 48 * 4.5,
                            width: '20ch',
                        },
                    }}
                >
                    {options.map((option) => (
                        <MenuItem key={option} selected={option === 'Pyxis'} onClick={handleClose}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
            </Box>
        );
    });

CustomContent.propTypes = {
    /**
     * Override or extend the styles applied to the component.
     */
    classes: PropTypes.object.isRequired,
    /**
     * className applied to the root element.
     */
    className: PropTypes.string,
    /**
     * The icon to display next to the tree node's label. Either a parent or end icon.
     */
    displayIcon: PropTypes.node,
    /**
     * The icon to display next to the tree node's label. Either an expansion or collapse icon.
     */
    expansionIcon: PropTypes.node,
    /**
     * The icon to display next to the tree node's label.
     */
    icon: PropTypes.node,
    /**
     * The tree node label.
     */
    label: PropTypes.node,
    /**
     * The id of the node.
     */
    nodeId: PropTypes.string.isRequired,
};

const CustomTreeItem = (props) => (
    <StyledTreeItemRoot ContentComponent={CustomContent} ContentProps={props} {...props} />
);

export default function NavigationTableContent(props) {
    const theme = useTheme();
    const {nodes, genLinkFunc,expanded, selected,setTargetSelectNode,setDefaultExpanded} = props;
    return (
        <TreeView
            aria-label="icon expansion"

            defaultCollapseIcon={<ArrowDropDownIcon/>}
            defaultExpandIcon={<ArrowRightIcon/>}
            defaultEndIcon={<div style={{width: 24}}/>}

            expanded={expanded}
            selected={selected}

            onNodeSelect={(event, value) => {
                setTargetSelectNode(value)
            }}

            onNodeToggle={(event, nodeIds) => {
                setDefaultExpanded(nodeIds)
            }}

            sx={{
                flexGrow: 1,
                maxWidth: LeftTreeWidth - 10,
                overflowY: "auto",
                backgroundColor: theme.palette.background.paper,
                fontSize: '17px'
            }}
        >

            <RecursionTreeNodeContentComponent nodes={nodes} genLinkFunc={genLinkFunc}/>
        </TreeView>
    );
}

function RecursionTreeNodeContentComponent(props) {
    const {nodes, genLinkFunc} = props;
    return (
        <Box>
            {nodes.map((node, index) => {
                return (
                    node.type === 'RESOURCE' ?
                        <CustomTreeItem nodeId={node.id} label={node.title} nodeicon={FolderOpen} key={node.id}>
                            <RecursionTreeNodeContentComponent nodes={node.children} genLinkFunc={genLinkFunc}/>
                        </CustomTreeItem> :
                        <NavLink to={genLinkFunc(node)} key={node.id} style={{textDecoration: 'none'}} >
                            <CustomTreeItem nodeId={node.id} label={node.title}
                                            nodeicon={(node.type === 'API' ? Api : Description)}/>
                        </NavLink>
                )
            })
            }
        </Box>
    )
}