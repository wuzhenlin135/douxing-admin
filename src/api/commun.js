import request from '@/utils/request'
import Qs from 'qs'

export function getCertList() {
  return request({
    url: 'app/commun-cert-list',
    method: 'get'
  })
}

export function submitCert(id, pass, msg) {
  const data = Qs.stringify({
    'id': id,
    'pass': pass,
    'msg': msg
  })
  return request({
    url: 'app/commun-cert',
    method: 'post',
    data: data
  })
}
