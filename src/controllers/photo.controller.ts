import path from 'path';
import fs from 'fs-extra';
import { Request, Response } from 'express';

import Photo from '../models/Photo';

export async function index(req: Request, res: Response): Promise<Response> {
    const photos = await Photo.find();
    return res.json(photos);
}

export async function show(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const photo = await Photo.findById(id);

    return res.json(photo);
}

export async function save(req: Request, res: Response): Promise<Response> {
    const { title, description } = req.body;

    const newPhoto = {
        title,
        description,
        imagePath: req.file?.path,
    };

    const photo = new Photo(newPhoto);

    await photo.save();

    return res.send({
        photo,
    });
}

export async function destroy(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;

    const photo = await Photo.findByIdAndDelete(id);
    if (photo) {
        await fs.unlink(path.resolve(photo.imagePath));
    }

    return res.status(204).json('');
}

export async function update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { title, description } = req.body;

    const photo = await Photo.findByIdAndUpdate(
        id,
        { title, description },
        { new: true }
    );

    return res.json(photo);
}
