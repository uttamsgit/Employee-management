import { Router } from 'express';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';
const router = Router();
const schema = z.object({ name:z.string().trim().min(2).max(80), description:z.string().max(240).optional().nullable() });

router.get('/', async (_req,res,next) => {
  try { res.json(await prisma.department.findMany({ include:{ _count:{ select:{ employees:true } } }, orderBy:{ name:'asc' } })); } catch(e){next(e);}
});
router.post('/', async (req,res,next) => {
  try {
    const data = schema.parse(req.body);
    const item = await prisma.department.create({ data });
    res.status(201).json(item);
  } catch(e){next(e);}
});
router.put('/:id', async (req,res,next) => {
  try { const data=schema.parse(req.body); res.json(await prisma.department.update({ where:{id:req.params.id}, data })); } catch(e){next(e);}
});
router.delete('/:id', async (req,res,next) => {
  try {
    const count=await prisma.employee.count({where:{departmentId:req.params.id}});
    if(count) return res.status(409).json({message:'Move employees to another department before deleting this department.'});
    await prisma.department.delete({where:{id:req.params.id}});
    res.json({message:'Department deleted'});
  } catch(e){next(e);}
});
export default router;
