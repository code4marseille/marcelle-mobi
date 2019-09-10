import camelcaseKeys from 'camelcase-keys'

export default function ({ $axios }) {
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
