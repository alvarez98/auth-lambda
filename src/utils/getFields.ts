const getFields = (event, fields) => {
    const data = {}
    fields.forEach((item) => data[item] = event[item])
    return { data, fields }
}

export default getFields