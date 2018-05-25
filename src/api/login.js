import request from '@/utils/request'
import Qs from 'qs'
export function login(username, password) {
  const data = Qs.stringify({
    'username': username,
    'password': password
  })
  return request({
    url: '/web/login',
    method: 'post',
    data: data
  })
}

export function getProfile() {
  return request({
    url: '/app/profile',
    method: 'get'
  })
}

export function logout() {
  return request({
    url: '/app/logout',
    method: 'post'
  })
}
