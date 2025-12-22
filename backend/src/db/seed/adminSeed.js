import 'dotenv/config';
import { eq } from 'drizzle-orm';
import bcrypt from "bcrypt";

import db  from '../../index.js';
import { adminTable } from '../schemas/adminTable.js';

const seedAdmin = async () => {
    try {
        console.log('🌱 Starting admin seed...');

        // Get admin credentials from environment variables with defaults
        const adminEmail = process.env.ADMIN_EMAIL || 'admin@gmail.com';
        const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@123';
        const adminName = process.env.ADMIN_NAME || 'System Administrator';

        // Check if admin user already exists
        const existingAdmin = await db
            .select()
            .from(adminTable)
            .where(eq(adminTable.email, adminEmail))
            .limit(1);

        if (existingAdmin.length > 0) {
            console.log('✅ Admin account already exists:', adminEmail);
            console.log('   Skipping admin creation.');
            process.exit(0);
        }

        // Hash password
        console.log('🔐 Hashing password...');
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        console.log('✅ Password hashed.');

        // Create admin user
        console.log('👤 Creating admin account...');
        const [admin] = await db
            .insert(adminTable)
            .values({
                name: adminName,
                email: adminEmail,
                password: hashedPassword,
                type: 'ADMIN',
            })
            .returning();

        console.log('✅ Admin account created successfully!');
        console.log('📋 Admin Details:');
        console.log('   Name:', admin.name);
        console.log('   Email:', admin.email);
        console.log('   Role:', admin.role);
        console.log('   ID:', admin.id);
        console.log('');
        console.log('⚠️  IMPORTANT: Change the default password after first login!');
        console.log('   Default password:', adminPassword);

        process.exit(0);
    } catch (error) {
        console.error('❌ Error seeding admin account:');
        console.error(error);
        process.exit(1);
    }
};

// Run seed
seedAdmin();