import {styled} from '@mui/material/styles';
import Pagination from "@mui/material/Pagination";

export const MainPagination = styled(Pagination)(({theme}) => ({
    color: theme.palette.primary.light,
    '&:hover': {
    },
}));