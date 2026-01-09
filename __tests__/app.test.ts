import request from 'supertest';
import app from '../src/app';

/**
 * Tests de base pour l'API
 * Ces tests vérifient que les routes principales fonctionnent correctement
 */
describe('API Routes', () => {
  // Test de la route racine
  it('should return welcome message', async () => {
    const res = await request(app).get('/');
    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('message');
  });

  // Test d'une route inexistante (404)
  it('should return 404 for unknown route', async () => {
    const res = await request(app).get('/unknown-route');
    expect(res.statusCode).toEqual(404);
    expect(res.body).toHaveProperty('error');
  });
});

