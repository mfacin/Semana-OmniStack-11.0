const connection = require('../database/connection')

module.exports = {
    async index(req, res) {
        const { page = 1 } = req.query

        // pega a primeira posição do array
        const [count] = await connection('incidents').count()

        console.log(count)

        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf'])
        
        // o total geralmente é passado pelo header com o nome 'X-Total-Count'
        res.header('X-Total-Count', count['count(*)'])

        return res.json(incidents)
    },

    async create(req, res) {
        const { title, description, value } = req.body
        const ong_id = req.headers.authorization

        // como é só uma inserção, ele retorna um array de 1 posição
        // para pegar essa posição, usa-se a desestruturação
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        const ong = await connection('ongs')
            .where('id', ong_id)
            .select('name')
            .first()

        console.log(`> Created incident '${title}' with id ${id} by ONG '${ong.name}'`)

        return res.json({ id })
    },

    async delete(req, res) {
        const { id } = req.params
        const ong_id = req.headers.authorization

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id')
            .first()
        
        if (incident.ong_id !== ong_id) {
            // 401: Unauthorized
            return res.status(401).json({ error: 'Operation not permited' })
        }

        await connection('incidents').where('id', id).delete()

        console.log(`> Deleted incident with id ${id}`)

        // 204 No Content
        return res.status(204).send()
    }
}