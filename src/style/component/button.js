import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';
import {Delete} from "@mui/icons-material";
import AddCircleIcon from '@mui/icons-material/AddCircle';

// 自定义Button样式（正常按钮风格）
export const MainButton = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: `scale(1.03)`
    },
}));

// Mini Icon 删除按钮
export const MiniIconDeleteButton = styled(Delete)(({theme}) => ({
    '&:hover': {
        cursor: 'pointer',
        transform: `scale(1.3)`
    },
    '&.MuiIcon-colorPrimary': theme.palette.warning.light
}));

// Mini Icon 删除按钮
export const MiniIconCreateButton = styled(AddCircleIcon)(({theme}) => ({
    '&:hover': {
        cursor: 'pointer',
        transform: `scale(1.3)`
    },
    '&.MuiIcon-colorPrimary': theme.palette.primary.light
}));