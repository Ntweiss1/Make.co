import { Router, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { AuthRequest, authMiddleware } from '../middleware/auth.js';
import { OpenAI } from 'openai';

const router = Router();
const prisma = new PrismaClient();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Create product
router.post('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const { name, description, category, basePrice, images = [] } = req.body;

    if (!name || !description || !category || !basePrice) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const product = await prisma.product.create({
      data: {
        userId: req.user.userId,
        name,
        description,
        category,
        basePrice: parseFloat(basePrice),
        images,
        status: 'draft',
      },
    });

    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error('Create product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get products for user
router.get('/', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const products = await prisma.product.findMany({
      where: { userId: req.user.userId },
      orderBy: { createdAt: 'desc' },
    });

    res.json({ success: true, products });
  } catch (error) {
    console.error('Get products error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Get single product
router.get('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product || product.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({ success: true, product });
  } catch (error) {
    console.error('Get product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Generate product description with AI
router.post('/:id/generate-description', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product || product.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const { prompt } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: 'Prompt required' });
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4',
      messages: [
        {
          role: 'user',
          content: `Write a compelling product description based on this prompt: ${prompt}. Make it engaging and concise (100-200 words).`,
        },
      ],
      max_tokens: 300,
    });

    const description = completion.choices[0]?.message?.content || '';

    const updatedProduct = await prisma.product.update({
      where: { id: product.id },
      data: {
        description,
        aiGeneratedDescription: true,
        aiPrompt: prompt,
      },
    });

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Generate description error:', error);
    res.status(500).json({ error: 'Failed to generate description' });
  }
});

// Update product
router.put('/:id', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product || product.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: req.body,
    });

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Update product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Publish product
router.post('/:id/publish', authMiddleware, async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ error: 'Not authenticated' });
    }

    const product = await prisma.product.findUnique({
      where: { id: req.params.id },
    });

    if (!product || product.userId !== req.user.userId) {
      return res.status(404).json({ error: 'Product not found' });
    }

    const updatedProduct = await prisma.product.update({
      where: { id: req.params.id },
      data: { published: true, status: 'active' },
    });

    res.json({ success: true, product: updatedProduct });
  } catch (error) {
    console.error('Publish product error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
