import * as React from "react";
import {DataGrid} from "@mui/x-data-grid";
import {getHeaderSchema} from "../../main/document/schema";

export default function MainDataGrid(props) {
    const {rows} = props;

    const columns1 = getHeaderSchema(true,()=>{},()=>{})
    return (
        // 参考initialState属性 https://mui.com/zh/api/data-grid/data-grid/
        // 参考loading属性
        <DataGrid rows={rows}
                  editMode='row'
                  columns={columns1}
                  headerHeight={65}

                  disableColumnMenu
                  showCellRightBorder
            // 隐藏部分属性
                  hideFooter
                  hideFooterRowCount
                  hideFooterPagination

        />
    )
}