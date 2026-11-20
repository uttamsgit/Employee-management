import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
const router = Router();
const employeeSchema = z.object({
  employeeCode:z.string().trim().min(2).max(24),
  firstName:z.string().trim().min(1).max(60),
  lastName:z.string().trim().min(1).max(60),
  email:z.string().email().transform(v=>v.toLowerCase()),
  phone:z.string().max(30).optional().nullable(),
  jobTitle:z.string().trim().min(2).max(100),
  departmentId:z.string().min(1),
  salary:z.coerce.number().min(0).max(100000000),
  joiningDate:z.string().min(1),
  leavingDate:z.string().optional().nullable(),
  status:z.enum(['ACTIVE','ON_LEAVE','INACTIVE']).default('ACTIVE'),
  employmentType:z.string().max(40).default('Full-time'),
  location:z.string().max(100).optional().nullable(),
  manager:z.string().max(120).optional().nullable(),
  notes:z.string().max(1000).optional().nullable()
});
const toData = d => ({...d, joiningDate:new Date(d.joiningDate), leavingDate:d.leavingDate ? new Date(d.leavingDate) : null});

router.get('/', async (req,res,next) => {
  try {
    const search=String(req.query.search||'').trim();
    const status=String(req.query.status||'');
    const where={
      ...(status && ['ACTIVE','ON_LEAVE','INACTIVE'].includes(status) ? {status} : {}),
      ...(search ? {OR:[
        {firstName:{contains:search,mode:'insensitive'}},{lastName:{contains:search,mode:'insensitive'}},
        {email:{contains:search,mode:'insensitive'}},{employeeCode:{contains:search,mode:'insensitive'}},
        {jobTitle:{contains:search,mode:'insensitive'}}
      ]} : {})
    };
    const employees=await prisma.employee.findMany({where,include:{department:true},orderBy:{createdAt:'desc'}});
    res.json(employees);
  } catch(e){next(e);}
});
router.post('/', async (req,res,next) => {
  try {
    const data=toData(employeeSchema.parse(req.body));
    const employee=await prisma.employee.create({data,include:{department:true}});
    res.status(201).json(employee);
  } catch(e){next(e);}
});
router.get('/:id', async (req,res,next) => {
  try {
    const employee=await prisma.employee.findUnique({where:{id:req.params.id},include:{department:true}});
    if(!employee) return res.status(404).json({message:'Employee not found'});
    res.json(employee);
  } catch(e){next(e);}
});
router.put('/:id', async (req,res,next) => {
  try {
    const data=toData(employeeSchema.parse(req.body));
    res.json(await prisma.employee.update({where:{id:req.params.id},data,include:{department:true}}));
  } catch(e){next(e);}
});
router.delete('/:id', async (req,res,next) => {
  try {
    const employee=await prisma.employee.update({where:{id:req.params.id},data:{status:'INACTIVE',leavingDate:new Date()},include:{department:true}});
    res.json({message:'Employee archived',employee});
  } catch(e){next(e);}
});
router.delete('/:id/permanent', async (req,res,next) => {
  try { await prisma.employee.delete({where:{id:req.params.id}}); res.json({message:'Employee permanently deleted'}); } catch(e){next(e);}
});
export default router;
