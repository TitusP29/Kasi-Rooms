import React, { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box,
  Avatar,
  Chip,
  TablePagination,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  CheckCircle as ApproveIcon,
  Cancel as RejectIcon,
  Person as PersonIcon,
  Home as HomeIcon,
  MoreVert as MoreVertIcon
} from '@mui/icons-material';
import VerificationStatusBadge from './VerificationStatusBadge';

const AdminVerificationList = ({ verifications, onApprove, onReject, isLoading }) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApprove = (id) => {
    if (onApprove) onApprove(id);
  };

  const handleReject = (id) => {
    if (onReject) onReject(id);
  };

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  if (!verifications?.length) {
    return (
      <Box p={4} textAlign="center">
        <Typography variant="subtitle1" color="textSecondary">
          No pending verifications
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
              <TableCell>Type</TableCell>
              <TableCell>Details</TableCell>
              <TableCell>Submitted</TableCell>
              <TableCell>Status</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {verifications
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((item) => (
                <TableRow key={item.id} hover>
                  <TableCell>
                    <Box display="flex" alignItems="center">
                      {item.type === 'landlord' ? (
                        <PersonIcon color="primary" sx={{ mr: 1 }} />
                      ) : (
                        <HomeIcon color="secondary" sx={{ mr: 1 }} />
                      )}
                      <Typography variant="body2" textTransform="capitalize">
                        {item.type}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Typography variant="subtitle2">
                        {item.type === 'landlord' ? item.name : item.title}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        {item.type === 'landlord' ? item.email : `By: ${item.owner}`}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(item.submittedAt).toLocaleDateString()}
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                      {new Date(item.submittedAt).toLocaleTimeString()}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <VerificationStatusBadge status={item.status} type={item.type} />
                  </TableCell>
                  <TableCell align="right">
                    <Box display="flex" justifyContent="flex-end" gap={1}>
                      <Tooltip title="Approve">
                        <IconButton
                          size="small"
                          color="success"
                          onClick={() => handleApprove(item.id)}
                        >
                          <ApproveIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="Reject">
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleReject(item.id)}
                        >
                          <RejectIcon />
                        </IconButton>
                      </Tooltip>
                      <Tooltip title="More options">
                        <IconButton size="small">
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
        count={verifications.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </>
  );
};

export default AdminVerificationList;
