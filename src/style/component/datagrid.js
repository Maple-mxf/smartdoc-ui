import * as React from "react";
import {DataGrid} from "@mui/x-data-grid";

// 参考initialState属性 https://mui.com/zh/api/data-grid/data-grid/
// 参考loading属性
export default function MainDataGrid(props) {
    const {rows, columns} = props;

    return (
        <DataGrid rows={rows}
                  editMode='row'
                  columns={columns}
                  // autoHeight
                  headerHeight={45}
                  disableColumnMenu
                  showCellRightBorder
                  hideFooter
                  hideFooterRowCount
                  hideFooterPagination
        />
    )
}