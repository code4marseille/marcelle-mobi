import camelcaseKeys from 'camelcase-keys'

export default function ({ $axios }) {
  $axios.onRequest(config => {
    if (!config.params) config.params = {}
    config.params.grant_token = process.env.CODE4MARSEILLE_API_KEY
  })
  $axios.onResponse(response => {
    if (response.data !== '') response.data = camelcaseKeys(response.data, { deep: true })
  })
  $axios.onResponseError(error => {
    let resp = error.response
    resp.data = camelcaseKeys(resp.data, { deep: true })
    let errors = resp.data.errors
    for (var key in errors) errors[key] = errors[key].join(', ')
  })
}
