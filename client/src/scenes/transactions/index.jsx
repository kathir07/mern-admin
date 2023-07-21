import { Box, useTheme } from '@mui/material'
import React, { useState } from 'react'
import { useGetTransactionsQuery } from 'state/api';
import Header from 'components/Header';
import { DataGrid } from '@mui/x-data-grid';
import DataGridCustomToolbar from 'components/DataGridCustomToolbar';

const Transactions = () => {
  const theme = useTheme();

  //values to be sent to the backend
  const [page, setPage] = useState(0)
  const [pageSize, setPageSize] = useState(20)
  const [sort, setSort] = useState({})
  const [search, setSearch] = useState("")

  const [searchInput, setSearchInput] = useState("")

  const {data, isLoading } = useGetTransactionsQuery({
    page,
    pageSize,
    sort: JSON.stringify(sort),
    search,
  })

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
        headerName: "Created At",
        flex: 1,
    },
    {
        field: "products",
        headerName: "# of Products",
        flex: 0.5,
        renderCell: (params) => params.value.length,
    },
    {
        field: "cost",
        headerName: "Cost",
        flex: 1,
        renderCell: (params) => `$${Number(params.value).toFixed(2)}`,
    },
]

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="Transactions" subtitle="List of Transactions" />
      <Box height="80vh"
        sx={{
          "& .MuiDataGrid-root":{
              border: "none"
          },
          "& .MuiDataGrid-cell": {
              borderBottom: "none"
          },
          "& .MuiDataGrid-columnHeaders": {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.secondary[100],
              borderBottom: "none"
          },
          "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.primary.light,
          },
          "& .MuiDataGrid-footerContainer": {
              backgroundColor: theme.palette.primary.light,
              color: theme.palette.secondary[100],
              borderTop: "none"
          }
        }}
      >
        <DataGrid 
          loading={isLoading || !data}
          getRowId={(row) => row._id}
          rows={(data && data.transactions) || []}
          columns={columns}
          rowCount={(data && data.total) || 0 }
          pagination
          page={page}
          pageSize={pageSize}
          rowsPerPageOptions={[25, 50, 100]}
          paginationMode="server"
          sortingMode="server"
          onPageChange={(newPage) => setPage(newPage)}
          onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          onSortModelChange={(newSortModel) => setSort(newSortModel)}
          slots={{ toolbar: DataGridCustomToolbar}}
          slotProps={{
            toolbar: { searchInput, setSearchInput, setSearch }
          }}
        />
      </Box>
    </Box>
  )
}

export default Transactions