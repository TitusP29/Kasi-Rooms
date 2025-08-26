import bcrypt from 'bcryptjs';

// This script will create an admin user in localStorage
const createAdminUser = async () => {
  try {
    const email = 'admin@kasirooms.com';
    const password = 'admin123';
    const fullName = 'Admin User';
    const userType = 'admin';

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create admin user
    const adminUser = {
      id: 'admin-' + Date.now().toString(),
      email: email.toLowerCase().trim(),
      password: hashedPassword,
      fullName: fullName.trim(),
      userType,
      createdAt: new Date().toISOString(),
      status: 'active'
    };

    // Get existing users or initialize empty array
    const existingUsers = JSON.parse(localStorage.getItem('kasiRoomsUsers') || '[]');
    
    // Check if admin already exists
    const adminExists = existingUsers.some(user => user.userType === 'admin');
    
    if (!adminExists) {
      // Add new admin user
      const updatedUsers = [...existingUsers, adminUser];
      localStorage.setItem('kasiRoomsUsers', JSON.stringify(updatedUsers));
      console.log('Admin user created successfully!');
      console.log('Email: admin@kasirooms.com');
      console.log('Password: admin123');
    } else {
      console.log('An admin user already exists in the system.');
    }
  } catch (error) {
    console.error('Error creating admin user:', error);
  }
};

// Run the function
createAdminUser();
