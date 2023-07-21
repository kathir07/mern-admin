import React from 'react'
import { useGetUserPerformenceQuery } from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import { useTheme, Box, useMediaQuery } from '@mui/material'
import CustomColumnMenu from 'components/DataGridCustomColumnMenu'
import { useSelector } from 'react-redux'

const Performence = () => {
    const theme = useTheme();
    const userId = useSelector((state) => state.global.userId)
    const { data, isLoading } = useGetUserPerformenceQuery(userId);

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "userId",
            headerName: "User ID",
            flex: 1,
        },
        {
            field: "createdAt",
            headerName: "CreatedAt",
            flex: 1,
        },
       
        {
            field: "products",
            headerName: "# of Products",
            flex: 0.5,
            sortable: false,
            renderCell: (params) => params.value.length
        },
        {
            field: "cost",
            headerName: "Cost",
            flex: 1,
            renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
        },
    ]

  return (
    <Box m="1.5rem 2rem">
    <Header title="Performence" subtitle="Track your affilicate sales performence here" />
        <Box
            mt="40px"
            height="75vph"
            sx={{
                // "& .MuiDataGrid-root":{
                //     border: "none"
                // },
                // "& .MuiDataGrid-cell": {
                //     borderBottom: "none"
                // },
                "& .MuiDataGrid-columnHeaders": {
                    backgroundColor: theme.palette.primary.light,
                    // color: theme.palette.secondary[100],
                    // borderBottom: "none"
                },
                // "& .MuiDataGrid-virtualScroller": {
                //     backgroundColor: theme.palette.primary.light,
                // },
                "& .MuiDataGrid-footerContainer": {
                    backgroundColor: theme.palette.primary.light,
                    // color: theme.palette.secondary[100],
                    // borderTop: "none"
                }
            }}
        >
            <DataGrid
                loading={isLoading || !data}
                getRowId={(row) => row._id}
                rows={(data && data.sales) || []}
                columns={columns}
                slots={{
                    ColumnMenu: CustomColumnMenu,
                }}
            />
        </Box>
    </Box>
  )
}

export default Performence