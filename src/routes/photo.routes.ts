import { Router } from 'express';
import passport from 'passport';

import multer from '../libs/multer';

import {
    save,
    index,
    show,
    update,
    destroy,
} from '../controllers/photo.controller';

const router = Router();

/**
 * @swagger
 * components:
 *      schemas:
 *          Photo:
 *              type: object
 *              properties:
 *                  id:
 *                      type: string
 *                      description: The unique identifier
 *                  title:
 *                      type: string
 *                      description: Image title
 *                  description:
 *                      type: string
 *                      description: Image description
 *                  imagePath:
 *                      type: string
 *                      description: Image path
 *              required:
 *                  - title
 *                  - description
 *              example:
 *                  title: Lorem
 *                  description: Ipsum doll
 *          TaskNotFound:
 *              type: object
 *              properties:
 *                  msg:
 *                      type: string
 *                      description: A simple message
 *              example:
 *                  msg: Task not found
 *
 *      parameters:
 *          photoId:
 *              in: path
 *              name: id
 *              required: true
 *              schema:
 *                  type: string
 *              description: The photo id
 */

/**
 * @swagger
 * tags:
 *      name: Photos
 *      description: Photos endpoint
 */

/**
 * @swagger
 * /photos:
 *  get:
 *      summary: Get the list of photos
 *      tags: [Photos]
 *      responses:
 *          201:
 *              description: Return a list of photos
 *              content:
 *                  application/json
 *              schema:
 *                  type: array
 *                  items:
 *                      $ref: '#/components/schemas/Photo'
 */

/**
 * @swagger
 * /photos:
 *  post:
 *      summary: Create a new photo
 *      tags: [Photos]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Photo'
 *      responses:
 *          201:
 *              description: Return the photo just created
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Photo'
 *          400:
 *              description: Invalid request
 */

router
    .route('/photos')
    .get(passport.authenticate('jwt', { session: false }), index)
    .post(multer.single('image'), save);

/**
 * @swagger
 * /photos/{id}:
 *  get:
 *      summary: Get a photo
 *      tags: [Photos]
 *      parameters:
 *          - $ref: '#components/parameters/photoId'
 *      responses:
 *          200:
 *              description: Return a specific photo
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Photo'
 *          404:
 *              description: The photo does not exists
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskNotFound'
 */

/**
 * @swagger
 * /photos/{id}:
 *  delete:
 *      summary: Delete a phot with hes id
 *      tags: [Photos]
 *      parameters:
 *          $ref: '#/component/parameters/photoId'
 *      responses:
 *          204:
 *              description: The task was deleted successfully
 *          404:
 *              description: The task was not found
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/TaskNotFound'
 */
router.route('/photos/:id').get(show).put(update).delete(destroy);

export default router;
