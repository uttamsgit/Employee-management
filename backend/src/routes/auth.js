import { Router } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { z } from 'zod';
import { prisma } from '../lib/prisma.js';

const router = Router();
router.post('/login', async (req, res, next) => {
  try {
    const parsed = z.object({ email:z.string().email(), password:z.string().min(1) }).safeParse(req.body);
    if (!parsed.success) return res.status(400).json({ message:'Enter a valid email and password' });
    const user = await prisma.user.findUnique({ where:{ email:parsed.data.email.toLowerCase() } });
    if (!user || !(await bcrypt.compare(parsed.data.password, user.passwordHash))) {
      return res.status(401).json({ message:'Incorrect email or password' });
    }
    const token = jwt.sign({ sub:user.id, email:user.email, role:user.role }, process.env.JWT_SECRET || 'development-only-secret', { expiresIn:'8h' });
    res.json({ token, user:{ id:user.id, email:user.email, role:user.role } });
  } catch (e) { next(e); }
});
export default router;
