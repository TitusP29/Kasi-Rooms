import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
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
  TextField,
  Tooltip,
  Typography,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  FormControl,
  InputLabel,
  Select,
  FormHelperText
} from '@mui/material';
import {
  Add as AddIcon,
  Block as BlockIcon,
  CheckCircle as CheckCircleIcon,
  CreditCard as CreditCardIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  MoreVert as MoreVertIcon,
  Person as PersonIcon,
  Refresh as RefreshIcon,
  Search as SearchIcon,
  Visibility as VisibilityIcon
} from '@mui/icons-material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

const SubscriptionManager = ({ 
  subscriptions, 
  onUpdateSubscription,
  onCancelSubscription,
  onAddSubscription,
  onEditPlan,
  isLoading 
}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSubscription, setSelectedSubscription] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState(''); // 'add', 'edit', 'cancel', 'view'
  const [formData, setFormData] = useState({
    userId: '',
    planId: '',
    startDate: new Date(),
    endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
    status: 'active',
    paymentStatus: 'paid'
  });

  // Mock data - replace with actual data from props
  const subscriptionPlans = [
    { id: 'basic', name: 'Basic', price: 9.99, features: ['5 rooms', 'Basic support'] },
    { id: 'premium', name: 'Premium', price: 19.99, features: ['Unlimited rooms', 'Priority support'] },
    { id: 'enterprise', name: 'Enterprise', price: 49.99, features: ['Unlimited rooms', '24/7 support', 'API access'] }
  ];

  const handleMenuOpen = (event, subscription) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubscription(subscription);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSubscription(null);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(0);
  };

  const handleStatusFilterChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(0);
  };

  const handleOpenDialog = (type, subscription = null) => {
    setDialogType(type);
    if (subscription) {
      setSelectedSubscription(subscription);
      setFormData({
        userId: subscription.userId,
        planId: subscription.planId,
        startDate: new Date(subscription.startDate),
        endDate: new Date(subscription.endDate),
        status: subscription.status,
        paymentStatus: subscription.paymentStatus
      });
    } else {
      // Reset form for new subscription
      setFormData({
        userId: '',
        planId: '',
        startDate: new Date(),
        endDate: new Date(new Date().setFullYear(new Date().getFullYear() + 1)),
        status: 'active',
        paymentStatus: 'paid'
      });
    }
    setOpenDialog(true);
    handleMenuClose();
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedSubscription(null);
  };

  const handleFormChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (dialogType === 'add' && onAddSubscription) {
      onAddSubscription(formData);
    } else if ((dialogType === 'edit' || dialogType === 'view') && onUpdateSubscription && selectedSubscription) {
      onUpdateSubscription(selectedSubscription.id, formData);
    }
    handleCloseDialog();
  };

  const handleCancelSubscription = () => {
    if (onCancelSubscription && selectedSubscription) {
      onCancelSubscription(selectedSubscription.id);
    }
    handleCloseDialog();
  };

  const getStatusChip = (status) => {
    let color = 'default';
    let icon = null;
    
    switch (status) {
      case 'active':
        color = 'success';
        icon = <CheckCircleIcon fontSize="small" />;
        break;
      case 'expired':
        color = 'error';
        icon = <BlockIcon fontSize="small" />;
        break;
      case 'pending':
        color = 'warning';
        break;
      case 'cancelled':
        color = 'default';
        break;
      default:
        color = 'default';
    }
    
    return (
      <Chip
        icon={icon}
        label={status.charAt(0).toUpperCase() + status.slice(1)}
        size="small"
        color={color}
        variant="outlined"
      />
    );
  };

  const filteredSubscriptions = subscriptions
    .filter(sub => {
      const matchesSearch = 
        sub.userEmail?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.planName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        sub.id?.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
      
      return matchesSearch && matchesStatus;
    });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" p={4}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Box mb={3} display="flex" justifyContent="space-between" alignItems="center">
        <Box display="flex" gap={2} alignItems="center">
          <TextField
            size="small"
            placeholder="Search subscriptions..."
            variant="outlined"
            value={searchTerm}
            onChange={handleSearch}
            InputProps={{
              startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />,
            }}
          />
          <FormControl variant="outlined" size="small" sx={{ minWidth: 200 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={handleStatusFilterChange}
              label="Status"
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="active">Active</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="expired">Expired</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
        <Button
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog('add')}
        >
          Add Subscription
        </Button>
      </Box>

      <TableContainer component={Paper} elevation={0} variant="outlined">
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Plan</TableCell>
              <TableCell>Period</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Payment</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredSubscriptions.length > 0 ? (
              filteredSubscriptions
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((sub) => (
                  <TableRow key={sub.id} hover>
                    <TableCell>
                      <Box display="flex" alignItems="center" gap={1}>
                        <PersonIcon color="action" />
                        <Box>
                          <Typography variant="subtitle2">
                            {sub.userName || 'N/A'}
                          </Typography>
                          <Typography variant="body2" color="textSecondary">
                            {sub.userEmail || 'N/A'}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Typography variant="subtitle2">
                        {sub.planName || 'N/A'}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        ${sub.planPrice}/mo
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography variant="body2">
                        {new Date(sub.startDate).toLocaleDateString()} -{' '}
                        {new Date(sub.endDate).toLocaleDateString()}
                      </Typography>
                      <Typography variant="caption" color="textSecondary">
                        {Math.ceil(
                          (new Date(sub.endDate) - new Date()) / (1000 * 60 * 60 * 24)
                        )} days remaining
                      </Typography>
                    </TableCell>
                    <TableCell>
                      {getStatusChip(sub.status)}
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={sub.paymentStatus?.charAt(0).toUpperCase() + sub.paymentStatus?.slice(1) || 'N/A'}
                        size="small"
                        color={
                          sub.paymentStatus === 'paid' ? 'success' : 
                          sub.paymentStatus === 'pending' ? 'warning' : 'default'
                        }
                        variant="outlined"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <Box display="flex" justifyContent="flex-end" gap={1}>
                        <Tooltip title="View details">
                          <IconButton
                            size="small"
                            onClick={() => handleOpenDialog('view', sub)}
                          >
                            <VisibilityIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                        <Tooltip title="More actions">
                          <IconButton
                            size="small"
                            onClick={(e) => handleMenuOpen(e, sub)}
                          >
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Tooltip>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} align="center" sx={{ py: 4 }}>
                  <CreditCardIcon color="disabled" sx={{ fontSize: 48, mb: 1 }} />
                  <Typography variant="subtitle1" color="textSecondary">
                    No subscriptions found
                  </Typography>
                  <Typography variant="body2" color="textSecondary" sx={{ mt: 1 }}>
                    Try adjusting your search or filter criteria
                  </Typography>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>

      {filteredSubscriptions.length > 0 && (
        <TablePagination
          rowsPerPageOptions={[5, 10, 25]}
          component="div"
          count={filteredSubscriptions.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      )}

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={() => handleOpenDialog('view', selectedSubscription)}>
          <VisibilityIcon fontSize="small" sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleOpenDialog('edit', selectedSubscription)}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit Subscription
        </MenuItem>
        <Divider />
        <MenuItem 
          onClick={() => handleOpenDialog('cancel', selectedSubscription)}
          sx={{ color: 'error.main' }}
        >
          <BlockIcon fontSize="small" sx={{ mr: 1 }} />
          Cancel Subscription
        </MenuItem>
      </Menu>

      {/* Subscription Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogType === 'add' && 'Add New Subscription'}
          {dialogType === 'edit' && 'Edit Subscription'}
          {dialogType === 'view' && 'Subscription Details'}
          {dialogType === 'cancel' && 'Cancel Subscription'}
        </DialogTitle>
        
        {dialogType !== 'cancel' ? (
          <>
            <DialogContent>
              <LocalizationProvider dateAdapter={AdapterDateFns}>
                <Grid container spacing={2} sx={{ mt: 1 }}>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label="User Email"
                      value={formData.userEmail || ''}
                      onChange={(e) => handleFormChange('userEmail', e.target.value)}
                      disabled={dialogType === 'view'}
                      margin="normal"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Plan</InputLabel>
                      <Select
                        value={formData.planId || ''}
                        onChange={(e) => handleFormChange('planId', e.target.value)}
                        label="Plan"
                        disabled={dialogType === 'view'}
                      >
                        {subscriptionPlans.map((plan) => (
                          <MenuItem key={plan.id} value={plan.id}>
                            {plan.name} (${plan.price}/mo)
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="Start Date"
                      value={formData.startDate}
                      onChange={(date) => handleFormChange('startDate', date)}
                      disabled={dialogType === 'view'}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth margin="normal" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <DatePicker
                      label="End Date"
                      value={formData.endDate}
                      onChange={(date) => handleFormChange('endDate', date)}
                      disabled={dialogType === 'view'}
                      renderInput={(params) => (
                        <TextField {...params} fullWidth margin="normal" />
                      )}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Status</InputLabel>
                      <Select
                        value={formData.status || 'active'}
                        onChange={(e) => handleFormChange('status', e.target.value)}
                        label="Status"
                        disabled={dialogType === 'view'}
                      >
                        <MenuItem value="active">Active</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="expired">Expired</MenuItem>
                        <MenuItem value="cancelled">Cancelled</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControl fullWidth margin="normal">
                      <InputLabel>Payment Status</InputLabel>
                      <Select
                        value={formData.paymentStatus || 'paid'}
                        onChange={(e) => handleFormChange('paymentStatus', e.target.value)}
                        label="Payment Status"
                        disabled={dialogType === 'view'}
                      >
                        <MenuItem value="paid">Paid</MenuItem>
                        <MenuItem value="pending">Pending</MenuItem>
                        <MenuItem value="failed">Failed</MenuItem>
                        <MenuItem value="refunded">Refunded</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDialog} color="inherit">
                Cancel
              </Button>
              {dialogType !== 'view' && (
                <Button 
                  onClick={handleSubmit} 
                  variant="contained" 
                  color="primary"
                >
                  {dialogType === 'add' ? 'Create Subscription' : 'Save Changes'}
                </Button>
              )}
            </DialogActions>
          </>
        ) : (
          <>
            <DialogContent>
              <DialogContentText>
                Are you sure you want to cancel this subscription? This action cannot be undone.
              </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDialog} color="inherit">
                No, Keep It
              </Button>
              <Button 
                onClick={handleCancelSubscription} 
                variant="contained" 
                color="error"
              >
                Yes, Cancel Subscription
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </>
  );
};

export default SubscriptionManager;
