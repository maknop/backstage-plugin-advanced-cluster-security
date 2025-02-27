import React, { useEffect, useState } from 'react';
import DataTable from 'react-data-table-component';
import { useTheme } from '@material-ui/core/styles';
import {
  Box,
  Chip,
  Grid,
  Typography,
} from '@material-ui/core';

export const CVEEntityDetailsComponent: React.FC<Props> = ({ data, cveDetails, entityDetails }) => {
    const [dataRows, setDataRows] = useState([]);
    const theme = useTheme();
    const isDarkMode = theme.palette.type === 'dark';

    const columns: [] = [
        { name: 'Image', selector: row => row.image, sortable: true, wrap: true, grow: 2 },
        { name: 'Component', selector: row => row.component, sortable: true, wrap: true },
        { name: 'Version', selector: row => row.version, sortable: true, wrap: true, grow: 2 },
        { name: 'CVE fixed in', selector: row => row.cveFixedIn, sortable: true, wrap: true, grow: 2 },
        { name: 'Source', selector: row => row.source, sortable: true, wrap: true },
        { name: 'Location', selector: row => row.location, sortable: true, wrap: true },
    ];

    const severityLabel = `Severity: ${data.expandedData.severity}`;
    const firstDiscoveredLabel = `First discovered: ${data.expandedData.firstDiscovered}`;
    const publishedLabel = `Published: ${data.expandedData.published}`;

    const workloadLabel = `Workload: ${data.expandedData.workload}`;
    const namespaceLabel = `Namespace: ${data.expandedData.namespace}`;
    const clusterLabel = `Cluster: ${data.expandedData.cluster}`;

    const populateRows = () => {
        const rows = []

        rows.push({
            image: data?.expandedData?.image || "N/A",
            component: data?.expandedData?.component || "N/A",
            version: data?.expandedData?.version || "N/A",
            cveFixedIn: data?.expandedData?.cveFixedIn || "N/A",
            source: data?.expandedData?.source || "N/A",
            location: data?.expandedData?.location || "N/A",
        })

        setDataRows(rows)
    }

    const CVEDetails = () => {
        return (
            <Box component="section" sx={{ p: 2 }}>
               <Typography><b>{cveDetails}</b></Typography>
                  <Grid direction="row">
                    <Chip label={severityLabel} color="error" size="small" variant="outlined" />
                    <Chip label={firstDiscoveredLabel} color="default" size="small" variant="outlined" />
                    <Chip label={publishedLabel} color="default" size="small" variant="outlined" />
                  </Grid>
                <Typography>{data.expandedData.summary}</Typography>
            </Box>
        )
    }

    const EntityDetails = () => {
        return (
            <Box component="section" sx={{ p: 2 }}>
                <Typography><b>{entityDetails}</b></Typography>
                <Grid direction="row">
                    <Chip label={workloadLabel} color="default" size="small" variant="outlined" />
                    <Chip label={namespaceLabel} color="default" size="small" variant="outlined" />
                    <Chip label={clusterLabel} color="default" size="small" variant="outlined" />
                </Grid>

                <Box component="section" border={1} borderColor="grey.500" sx={{ p: 2, marginTop: '10px' }}>
                    <DataTable
                        data={dataRows}
                        columns={columns}
                        theme={isDarkMode ? 'dark' : 'light'}
                    />
                </Box>
            </Box>
        )
    }

    useEffect(() => {
        populateRows()
        // eslint-disable-next-line
    }, []);

    return (
          <Grid direction="column" justifyContent="space-between">
            <CVEDetails />
            <EntityDetails />
          </Grid>
    );
};
