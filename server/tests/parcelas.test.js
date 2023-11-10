const app = require('../app')
const supertest = require('supertest')
const api = supertest(app)

const { SQLParcelaModel } = require('../models/psql/parcela.model')
const { SQLTerrainModel } = require('../models/psql/terrain.model')
let newTerrain;
beforeEach(async () => {
    await SQLParcelaModel.clearParcelas();
    await SQLTerrainModel.clearTerrains();
    newTerrain = await SQLTerrainModel.addTerrain({ ubicacion: "Madrid", hectareas: 100, limites: [[10, 10], [10, 10], [10, 10], [10, 10]] })
    await SQLParcelaModel.addParcela({ terreno_id: newTerrain.id, ubicacion: "Móstoles", hectareas: 10, limites: [[1, 1], [1, 1], [1, 1], [1, 1]] });
})
describe('Registrar Parcelas', () => {
    test('Registro de Parcela', async () => {
        const response = await api.post('/parcelas').send({ terreno_id: newTerrain.id, ubicacion: "Navalcarnero", hectareas: 5, limites: [[2, 2], [2, 2], [2, 2], [2, 2]] })
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.id).toBeDefined()
        /*const get = await api.get('/parcelas/' + response.body.id)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        expect(response.body.id).toBeEqual(response.body.id)*/
    })
})