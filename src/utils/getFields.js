/**
 * @function getFields
 * @description Obtiene los campos del evento de serverless indicados en un array
 * @param {Object} event - Serverless event
 * @param {Array} fields - Campos a obtener
 * @return {String} valores obtenidos del objeto
 */
const getFields = (fields) => (event) => {
    const data = {}
    fields.forEach((item) => data[item] = event[item])
    return { data, fields }
}

module.exports = getFields