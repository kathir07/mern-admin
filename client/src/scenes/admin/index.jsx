import React from 'react'
import { useGetAdminsQuery } from 'state/api'
import { DataGrid } from '@mui/x-data-grid'
import Header from 'components/Header'
import { useTheme, Box, useMediaQuery } from '@mui/material'
import CustomColumnMenu from 'components/DataGridCustomColumnMenu'

const Admins = () => {
    const theme = useTheme();
    const { data, isLoading } = useGetAdminsQuery();

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 1,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Email",
            flex: 1,
        },
        {
            field: "mobileNumber",
            headerName: "Mobile",
            flex: 0.5,
        },
        {
            field: "country",
            headerName: "Country",
            flex: 1,
        },
        {
            field: "role",
            headerName: "Role",
            flex: 0.5,
        },
    ]

  return (
    <Box m="1.5rem 2rem">
    <Header title="Admin" subtitle="List of admin users" />
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
                rows={data || []}
                columns={columns}
                slots={{
                    ColumnMenu: CustomColumnMenu,
                }}
            />
        </Box>
    </Box>
  )
}

export default Admins