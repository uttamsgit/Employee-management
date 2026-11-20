import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
const router=Router();
router.get('/', async (_req,res,next)=>{
  try {
    const [total,active,onLeave,inactive,departments,payroll,recent]=await Promise.all([
      prisma.employee.count(),
      prisma.employee.count({where:{status:'ACTIVE'}}),
      prisma.employee.count({where:{status:'ON_LEAVE'}}),
      prisma.employee.count({where:{status:'INACTIVE'}}),
      prisma.department.findMany({include:{_count:{select:{employees:true}}},orderBy:{name:'asc'}}),
      prisma.employee.aggregate({where:{status:{not:'INACTIVE'}},_sum:{salary:true}}),
      prisma.employee.findMany({take:5,orderBy:{createdAt:'desc'},include:{department:true}})
    ]);
    res.json({total,active,onLeave,inactive,departments,payroll: Number(payroll._sum.salary||0),recent});
  } catch(e){next(e);}
});
export default router;
