import 'dotenv/config';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@employeecenter.local';
  const password = process.env.ADMIN_PASSWORD || 'Admin@12345';
  await prisma.user.upsert({
    where: { email },
    update: {},
    create: { email, passwordHash: await bcrypt.hash(password, 12), role: 'ADMIN' }
  });

  const names = [
    ['Engineering', 'Product engineering and platform'],
    ['Human Resources', 'People operations and talent'],
    ['Finance', 'Financial planning and accounting'],
    ['Sales', 'Customer growth and partnerships'],
    ['Operations', 'Business operations']
  ];
  for (const [name, description] of names) {
    await prisma.department.upsert({ where: { name }, update: {}, create: { name, description } });
  }

  const departments = await prisma.department.findMany();
  const samples = [
    ['EC-1001','Aarav','Sharma','aarav.sharma@example.com','Senior Software Engineer','Engineering',125000,'2022-03-14','ACTIVE'],
    ['EC-1002','Ananya','Patel','ananya.patel@example.com','HR Business Partner','Human Resources',92000,'2023-01-09','ACTIVE'],
    ['EC-1003','Rohan','Mehta','rohan.mehta@example.com','Finance Analyst','Finance',78000,'2024-06-17','ACTIVE'],
    ['EC-1004','Diya','Verma','diya.verma@example.com','Sales Executive','Sales',68000,'2025-02-03','ON_LEAVE'],
    ['EC-1005','Kabir','Singh','kabir.singh@example.com','Operations Lead','Operations',105000,'2021-11-22','ACTIVE']
  ];
  for (const s of samples) {
    const dept = departments.find(d => d.name === s[5]);
    await prisma.employee.upsert({
      where: { employeeCode: s[0] },
      update: {},
      create: {
        employeeCode:s[0], firstName:s[1], lastName:s[2], email:s[3], jobTitle:s[4],
        departmentId:dept.id, salary:s[6], joiningDate:new Date(s[7]), status:s[8],
        employmentType:'Full-time', location:'Indore'
      }
    });
  }
}
main().catch(e => { console.error(e); process.exit(1); }).finally(() => prisma.$disconnect());
