import React, { useState } from 'react'
import Header from 'components/Header'
import { Box, FormControl, InputLabel, MenuItem, Select } from '@mui/material'
import OverviewChart from 'components/OverviewChart'

const Overview = () => {
    const [view, setView] = useState("units")

  return (
    <Box m="1.5rem 2rem">
        <Header title="Sales" subtitle="Overview of general revenue and profit" />
        <Box height="75vh">
            <FormControl sx={{mt: "1rem"}}>
                <InputLabel>View</InputLabel>
                <Select value={view} label="View" onChange={(e) => setView(e.target.value)}>
                    <MenuItem value="units">Units</MenuItem>
                    <MenuItem value="sales">Sales</MenuItem>
                </Select>
            </FormControl>
            <OverviewChart view={view} />
        </Box>
    </Box>
  )
}

export default Overview