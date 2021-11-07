import {styled} from '@mui/material/styles';
import Button from '@mui/material/Button';

// 自定义Button样式（正常按钮风格）
export const MainButton = styled(Button)(({theme}) => ({
    backgroundColor: theme.palette.primary.main,
    '&:hover': {
        backgroundColor: theme.palette.primary.dark,
        transform: `scale(1.03)`
    },
}));