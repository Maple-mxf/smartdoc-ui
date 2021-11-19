import {createTheme} from '@material-ui/core/styles';
import {blue} from "@material-ui/core/colors";
import red from "@material-ui/core/colors/red";

/**
 * 全局样式
 * @type {Theme}
 */
export const GlobalCustomTheme = createTheme({
    palette: {
        primary: red
    },
    typography: {
        fontFamily: ['Roboto'],
        fontSize: 15
    }
})