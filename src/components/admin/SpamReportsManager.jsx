import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  CircularProgress
} from '@mui/material';
import {
  Block as BlockIcon,
  Check as CheckIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  Report as ReportIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  Warning as WarningIcon,
  Flag as FlagIcon
} from '@mui/icons-material';
import VerificationStatusBadge from './VerificationStatusBadge';

const SpamReportsManager = ({ reports, onResolve, onDelete, isLoading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);

  const handleMenuOpen = (event, report) => {
    setAnchorEl(event.currentTarget);
    setSelectedReport(report);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedReport(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleResolve = (reportId, action) => {
    if (onResolve) onResolve(reportId, action);
    handleMenuClose();
  };

  const handleDelete = (reportId) => {
    if (onDelete) onDelete(reportId);
    handleMenuClose();
  };

  const getReportTypeIcon = (type) => {
    switch (type) {
      case 'landlord':
        return <PersonIcon color="primary" fontSize="small" />;
      case 'room':
        return <HomeIcon color="secondary" fontSize="small" />;
      default:
        return <WarningIcon color="warning" fontSize="small" />;
    }
  };

  const getSeverityChip = (severity) => {
    let color = 'default';
    let icon = <FlagIcon fontSize="small" />;
    
    switch (severity) {
      case 'high':
        color = 'error';
        icon = <WarningIcon fontSize="small" />;
        break;
      case 'medium':
        color = 'warning';
        break;
      case 'low':
      default:
        color = 'info';
    }
    
    return (
      <Chip
        icon={icon}
        label={severity.toUpperCase()}
        size="small"
        color={color}
        variant="outlined"
      />
    );
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!reports?.length) {
    return (
      <Box p={4} textAlign="center">
        <FlagIcon color="disabled" sx={{ fontSize: 48, mb: 2 }} />
        <Typography variant="h6" color="textSecondary" gutterBottom>
          No spam reports
        </Typography>
        <Typography variant="body2" color="textSecondary">
          All clear! No spam reports to review at the moment.
        </Typography>
      </Box>
    );
  }

  return (
    <>
      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Report Details</TableCell>
              <TableCell>Type</TableCell>
              <TableCell>Severity</TableCell>
              <TableCell>Reported By</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {reports
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((report) => (
                <TableRow key={report.id} hover>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">
                        {report.type === 'landlord' 
                          ? report.landlordName 
                          : report.roomTitle}
                      </Typography>
                      <Typography variant="body2" color="textSecondary" noWrap>
                        {report.reason}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box display="flex" alignItems="center" gap={1}>
                      {getReportTypeIcon(report.type)}
                      <Typography variant="body2" textTransform="capitalize">
                        {report.type}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    {getSeverityChip(report.severity || 'medium')}
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {report.reportedByEmail}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(report.reportedAt).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Chip
                      label={report.status || 'Pending'}
                      size="small"
                      color={
                        report.status === 'resolved' 
                          ? 'success' 
                          : report.status === 'ignored'
                          ? 'default'
                          : 'warning'
                      }
                      variant="outlined"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                      <Tooltip title="Mark as resolved">
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleResolve(report.id, 'resolved')}
                        >
                          <CheckIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More actions">
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, report)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Tooltip>
                    </Box>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>
      
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={reports.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      
      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem 
          onClick={() => handleResolve(selectedReport?.id, 'resolved')}
        >
          <CheckIcon color="success" sx={{ mr: 1 }} />
          Mark as Resolved
        </MenuItem>
        <MenuItem 
          onClick={() => handleResolve(selectedReport?.id, 'ignored')}
        >
          <BlockIcon color="disabled" sx={{ mr: 1 }} />
          Ignore Report
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => handleDelete(selectedReport?.id)}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon sx={{ mr: 1 }} />
          Delete Report
        </MenuItem>
      </Menu>
    </>
  );
};

export default SpamReportsManager;
